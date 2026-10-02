#!/usr/bin/env node
import {readFile, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';

// Shortens dead-air gaps in a recorded voiceover without touching natural pauses.
// Two tiers, both cut evenly off both edges of the gap so it never reads as an abrupt
// jump straight from speech into silence:
//   - a gap in [midMin, midMax) is cut down to midTarget      (default: 1.0-1.3s -> 0.7s)
//   - a gap >= longMin is cut down to longTarget               (default: >=2.0s   -> 1.3s)
// Anything else — the ~1s breaths under midMin, and the untouched band between midMax and
// longMin — is left completely alone. Those pauses are what make the voiceover sound human.

const args = process.argv.slice(2);
const valueAfter = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined);
const project = resolve(valueAfter('--project') || 'flick-output');
const voiceover = valueAfter('--voiceover');
if (!voiceover) throw new Error('Pass --voiceover <audio-file>');
const voPath = resolve(voiceover);
const outPath = resolve(valueAfter('--out') || voPath.replace(/\.(\w+)$/, '-trimmed.$1'));
const thresholdDb = Number(valueAfter('--threshold') || -30);

const midMin = Number(valueAfter('--mid-min') || 1.0);
const midMax = Number(valueAfter('--mid-max') || 1.3);
const midTarget = Number(valueAfter('--mid-target') || 0.7);
const longMin = Number(valueAfter('--long-min') || 2.0);
const longTarget = Number(valueAfter('--long-target') || 1.3);

if (midTarget >= midMin) throw new Error(`--mid-target (${midTarget}s) must be shorter than --mid-min (${midMin}s).`);
if (longTarget >= longMin) throw new Error(`--long-target (${longTarget}s) must be shorter than --long-min (${longMin}s).`);
if (midMax > longMin) throw new Error(`--mid-max (${midMax}s) must not exceed --long-min (${longMin}s) or the two tiers overlap.`);

// Sorted low-to-high so a duration is matched against the first (smallest) tier it qualifies
// for. The gap between midMax and longMin is intentionally not covered by any tier.
const TIERS = [
  {min: midMin, max: midMax, target: midTarget, label: `${midMin}-${midMax}s`},
  {min: longMin, max: Infinity, target: longTarget, label: `>=${longMin}s`},
].sort((a, b) => a.min - b.min);
const detectFloor = TIERS[0].min;

async function resolveFfmpeg() {
  try {
    const projectRequire = createRequire(resolve(project, 'remotion', 'package.json'));
    return projectRequire('ffmpeg-static');
  } catch {
    return 'ffmpeg';
  }
}

function probeDuration(ffmpegBin, file) {
  const result = spawnSync(ffmpegBin, ['-i', file], {encoding: 'utf8'});
  const text = `${result.stdout}\n${result.stderr}`;
  const match = text.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  if (!match) throw new Error(`Could not read duration of ${file}`);
  const [, h, m, s] = match;
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

// Detects every silence >= the smallest tier's floor. Anything shorter never shows up here,
// so it's never a candidate for trimming. Silences that fall in the untouched band between
// tiers are detected but simply skipped below (no matching tier -> no cut).
function detectSilences(ffmpegBin, file, floorSeconds, thresholdDbValue) {
  const result = spawnSync(
    ffmpegBin,
    ['-i', file, '-af', `silencedetect=noise=${thresholdDbValue}dB:d=${floorSeconds}`, '-f', 'null', '-'],
    {encoding: 'utf8'}
  );
  const text = `${result.stdout}\n${result.stderr}`;
  const starts = [...text.matchAll(/silence_start:\s*(-?\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  const ends = [...text.matchAll(/silence_end:\s*(-?\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  const silences = [];
  for (let i = 0; i < Math.min(starts.length, ends.length); i++) {
    if (ends[i] > starts[i]) silences.push({start: starts[i], end: ends[i]});
  }
  return silences;
}

function matchTier(duration) {
  return TIERS.find((t) => duration >= t.min && duration < t.max);
}

async function main() {
  const ffmpegBin = await resolveFfmpeg();
  const totalDuration = probeDuration(ffmpegBin, voPath);
  const silences = detectSilences(ffmpegBin, voPath, detectFloor, thresholdDb);

  // For each silence whose duration matches a tier, remove the middle so `target` seconds
  // remain, split evenly off both edges. Silences matching no tier are left untouched.
  const cuts = [];
  for (const {start, end} of silences) {
    const duration = end - start;
    const tier = matchTier(duration);
    if (!tier) continue;
    const keepEachSide = tier.target / 2;
    cuts.push({cutStart: start + keepEachSide, cutEnd: end - keepEachSide, removed: duration - tier.target, tier: tier.label});
  }

  if (!cuts.length) {
    console.log(`No silence matched a trim tier (${TIERS.map((t) => t.label).join(', ')}) in ${voPath} — nothing to trim.`);
    return;
  }

  // Build the list of segments to KEEP (everything between/around the cut windows).
  const keepSegments = [];
  let cursor = 0;
  for (const cut of cuts) {
    if (cut.cutStart > cursor) keepSegments.push({start: cursor, end: cut.cutStart});
    cursor = cut.cutEnd;
  }
  if (cursor < totalDuration) keepSegments.push({start: cursor, end: totalDuration});

  const filterParts = keepSegments.map(
    (seg, i) => `[0:a]atrim=start=${seg.start.toFixed(3)}:end=${seg.end.toFixed(3)},asetpts=PTS-STARTPTS[a${i}]`
  );
  const concatInputs = keepSegments.map((_, i) => `[a${i}]`).join('');
  filterParts.push(`${concatInputs}concat=n=${keepSegments.length}:v=0:a=1[outa]`);

  const result = spawnSync(
    ffmpegBin,
    ['-y', '-i', voPath, '-filter_complex', filterParts.join(';'), '-map', '[outa]', outPath],
    {stdio: 'inherit'}
  );
  if (result.error || result.status !== 0) throw new Error('ffmpeg failed to trim silence.');

  const totalRemoved = cuts.reduce((sum, c) => sum + c.removed, 0);
  console.log(`\nTrimmed ${cuts.length} gap(s):`);
  for (const tier of TIERS) {
    const count = cuts.filter((c) => c.tier === tier.label).length;
    if (count) console.log(`  ${count} gap(s) in ${tier.label} -> ${tier.target}s each`);
  }
  console.log(`Removed ${totalRemoved.toFixed(2)}s total. New duration: ${(totalDuration - totalRemoved).toFixed(2)}s (was ${totalDuration.toFixed(2)}s).`);
  console.log(`Wrote ${outPath}`);

  // Keep transcript.json in sync: every timestamp after a cut needs to shift left by the
  // cumulative amount removed before it, so scene timing in auto-footage.mjs / assemble-video.mjs
  // stays matched to the trimmed voiceover instead of drifting later into the video.
  const transcriptPath = resolve(project, 'transcript.json');
  let transcript;
  try {
    transcript = JSON.parse(await readFile(transcriptPath, 'utf8'));
  } catch {
    console.log('No transcript.json found in --project — skipping timestamp remap.');
    return;
  }

  const remapMs = (ms) => {
    const t = ms / 1000;
    let shift = 0;
    for (const cut of cuts) {
      if (t <= cut.cutStart) break;
      shift += Math.min(t, cut.cutEnd) - cut.cutStart;
    }
    return Math.round((t - shift) * 1000);
  };
  const remapSegment = (seg) => ({
    ...seg,
    ...(seg.startMs != null ? {startMs: remapMs(seg.startMs)} : {}),
    ...(seg.endMs != null ? {endMs: remapMs(seg.endMs)} : {}),
  });
  const trimmedTranscript = {
    ...transcript,
    segments: (transcript.segments || []).map(remapSegment),
    words: (transcript.words || []).map(remapSegment),
  };
  const trimmedTranscriptPath = resolve(project, 'transcript-trimmed.json');
  await writeFile(trimmedTranscriptPath, JSON.stringify(trimmedTranscript, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${trimmedTranscriptPath} with timestamps remapped to the trimmed voiceover.`);
  console.log('Use transcript-trimmed.json (not transcript.json) for every later step — auto-footage.mjs, assemble-video.mjs, and the Remotion scene timing.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
