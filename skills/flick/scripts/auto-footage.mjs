#!/usr/bin/env node
import {mkdir, readFile, readdir, stat, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {renameSync, statSync, unlinkSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, extname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {findPython, pythonInstallGuidance} from './python.mjs';

const args = process.argv.slice(2);
const valueAfter = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined);
const project = resolve(valueAfter('--project') || 'flick-output');
const maxClipSeconds = Number(valueAfter('--max-seconds') || 10);
const motionOverride = new Set(
  (valueAfter('--motion-scenes') || '')
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => n > 0)
);
// --only 6,10 re-processes just those scene numbers (e.g. to redo a scene the user flagged
// as wrong) and leaves every other already-downloaded scene file untouched.
const onlyScenes = new Set(
  (valueAfter('--only') || '')
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => n > 0)
);
const here = resolve(fileURLToPath(new URL('.', import.meta.url)));

// --- visual priority: video is the default for every line. Video always wins over image, ---
// --- image always wins over motion graphic. Nothing is picked just to fill a percentage. ---

const SENTENCE_STARTERS = new Set([
  'The', 'This', 'That', 'These', 'Those', 'So', 'It', 'A', 'An', 'Then', 'And', 'But', 'If', 'When', 'While',
  'In', 'On', 'At', 'For', 'To', 'With', 'As', 'By', 'After', 'Before', 'During', 'Since', 'Under', 'Over', 'From',
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
]);

// A 2-4 word Title-Case phrase isn't always a person — a US state, a track/venue, or a
// sponsor/brand name matches the same shape (e.g. "New Hampshire", "Las Vegas", "Coke Zero
// Sugar") and would otherwise get treated as a named subject, sending the search toward a
// generic travel/brand video instead of race footage. This is a non-exhaustive common-case
// list, not a full gazetteer — extend it if another false positive shows up.
const PLACE_OR_BRAND_DISQUALIFIERS = new Set([
  'New Hampshire', 'Las Vegas', 'Los Angeles', 'New York', 'North Carolina', 'South Carolina',
  'North Wilkesboro', 'West Virginia', 'Coke Zero', 'Coke Zero Sugar', 'Zero Sugar',
]);

// Heuristic proper-noun detector: 2-4 consecutive Title-Case words (e.g. "Dale Earnhardt",
// "Michael Jordan", "Albert Einstein"). A named subject means the visual must show that exact
// person, not generic footage.
function detectPerson(text) {
  const matches = [...text.matchAll(/\b([A-Z][a-zA-Z.'-]*(?:\s+[A-Z][a-zA-Z.'-]*){1,3})\b/g)];
  const candidates = matches
    .map((m) => m[1])
    .filter((phrase) => {
      const words = phrase.split(/\s+/);
      // A trailing "." inside the word class lets the match bridge across a sentence
      // boundary (e.g. "Daytona. That" from two different sentences) — reject any
      // candidate where a later word is a sentence starter too, not just the first.
      if (words.some((w) => SENTENCE_STARTERS.has(w.replace(/\.$/, '')))) return false;
      return !PLACE_OR_BRAND_DISQUALIFIERS.has(phrase);
    });
  if (!candidates.length) return null;
  return candidates.sort((a, b) => b.length - a.length)[0];
}

// Data-driven lines (exact stats, percentages, dates/timelines, comparisons) are the only
// case where a motion graphic (chart/number animation) can beat real footage.
function isDataDriven(text) {
  return (
    /\d+%/.test(text) ||
    /\bpercent\b/i.test(text) ||
    /\b(19|20)\d{2}\b/.test(text) ||
    /\b\d[\d,]{2,}\b/.test(text) ||
    /\b(million|billion|thousand)\b/i.test(text) ||
    /\bfrom\s+[\d,.]+\s+to\s+[\d,.]+/i.test(text) ||
    /\b(increased|decreased|grew|rose|fell|doubled|tripled|compared to|versus|vs\.?)\b/i.test(text)
  );
}

// --- env / API keys -------------------------------------------------------

async function loadEnv() {
  const candidates = [resolve(project, '.env'), resolve(here, '..', '..', '..', '.env')];
  for (const path of candidates) {
    try {
      const text = await readFile(path, 'utf8');
      for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
        if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
      }
    } catch {
      // no .env at this location, skip
    }
  }
}

// --- text helpers -----------------------------------------------------------

const STOPWORDS = new Set(
  'a an the is are was were be been being this that these those it its it\'s and or but so if then than to of in on at for with as by from up down out over under again once here there all any both each few more most other some such no nor not only own same too very s t just don now i we you he she they them his her their your my our'.split(
    ' '
  )
);

// A short/ambiguous scene query (e.g. "goal", "closer racing") searched on its own can match
// completely unrelated content (a soccer goal instead of a NASCAR rule change). Anchoring it
// with the transcript's dominant topic keeps the search on-subject.
function topicHintFrom(fullText) {
  const counts = {};
  for (const m of fullText.matchAll(/\b[A-Z]{2,}\b|\b[A-Z][a-z]+\b/g)) {
    const word = m[0];
    if (SENTENCE_STARTERS.has(word) || word.length < 3) continue;
    counts[word] = (counts[word] || 0) + 1;
  }
  const [top] = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return top?.[0];
}

// Every meaningful word in a line, used to judge relevance. `queryFor` deliberately keeps a
// search query short, but judging a candidate against only those first few words throws away
// the words that actually identify the subject — "Super Late Model", "Berlin", "Tekton 250"
// all sit past the sixth word of their line and would otherwise never be matched against.
const contentWords = (text) =>
  [
    ...new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((word) => word.length > 3 && !STOPWORDS.has(word))
    ),
  ];

// A proper noun names the subject; a long common word is next best. Both beat whichever words
// happen to open the sentence, so a query built from these finds the actual event.
const distinctiveWords = (text, limit) => {
  const seen = new Set();
  const scored = [];
  for (const raw of text.split(/\s+/)) {
    const word = raw.replace(/[^A-Za-z0-9]/g, '');
    const lower = word.toLowerCase();
    if (word.length < 4 || STOPWORDS.has(lower) || seen.has(lower)) continue;
    seen.add(lower);
    const proper = /^[A-Z]/.test(word) && !SENTENCE_STARTERS.has(word);
    scored.push({lower, weight: (proper ? 10 : 0) + word.length});
  }
  return scored
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit)
    .map((entry) => entry.lower);
};

// Relevance is judged against the current scene's full line, set by the main loop each scene.
let currentTopicPool = [];

const queryFor = (text, topic) => {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !STOPWORDS.has(word))
    .slice(0, 6);
  if (topic && words.length < 3 && !words.includes(topic.toLowerCase())) words.unshift(topic.toLowerCase());
  return words.join(' ');
};

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40) || 'scene';

// transcript.json from Flick's Whisper pipeline uses startMs/endMs; hand-authored transcripts
// may use start/end in seconds. Support both.
const secondsOf = (segment) => ({
  start: segment.startMs != null ? segment.startMs / 1000 : segment.start ?? 0,
  end: segment.endMs != null ? segment.endMs / 1000 : segment.end ?? 0,
});

// --- ffmpeg -----------------------------------------------------------------

async function resolveFfmpeg() {
  try {
    const projectRequire = createRequire(resolve(project, 'remotion', 'package.json'));
    return projectRequire('ffmpeg-static');
  } catch {
    return 'ffmpeg';
  }
}

function trimToFile(ffmpegBin, sourceUrlOrPath, outPath, clipSeconds) {
  const debug = !!process.env.FLICK_DEBUG;
  const attempt = (extraArgs) =>
    spawnSync(
      ffmpegBin,
      ['-y', '-i', sourceUrlOrPath, '-t', String(clipSeconds), ...extraArgs, outPath],
      {stdio: debug ? ['ignore', 'pipe', 'pipe'] : 'ignore'}
    );
  let result = attempt(['-c', 'copy']);
  if (result.error || result.status !== 0) {
    if (debug) console.log(`    [debug] ffmpeg copy failed: ${result.error?.message || result.stderr?.toString().slice(-400)}`);
    result = attempt(['-c:v', 'libx264', '-c:a', 'aac']);
    if (debug && (result.error || result.status !== 0))
      console.log(`    [debug] ffmpeg reencode failed: ${result.error?.message || result.stderr?.toString().slice(-400)}`);
  }
  if (result.error || result.status !== 0) return false;
  // The stream-copy path above preserves whatever frame timing the source had, so stock clips
  // need the same normalize pass as the YouTube ones. See normalizeClip.
  normalizeClip(ffmpegBin, outPath);
  return true;
}

// --- source: YouTube (yt-dlp) ------------------------------------------------

function runYtDlpDownload(python, target, outPath, clipSeconds, ffmpegLocation, extraArgs = [], introSkip = 0) {
  const base = outPath.replace(/\.mp4$/, '');
  const searchArgs = [
    ...python.prefix,
    '-m',
    'yt_dlp',
    target,
    '--match-filter',
    'duration < 900',
    '-f',
    'bv*[height<=1080]+ba/b[height<=1080]/bv*+ba/b',
    '--merge-output-format',
    'mp4',
    '--download-sections',
    `*${introSkip}-${introSkip + clipSeconds}`,
    '--force-keyframes-at-cuts',
    '--force-overwrites',
    ...extraArgs,
    ...(ffmpegLocation ? ['--ffmpeg-location', ffmpegLocation] : []),
    '-o',
    `${base}.%(ext)s`,
  ];
  // Capture stderr rather than discarding it: a download that fails here is otherwise a silent
  // "skip" in the log, indistinguishable from "the search found nothing", and every source in
  // the run looks equally dead. The reason is always in yt-dlp's own error line.
  const debug = !!process.env.FLICK_DEBUG;
  const result = spawnSync(python.command, searchArgs, {
    encoding: 'utf8',
    stdio: debug ? ['ignore', 'pipe', 'pipe'] : 'ignore',
  });
  const ok = !result.error && result.status === 0;
  if (!ok && debug) {
    const why = result.error?.message || String(result.stderr || '').trim().split('\n').slice(-3).join(' | ');
    console.log(`    [debug] yt-dlp download failed (${result.status}): ${why.slice(0, 400)}`);
  }
  return ok;
}

// --- relevancy ranking -------------------------------------------------------
// A blind "take the first search result" pick is exactly what the strict-relevancy rule
// forbids. Instead: pull several candidate titles, score each against the narration
// (+ the named subject, if any), and only download the best-scoring one. If nothing scores
// above zero, the source is treated as a miss rather than silently keeping a bad guess.

function searchYouTubeCandidates(python, target, count, extraArgs = [], matchFilter = 'duration < 900') {
  const args = [
    ...python.prefix,
    '-m',
    'yt_dlp',
    target,
    '--flat-playlist',
    '--match-filter',
    matchFilter,
    '--print',
    '%(id)s\t%(title)s\t%(duration)s',
    ...extraArgs,
  ];
  const result = spawnSync(python.command, args, {encoding: 'utf8'});
  if (result.error || result.status !== 0 || !result.stdout) return [];
  return result.stdout
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [id, title, duration] = line.split('\t');
      return {id, title: title || '', duration: Number(duration) || 0};
    })
    .filter((c) => c.id && c.title && c.title !== 'NA')
    .slice(0, count);
}

// Simulator/video-game footage would be misleading if used to represent a real event —
// never truthful, so it's rejected outright rather than merely down-ranked.
const SIM_DISQUALIFIERS = ['iracing', 'sim racing', 'simracing', 'video game', 'rfactor', 'assetto corsa', 'gran turismo', 'forza', 'nascar heat', 'nascar 21', 'simulator'];

// no-burned-in-text-rule.md lists these title patterns as rejected outright: a compilation,
// ranking, explainer, recap or documentary carries the source editor's own headlines and
// lower-thirds burned into the frame, which name the wrong subject and collide with our
// typography. Matched against the lowercased title.
const BURNED_IN_TEXT_TITLE_PATTERNS = [
  'every ', 'top 10', 'top 5', 'greatest', 'best ', 'biggest', 'worst ', 'wildest', 'moments',
  'compilation', 'countdown', 'ranked', 'recap', 'career', 'explained', 'breakdown', 'analysis',
  'stats', 'review', 'documentary', 'news:', 'inside the race', ' vs ', 'but it gets increasingly',
  'starting grid', 'starting lineup', 'rebirth', 'trailer',
  // A schedule/track-list upload is a slideshow of title cards over stock track footage —
  // every shot carries the round, venue and date burned across it in large type.
  'series tracks', 'track list', 'tracks list', 'schedule', 'every track', 'all tracks',
];
// Deliberately NOT in that list: "highlights". A broadcaster's race-highlights upload is real
// event footage of the actual race (it is how @FloRacing publishes short-track events at all),
// unlike a "top 10 greatest moments" package. Its score bug is handled by framing, and the
// freeze/bitrate checks below still reject anything that is really a title card.

// footage-sourcing-rule.md #5: any animation in the final video must be one we authored.
// Someone else's cartoon/CGI/LEGO recreation is rejected, never merely down-ranked.
const THIRD_PARTY_ANIMATION_PATTERNS = [
  'cartoon', 'animation', 'animated', 'lego', 'stop motion', 'stop-motion', 'cgi',
  'recreation', 'recreated', 're-creation', 'toy car', 'fan made', 'fan-made',
];

// The approved channel list is NASCAR-focused, but at least one of those channels also posts
// other motorsport. An F1 onboard lap is real footage of the wrong sport — it can never
// truthfully illustrate a NASCAR narration line, so it is disqualified rather than ranked.
const OFF_DOMAIN_PATTERNS = [
  'formula 1', 'formula1', 'f1 ', ' f1', 'grand prix', 'motogp', 'indycar', 'indy car',
  'verstappen', 'hamilton', 'leclerc', 'norris', 'russell', 'ferrari', 'mclaren', 'red bull racing',
  'rally', 'le mans', 'nhra', 'drag race',
];

// A usable background bed is real footage from this story's world. This is a domain check, not
// a line-by-line relevance check — the overlay supplies the specificity.
const DOMAIN_TERMS = [
  'nascar', 'race', 'racing', 'racer', 'lap', 'laps', 'track', 'speedway', 'raceway', 'motor',
  'cup series', 'xfinity', 'truck series', 'arca', 'o\'reilly', 'oreilly', 'late model',
  'short track', 'dirt', 'pit road', 'pit stop', 'green flag', 'checkered', 'victory lane',
  'qualifying', 'crash', 'wreck', 'spin', 'driver', 'daytona', 'talladega', 'charlotte',
  'rockingham', 'nashville', 'martinsville', 'bristol', 'darlington', 'pocono', 'berlin',
];

// Broadcast graphics — score tickers, standings panels, network bugs — are fine; they come with
// real race coverage. Burned-in CAPTIONS are not: they are someone else's subtitle track sitting
// across the picture. In practice captions travel with one recognisable kind of upload — the
// reaction/commentary channel, whose titles shout in caps and emoji. Blocking that shape is the
// only reliable way to avoid captions, since a title never mentions them.
function titleLooksLikeCaptionedCommentary(title) {
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u.test(title)) return true;
  const shouted = title
    .split(/\s+/)
    .filter((word) => word.length > 2 && /^[A-Z!?'’]+$/.test(word) && !['NASCAR', 'ARCA', 'RCR', 'FULL', 'LIVE', 'LAST', 'LAPS', 'FOX', 'NBC'].includes(word));
  if (shouted.length >= 2) return true;
  return /\b(breaks silence|bombshell|fired back|in shock|erupts|stunned|furious|shuts down|just proved|drops? \w+ on)\b/i.test(title);
}

function titleIsDisqualified(lowerTitle) {
  if (SIM_DISQUALIFIERS.some((t) => lowerTitle.includes(t))) return 'sim/video-game footage';
  if (THIRD_PARTY_ANIMATION_PATTERNS.some((t) => lowerTitle.includes(t))) return "someone else's animation";
  if (OFF_DOMAIN_PATTERNS.some((t) => lowerTitle.includes(t))) return 'wrong motorsport';
  if (BURNED_IN_TEXT_TITLE_PATTERNS.some((t) => lowerTitle.includes(t))) return 'burned-in text likely';
  return null;
}

function scoreCandidateTitle(title, queryWords, personName) {
  const lower = title.toLowerCase();
  if (titleLooksLikeCaptionedCommentary(title)) {
    dlog('rejected title', `${title.slice(0, 60)} (commentary upload — burned-in captions)`);
    return -Infinity;
  }
  const disqualified = titleIsDisqualified(lower);
  if (disqualified) {
    dlog('rejected title', `${title.slice(0, 60)} (${disqualified})`);
    return -Infinity;
  }
  // visual-relevance-rule.md: the visual must match what the narration is SAYING at that
  // second, "not merely name-match a keyword, person, or track". A name match alone is what
  // put a 2014 victory lane under a 2026 podcast line and an ideal-beach-day chat under a
  // race-improvement line — so the name is worth points only once the candidate also matches
  // something the line is actually about.
  const personWords = new Set((personName || '').toLowerCase().split(/\s+/).filter(Boolean));
  const topicWords = [...new Set([...queryWords, ...currentTopicPool])].filter(
    (word) => word.length > 2 && !personWords.has(word)
  );
  const topicMatches = topicWords.filter((word) => lower.includes(word)).length;

  // Clips are background beds, not the whole visual: a graphic or ID card overlays them and
  // carries the line's specific meaning (person-id-card-overlay-rule.md — "a person named
  // while a different but still relevant clip is already playing"). So a bed has to be real
  // footage from this story's world, and the line-specific match is a bonus rather than a gate.
  const domainMatch = DOMAIN_TERMS.some((term) => lower.includes(term));
  const personMatch =
    personName &&
    (lower.includes(personName.toLowerCase()) ||
      lower.includes(personName.split(/\s+/).pop().toLowerCase()));
  if (!domainMatch && !personMatch) {
    dlog('rejected title', `${title.slice(0, 60)} (outside this story's world)`);
    return -Infinity;
  }

  let score = topicMatches * 2 + (domainMatch ? 1 : 0);
  if (personName) {
    const surname = personName.split(/\s+/).pop().toLowerCase();
    if (lower.includes(personName.toLowerCase())) score += 6;
    else if (surname.length > 2 && lower.includes(surname)) score += 4;
    else score -= 3; // named-subject scene but this candidate doesn't mention them at all
  }
  return score;
}

// clip-reuse-rule.md: don't pick a clip already used by another scene in this project
// when a different, sufficiently relevant one is available. Scored in two passes — first
// among candidates NOT already used elsewhere, only falling back to an already-used one
// (still applying the normal relevancy bar) if literally nothing else in the result set
// scores above zero. usedTitles is exact-title matching against every other scene's already
// -downloaded source, seeded from sources.json at startup and updated as this run proceeds.
function pickBestCandidate(candidates, query, personName, usedTitles = new Set()) {
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scoreAll = (pool) => {
    let best = null;
    let bestScore = -Infinity;
    for (const candidate of pool) {
      const score = scoreCandidateTitle(candidate.title, queryWords, personName);
      if (score > bestScore) {
        bestScore = score;
        best = candidate;
      }
    }
    return {best, bestScore};
  };
  // A clip already used by another scene is never reusable here. The earlier "last resort"
  // fallback silently put one Dale Jr race clip behind three different scenes; a scene with
  // no fresh, sufficiently relevant candidate must fall through to a motion graphic instead.
  const fresh = candidates.filter((c) => !usedTitles.has(c.title));
  const freshResult = scoreAll(fresh);
  if (freshResult.best && freshResult.bestScore > 0) return freshResult.best;
  return null;
}

// Long-form uploads only (no Shorts).
const LONGFORM_FILTER = 'duration > 120 & duration < 900';

// Never lift another creator's hook. A video's opening is its own crafted attention-grabber —
// usually branded, usually captioned, and always the part that belongs most distinctly to them.
// Start well past it and take footage from the body of the video instead.
function hookSafeOffset(duration = 0) {
  const usable = Math.max(duration - 40, 0);
  return Math.round(Math.min(Math.max(60, duration * 0.25), Math.max(usable, 60)));
}

// footage-sourcing-rule.md #3 and #6, enforced on the actual downloaded file rather than on
// its title. Returns a rejection reason, or null when the clip is usable.
//
// A title cannot show what is in the frame: a channel/streaming-service logo bumper (a flat
// "prime video" ident, a title card) downloads perfectly happily and probes as a valid
// landscape mp4. Two measurable signals catch it — a mostly-frozen picture, and a bitrate far
// below what real camera footage needs.
function validateClip(ffmpegBin, filePath) {
  const probe = spawnSync(
    ffmpegBin,
    ['-i', filePath, '-vf', 'cropdetect=limit=24:round=2:reset=0,freezedetect=n=-45dB:d=1', '-frames:v', '150', '-f', 'null', '-'],
    {encoding: 'utf8'}
  );
  const text = `${probe.stdout || ''}${probe.stderr || ''}`;

  // 0. There is actually a picture. A format negotiation can hand back an audio-only mp4 —
  //    right title, right duration, plausible file size, and no video stream whatsoever. Every
  //    check below reads as "fine" on one (there are no crops to measure and no frames to call
  //    frozen), so it reaches the timeline and only shows up as a black scene, or as an ffmpeg
  //    re-encode that fails with no video to encode.
  if (!/Stream #\d+:\d+.*: Video:/.test(text)) return 'no video stream (audio-only download)';

  // 1. Real 16:9 content box, not a vertical picture pillarboxed onto a wide canvas.
  const crops = [...text.matchAll(/crop=(\d+):(\d+):\d+:\d+/g)];
  if (crops.length) {
    const [, w, h] = crops[crops.length - 1];
    if (Number(w) / Number(h) < 1.5) return `not 16:9 (content box ${w}x${h})`;
  }

  // 2. Duration + bitrate. Flat-colour logo/title-card content sits far below real footage.
  const durationMatch = text.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
  const seconds = durationMatch
    ? Number(durationMatch[1]) * 3600 + Number(durationMatch[2]) * 60 + Number(durationMatch[3])
    : 0;
  if (seconds > 0) {
    const kbps = (statSync(filePath).size * 8) / seconds / 1000;
    if (kbps < 400) return `bitrate too low (${Math.round(kbps)} kb/s — logo/title card, not camera footage)`;

    // 3. A mostly-static picture is an ident or a title slide, not a shot.
    const frozen = [...text.matchAll(/freeze_duration:\s*([\d.]+)/g)].reduce((total, m) => total + Number(m[1]), 0);
    if (frozen / seconds > 0.5) return `mostly frozen (${frozen.toFixed(1)}s of ${seconds.toFixed(1)}s — title slide or logo bumper)`;
  }

  return null;
}

// Every clip that survives validation is re-encoded once, here, before anything downstream ever
// opens it. Remotion's compositor seeks a source by timestamp, and a clip it cannot seek fails
// the whole render with "No frame found at position N" — an error that surfaces only at render
// time, names a byte position rather than a cause, and looks identical for three unrelated
// reasons, all of which this one pass removes:
//
//   1. --download-sections leaves an mp4 whose index no longer matches its frames.
//   2. YouTube sources are variable-frame-rate; the compositor needs a fixed rate to seek.
//   3. Sparse keyframes make any timestamp between them unreachable.
//
// Constant 30fps, a keyframe every second, no audio (the VO is the only audio track).
function normalizeClip(ffmpegBin, filePath) {
  const tmp = filePath.replace(/\.mp4$/, '') + '.__cfr.mp4';
  const result = spawnSync(
    ffmpegBin,
    [
      '-y', '-i', filePath,
      '-r', '30', '-fps_mode', 'cfr',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
      '-g', '30', '-keyint_min', '30', '-sc_threshold', '0',
      '-pix_fmt', 'yuv420p',
      '-an',
      '-movflags', '+faststart',
      tmp,
    ],
    {stdio: 'ignore'}
  );
  if (!result.error && result.status === 0) {
    try {
      if (statSync(tmp).size > 0) {
        unlinkSync(filePath);
        renameSync(tmp, filePath);
        return true;
      }
    } catch {
      // fall through to cleanup
    }
  }
  try {
    unlinkSync(tmp);
  } catch {
    // never written
  }
  return false;
}

// Prefer real footage from an approved NASCAR channel — footage-sourcing-rule.md restricts
// video sourcing to these channels and no others (see APPROVED_CHANNELS below).
function fromYouTubeChannel(python, handle, query, outPath, clipSeconds, ffmpegLocation, personName, introSkip = 0, usedTitles = new Set(), ffmpegBin = 'ffmpeg') {
  const target = `https://www.youtube.com/${handle}/search?query=${encodeURIComponent(query)}`;
  const candidates = searchYouTubeCandidates(python, target, 8, ['--playlist-end', '8'], LONGFORM_FILTER);
  const tried = new Set();
  // Try several ranked candidates from this channel — a top-scoring title can still fail the
  // 16:9 check after download, and with no clip reuse allowed, every scene needs its own
  // fresh bed, so a deeper pool is what keeps footage coverage high.
  for (let attempt = 0; attempt < 4; attempt++) {
    const pool = candidates.filter((c) => !tried.has(c.id));
    const best = pickBestCandidate(pool, query, personName, usedTitles);
    if (!best) break;
    tried.add(best.id);
    dlog(`youtube-${handle} candidates`, candidates.map((c) => c.title.slice(0, 60)), '-> trying', best.title.slice(0, 60));
    // footage-rules.md #1 plus the user's rule: never the source's logo bumper, and never
    // their hook either — take footage from the body of the upload.
    const startAt = introSkip || hookSafeOffset(best.duration);
    const ok = runYtDlpDownload(python, `https://www.youtube.com/watch?v=${best.id}`, outPath, clipSeconds, ffmpegLocation, ['--no-playlist'], startAt);
    if (!ok) continue;
    const rejection = validateClip(ffmpegBin, outPath);
    if (rejection) {
      dlog(`youtube-${handle} rejected (${rejection})`, best.title.slice(0, 60));
      // Delete the rejected download — leaving it on disk makes a scene that fell through to
      // a motion graphic look like it has footage to any later step that globs this folder.
      try {
        unlinkSync(outPath);
      } catch {
        // already gone / never written
      }
      continue;
    }
    normalizeClip(ffmpegBin, outPath);
    return best.title;
  }
  return false;
}

// Open YouTube search, kept on-domain by prefixing the topic and by the same domain gate every
// candidate faces. Used after the known-good channels so those still win when they have
// something, with the rest of YouTube filling the coverage they can't.
function fromYouTube(python, query, outPath, clipSeconds, ffmpegLocation, personName, introSkip = 0, usedTitles = new Set(), ffmpegBin = 'ffmpeg') {
  const scoped = /nascar/i.test(query) ? query : `NASCAR ${query}`;
  const candidates = searchYouTubeCandidates(python, `ytsearch12:${scoped}`, 12, [], LONGFORM_FILTER);
  const tried = new Set();
  for (let attempt = 0; attempt < 4; attempt++) {
    const pool = candidates.filter((c) => !tried.has(c.id));
    const best = pickBestCandidate(pool, query, personName, usedTitles);
    if (!best) break;
    tried.add(best.id);
    dlog('youtube candidates', candidates.map((c) => c.title.slice(0, 60)), '-> trying', best.title.slice(0, 60));
    const startAt = introSkip || hookSafeOffset(best.duration);
    const ok = runYtDlpDownload(python, `https://www.youtube.com/watch?v=${best.id}`, outPath, clipSeconds, ffmpegLocation, ['--no-playlist'], startAt);
    if (!ok) continue;
    const rejection = validateClip(ffmpegBin, outPath);
    if (rejection) {
      dlog(`youtube rejected (${rejection})`, best.title.slice(0, 60));
      try {
        unlinkSync(outPath);
      } catch {
        // already gone
      }
      continue;
    }
    normalizeClip(ffmpegBin, outPath);
    return best.title;
  }
  return false;
}

// --- source: Pexels -----------------------------------------------------------

const dlog = (...args) => {
  if (process.env.FLICK_DEBUG) console.log('    [debug]', ...args);
};

async function fromPexels(query, outPath, clipSeconds, ffmpegBin) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return false;
  const res = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait`, {
    headers: {Authorization: key},
  });
  dlog('pexels video status', res.status);
  if (!res.ok) return false;
  const data = await res.json();
  const video = data.videos?.[0];
  const file = video?.video_files?.find((f) => f.file_type === 'video/mp4') || video?.video_files?.[0];
  dlog('pexels video match', !!file?.link, data.videos?.length ?? 0, 'results');
  if (!file?.link) return false;
  return trimToFile(ffmpegBin, file.link, outPath, clipSeconds);
}

// --- source: Pixabay ------------------------------------------------------------

async function fromPixabay(query, outPath, clipSeconds, ffmpegBin) {
  const key = process.env.PIXABAY_API_KEY;
  if (!key) return false;
  const res = await fetch(`https://pixabay.com/api/videos/?key=${key}&q=${encodeURIComponent(query)}&per_page=3`);
  dlog('pixabay video status', res.status);
  if (!res.ok) return false;
  const data = await res.json();
  const hit = data.hits?.[0];
  const url = hit?.videos?.medium?.url || hit?.videos?.small?.url;
  dlog('pixabay video match', !!url, data.totalHits ?? 0, 'results');
  if (!url) return false;
  return trimToFile(ffmpegBin, url, outPath, clipSeconds);
}

// --- source: Wikimedia Commons -----------------------------------------------

async function fromWikimedia(query, outPath, clipSeconds, ffmpegBin) {
  const searchRes = await fetch(
    `https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch=${encodeURIComponent(
      `${query} filetype:video`
    )}&format=json&srlimit=1`
  );
  if (!searchRes.ok) return false;
  const searchData = await searchRes.json();
  const title = searchData.query?.search?.[0]?.title;
  if (!title) return false;

  const infoRes = await fetch(
    `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      title
    )}&prop=imageinfo&iiprop=url&format=json`
  );
  if (!infoRes.ok) return false;
  const infoData = await infoRes.json();
  const pages = infoData.query?.pages || {};
  const url = Object.values(pages)[0]?.imageinfo?.[0]?.url;
  if (!url) return false;
  return trimToFile(ffmpegBin, url, outPath, clipSeconds);
}

// --- image sources -------------------------------------------------------------

async function downloadFile(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const buffer = Buffer.from(await res.arrayBuffer());
  if (!buffer.length) return false;
  await writeFile(outPath, buffer);
  return true;
}

async function imageFromPexels(query, outPath) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return false;
  const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait`, {
    headers: {Authorization: key},
  });
  if (!res.ok) return false;
  const data = await res.json();
  const url = data.photos?.[0]?.src?.large;
  if (!url) return false;
  return downloadFile(url, outPath);
}

async function imageFromPixabay(query, outPath) {
  const key = process.env.PIXABAY_API_KEY;
  if (!key) return false;
  const res = await fetch(`https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3`);
  if (!res.ok) return false;
  const data = await res.json();
  const url = data.hits?.[0]?.largeImageURL;
  if (!url) return false;
  return downloadFile(url, outPath);
}

async function imageFromWikimedia(query, outPath) {
  const searchRes = await fetch(
    `https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srsearch=${encodeURIComponent(
      query
    )}&format=json&srlimit=3`
  );
  if (!searchRes.ok) return false;
  const searchData = await searchRes.json();
  for (const hit of searchData.query?.search || []) {
    if (!/\.(jpe?g|png|webp)$/i.test(hit.title)) continue;
    const infoRes = await fetch(
      `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        hit.title
      )}&prop=imageinfo&iiprop=url&format=json`
    );
    if (!infoRes.ok) continue;
    const infoData = await infoRes.json();
    const pages = infoData.query?.pages || {};
    const url = Object.values(pages)[0]?.imageinfo?.[0]?.url;
    if (url) return downloadFile(url, outPath);
  }
  return false;
}

// --- main --------------------------------------------------------------------

async function main() {
  await loadEnv();
  const python = findPython();
  if (!python) throw new Error(`Python 3 was not found. ${pythonInstallGuidance()}`);

  const transcriptPath = resolve(project, 'transcript.json');
  const transcript = JSON.parse(await readFile(transcriptPath, 'utf8'));
  const segments = transcript.segments || [];
  if (!segments.length) throw new Error(`No segments found in ${transcriptPath}`);
  const topicHint = topicHintFrom(transcript.text || segments.map((s) => s.text).join(' '));

  const outDir = resolve(project, 'brand-assets', 'auto-footage');
  await mkdir(outDir, {recursive: true});

  // Seed with every other scene's already-downloaded source title (including scenes not in
  // this run, e.g. a --only rerun) so a fresh search doesn't re-pick the same underlying video
  // — see clip-reuse-rule.md and pickBestCandidate's two-pass scoring.
  const usedTitles = new Set();
  try {
    const existingSources = JSON.parse(await readFile(resolve(outDir, 'sources.json'), 'utf8'));
    for (const entry of Object.values(existingSources)) {
      if (entry?.title) usedTitles.add(entry.title);
    }
  } catch {
    // no sources.json yet on a first run
  }

  const ffmpegBin = await resolveFfmpeg();
  const ffmpegLocation = ffmpegBin === 'ffmpeg' ? undefined : dirname(ffmpegBin);

  // footage-sourcing-rule.md: video comes from exactly these 4 approved channels and no
  // others (no global YouTube search, no stock-footage fallback). Sourcing is spread across
  // all four rather than draining whichever ranks first — rebuilt fresh per scene, sorted by
  // ascending usage so the least-used channel is always tried first.
  const APPROVED_CHANNELS = ['@NASCAR', '@NASCARonFOX', '@MMCS07', '@redline_us', '@FloRacing', '@dirtymomedia'];
  const channelCounts = Object.fromEntries(APPROVED_CHANNELS.map((h) => [h, 0]));
  const buildClipSources = () => [
    ...[...APPROVED_CHANNELS]
      .sort((a, b) => channelCounts[a] - channelCounts[b])
      .map((handle) => ({
        name: handle,
        run: (query, outPath, clipSeconds, person, introSkip) =>
          fromYouTubeChannel(python, handle, query, outPath, clipSeconds, ffmpegLocation, person, introSkip, usedTitles, ffmpegBin),
      })),
    // The known-good channels get first refusal; the rest of YouTube then fills the coverage
    // they can't, held to the same domain gate, hook-skip and burned-in-text checks.
    {
      name: 'youtube',
      run: (query, outPath, clipSeconds, person, introSkip) =>
        fromYouTube(python, query, outPath, clipSeconds, ffmpegLocation, person, introSkip, usedTitles, ffmpegBin),
    },
  ];
  const imageSources = [
    {name: 'pexels', run: (query, outPath) => imageFromPexels(query, outPath)},
    {name: 'pixabay', run: (query, outPath) => imageFromPixabay(query, outPath)},
    {name: 'wikimedia', run: (query, outPath) => imageFromWikimedia(query, outPath)},
  ];

  // A video source returns the matched title on success (so a source-credit card can name the
  // real show/video, not just "YouTube"), or plain `true`/`false` for sources that don't have
  // a title (Pexels/Pixabay/Wikimedia/images).
  const tryDownload = async (sources, query, outPath) => {
    for (const source of sources) {
      process.stdout.write(`  trying ${source.name}... `);
      let ok = false;
      try {
        ok = await source.run(query, outPath);
      } catch (err) {
        if (process.env.FLICK_DEBUG) console.log(`    [debug] ${source.name} threw: ${err.message}`);
        ok = false;
      }
      if (ok) {
        try {
          const info = await stat(outPath);
          if (info.size > 0) {
            console.log('ok');
            return {name: source.name, title: typeof ok === 'string' ? ok : null};
          }
        } catch {
          // fall through to skip
        }
      }
      console.log('skip');
    }
    return null;
  };

  const results = [];
  for (const [index, segment] of segments.entries()) {
    const scene = index + 1;
    if (onlyScenes.size && !onlyScenes.has(scene)) continue;
    const forcedMotion = motionOverride.has(scene);
    const person = detectPerson(segment.text);
    // An optional per-scene visualHint (e.g. "in-car cockpit camera") biases the search toward
    // a specific shot type the narration alone wouldn't suggest.
    const hintedText = segment.visualHint ? `${segment.visualHint} ${segment.text}` : segment.text;
    // Judge every candidate for this scene against the whole line, not just the query.
    currentTopicPool = contentWords(hintedText);
    const generalQuery = distinctiveWords(hintedText, 5).join(' ') || queryFor(hintedText, topicHint) || 'b-roll footage';
    // A bare person name tends to surface whatever's most viral about them (a crash, a win) —
    // not necessarily the moment this scene actually needs. An optional personQueryHint (e.g.
    // "interview press conference") biases the person search toward the right kind of footage
    // without losing the named-subject requirement.
    // Searching a bare name throws away everything the line is actually about, so the top
    // result is whatever is most viral about that person — a 2014 win under a 2026 podcast
    // line. Keep the narration's own keywords alongside the name unless the scene pins an
    // explicit personQueryHint.
    const personContext = distinctiveWords(hintedText, 8)
      .filter((word) => !person?.toLowerCase().includes(word))
      .slice(0, 4)
      .join(' ');
    const videoQuery = person
      ? [person, segment.personQueryHint || personContext].filter(Boolean).join(' ')
      : generalQuery;
    const name = `${String(scene).padStart(2, '0')}-${slug(segment.text)}`;
    const {start, end} = secondsOf(segment);
    const sceneDuration = end > start ? end - start : maxClipSeconds;
    const clipSeconds = Math.min(sceneDuration, maxClipSeconds);

    console.log(`Scene ${scene}: "${segment.text.slice(0, 60)}"${person ? ` [subject: ${person}]` : ''}`);

    if (forcedMotion) {
      console.log('  forced motion graphic (--motion-scenes) -> no download.');
      results.push({scene, query: videoQuery, file: null, source: 'motion-graphic'});
      continue;
    }

    // 1. Always attempt real video footage first — the default for almost every line.
    const videoPath = resolve(outDir, `${name}.mp4`);
    const introSkip = Number(segment.introSkipSeconds) || 0;

    // A manually-vetted exact video ID (e.g. after reviewing candidates and rejecting one for
    // baked-in branding) bypasses search entirely and downloads straight from that video.
    if (segment.forceYouTubeId) {
      console.log(`  using forced YouTube video: ${segment.forceYouTubeId} (intro skip ${introSkip}s)`);
      const ok = runYtDlpDownload(
        python,
        `https://www.youtube.com/watch?v=${segment.forceYouTubeId}`,
        videoPath,
        clipSeconds,
        ffmpegLocation,
        ['--no-playlist'],
        introSkip
      );
      if (ok) {
        results.push({scene, query: videoQuery, file: `${name}.mp4`, source: 'youtube-forced', title: segment.forceYouTubeTitle || null, mode: 'clip'});
        continue;
      }
      console.log('  forced video download failed, falling back to normal search.');
    }

    const videoSource = await tryDownload(
      buildClipSources().map((s) => ({name: s.name, run: (q, out) => s.run(q, out, clipSeconds, person, introSkip)})),
      videoQuery,
      videoPath
    );
    if (videoSource) {
      if (videoSource.title) usedTitles.add(videoSource.title);
      channelCounts[videoSource.name] = (channelCounts[videoSource.name] || 0) + 1;
      results.push({scene, query: videoQuery, file: `${name}.mp4`, source: videoSource.name, title: videoSource.title, mode: 'clip'});
      continue;
    }

    // 2. No usable clip. A named person needs their authentic image, not generic footage.
    if (person) {
      const imgPath = resolve(outDir, `${name}.jpg`);
      const imgSource = await tryDownload(imageSources, person, imgPath);
      if (imgSource) {
        results.push({scene, query: person, file: `${name}.jpg`, source: imgSource.name, title: imgSource.title, mode: 'image'});
        continue;
      }
    }

    // 3. Exact stats/dates/comparisons that footage can't convey become a motion graphic.
    if (isDataDriven(segment.text)) {
      console.log('  data-driven line, no clip available -> reserved for Flick motion graphic.');
      results.push({scene, query: generalQuery, file: null, source: 'motion-graphic'});
      continue;
    }

    // 4. Last resort: a relevant still image beats leaving the scene empty.
    const imgPath = resolve(outDir, `${name}.jpg`);
    const imgSource = await tryDownload(imageSources, generalQuery, imgPath);
    if (imgSource) {
      results.push({scene, query: generalQuery, file: `${name}.jpg`, source: imgSource.name, title: imgSource.title, mode: 'image'});
      continue;
    }

    console.log('  nothing found -> reserved for Flick motion graphic.');
    results.push({scene, query: generalQuery, file: null, source: 'motion-graphic'});
  }

  const counts = results.reduce((acc, r) => ({...acc, [r.source === 'motion-graphic' ? 'motion' : r.file ? 'downloaded' : 'failed']: (acc[r.source === 'motion-graphic' ? 'motion' : r.file ? 'downloaded' : 'failed'] || 0) + 1}), {});
  console.log('\nAuto-footage summary:');
  for (const row of results) {
    console.log(`  scene ${row.scene}: ${row.file ? `${row.file} (${row.source})` : row.source === 'motion-graphic' ? 'RESERVED FOR MOTION GRAPHIC' : 'FAILED'} (query: "${row.query}")`);
  }
  console.log(`\n${counts.downloaded || 0} downloaded, ${counts.motion || 0} reserved for motion graphics, ${counts.failed || 0} failed.`);
  console.log(`Saved to ${outDir}`);

  // Persist source/title per scene so assemble-video.mjs can render a small clean source-credit
  // card instead of relying on (or keeping) whatever branding the source clip carried — merge
  // with any existing file so a --only rerun doesn't wipe out other scenes' records.
  const sourcesPath = resolve(outDir, 'sources.json');
  let existing = {};
  try {
    existing = JSON.parse(await readFile(sourcesPath, 'utf8'));
  } catch {
    existing = {};
  }
  for (const row of results) {
    existing[row.scene] = {source: row.source, title: row.title || null, query: row.query};
  }
  await writeFile(sourcesPath, JSON.stringify(existing, null, 2) + '\n', 'utf8');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
