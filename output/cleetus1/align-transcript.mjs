// Whisper can't run here (torch needs a VC++ runtime we can't install without admin), but the
// script text is already known exactly — only its timing on the voiceover track is missing.
// The VO is TTS, so it pauses cleanly between paragraphs: detect those pauses with ffmpeg and
// map the known paragraphs onto the real timeline, instead of guessing at a words-per-minute
// rate. Falls back to proportional placement wherever the pause count doesn't line up.
import {spawnSync} from 'node:child_process';
import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\cleetus1');
const vo = 'D:\\flick\\vo\\tts-audio.wav';
const ffmpeg = resolve(project, 'remotion', 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');

const paragraphs = (await readFile(resolve(project, 'source-script.txt'), 'utf8'))
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

// Probe once for total duration, and for every silence long enough to be a paragraph break.
// Threshold tuned per voice: the current TTS delivers tighter than the previous one, and at
// -35dB/0.35s only 6 of the 24 paragraph gaps registered, which dropped almost every boundary
// back to a word-count guess. -30dB/0.20s surfaces ~80 gaps — enough for the longest 24 to be
// the real paragraph breaks.
const probe = spawnSync(ffmpeg, ['-i', vo, '-af', 'silencedetect=noise=-30dB:d=0.20', '-f', 'null', '-'], {encoding: 'utf8'});
const log = `${probe.stdout || ''}${probe.stderr || ''}`;

const durationMatch = log.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
const total = durationMatch
  ? Number(durationMatch[1]) * 3600 + Number(durationMatch[2]) * 60 + Number(durationMatch[3])
  : 0;
if (!total) throw new Error('Could not read voiceover duration.');

const silences = [];
const starts = [...log.matchAll(/silence_start:\s*([\d.]+)/g)].map((m) => Number(m[1]));
const ends = [...log.matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => Number(m[1]));
for (let i = 0; i < starts.length; i++) {
  const end = ends[i] ?? total;
  silences.push({start: starts[i], end, mid: (starts[i] + end) / 2, length: end - starts[i]});
}

// Candidate paragraph boundaries: the longest pauses, since sentence-internal breaths are
// shorter than the gap a TTS engine leaves between paragraphs.
const needed = paragraphs.length - 1;
const boundaries = silences
  .filter((s) => s.start > 0.5 && s.end < total - 0.5)
  .sort((a, b) => b.length - a.length)
  .slice(0, needed)
  .map((s) => s.mid)
  .sort((a, b) => a - b);

// Proportional word-count placement is the reference timeline; each boundary then snaps to the
// nearest real pause when one is close enough, so speech is never cut mid-sentence.
const words = paragraphs.map((p) => p.split(/\s+/).filter(Boolean).length);
const totalWords = words.reduce((a, b) => a + b, 0);
let cumulative = 0;
const proportional = words.slice(0, -1).map((w) => {
  cumulative += w;
  return (cumulative / totalWords) * total;
});

const cuts = proportional.map((target) => {
  let best = target;
  let bestGap = Infinity;
  for (const b of boundaries) {
    const gap = Math.abs(b - target);
    if (gap < bestGap) {
      bestGap = gap;
      best = b;
    }
  }
  // Only trust a detected pause that is actually near where the text says the break belongs.
  return bestGap <= 3.5 ? best : target;
});

const segments = paragraphs.map((text, i) => {
  const start = i === 0 ? 0 : cuts[i - 1];
  const end = i === paragraphs.length - 1 ? total : cuts[i];
  return {start: Number(start.toFixed(2)), end: Number(end.toFixed(2)), text};
});

// Guard against a snap that reordered two boundaries.
for (let i = 1; i < segments.length; i++) {
  if (segments[i].start < segments[i - 1].end) segments[i].start = segments[i - 1].end;
  if (segments[i].end <= segments[i].start) segments[i].end = Number((segments[i].start + 1).toFixed(2));
}

await writeFile(
  resolve(project, 'transcript.json'),
  JSON.stringify({source: 'vo-aligned', audio: vo, duration: total, text: paragraphs.join('\n'), segments, words: []}, null, 2) + '\n'
);

console.log(`VO ${total.toFixed(2)}s | ${silences.length} pauses found | ${boundaries.length}/${needed} used as paragraph breaks`);
for (const s of segments) console.log(`  ${s.start.toFixed(1)}-${s.end.toFixed(1)}s  ${s.text.slice(0, 58)}`);
