// Builds src/timeline.ts by aligning source-script.txt against the voiceover's own word-level
// timestamps, rather than estimating scene lengths from word count.
//
//   node align-timeline.mjs vo-words.json remotion/public/vo/yuzidi.wav
//
// gen-timeline.mjs splits the film proportionally by word count and then snaps each boundary to the
// nearest pause. That works when the read is even, but the error is cumulative: on this 414s
// voiceover it had drifted by a full sentence by the back half, so scene 1 swallowed scene 2's line
// and several boundaries landed mid-sentence. Whisper gives a timestamp for every word, so the
// paragraph breaks can be found exactly instead of approximated.
//
// The alignment is by word INDEX, not by time. The transcript and the script are the same text, so
// their word counts track each other closely even where the narrator speeds up or slows down. For
// each paragraph we jump to its proportional word index, then search a small window around it for
// the best match to that paragraph's closing words, then nudge the boundary onto a real pause.

import {readFileSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const FPS = 30;
const OVERLAP = 16;
const BLEED = 20;

const [, , wordsPath, voPath] = process.argv;
if (!wordsPath || !voPath) {
  console.error('usage: node align-timeline.mjs <vo-words.json> <vo.wav>');
  process.exit(1);
}

const paragraphs = readFileSync('source-script.txt', 'utf8')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

// Whisper writes numbers as digits and hears "Yu" as "you", so comparison is on a loose key:
// lowercase, punctuation stripped, and the handful of spellings it reliably differs on folded
// together. Words that still don't match are simply skipped by the windowed search below.
const NUMBERS = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7',
  eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12', thirteen: '13',
  fourteen: '14', fifteen: '15', sixteen: '16', twenty: '20', thirty: '30', forty: '40',
  fifty: '50', sixty: '60', seventy: '70', eighty: '80', ninety: '90', hundred: '100',
};
const SAME = {you: 'yu', yu: 'yu', its: 'it', th: ''};

function norm(s) {
  let w = String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  if (NUMBERS[w]) w = NUMBERS[w];
  if (SAME[w] !== undefined) w = SAME[w];
  return w;
}

const vo = JSON.parse(readFileSync(wordsPath, 'utf8'));
const words = vo.words.map((w) => ({
  t0: w.startMs / 1000,
  t1: w.endMs / 1000,
  raw: w.text,
  k: norm(w.text),
}));

const scriptWords = paragraphs.map((p) => p.split(/\s+/).map(norm).filter(Boolean));
const totalScript = scriptWords.reduce((a, w) => a + w.length, 0);

// Pauses in the read, used only to nudge a boundary that already sits in the right place.
let ffmpeg;
try {
  ffmpeg = require('./remotion/node_modules/ffmpeg-static');
} catch {
  ffmpeg = require('../../../output/shorts/gibbs1/remotion/node_modules/ffmpeg-static');
}
const det =
  spawnSync(ffmpeg, ['-i', voPath, '-af', 'silencedetect=noise=-40dB:d=0.15', '-f', 'null', '-'], {
    encoding: 'utf8',
  }).stderr || '';
const silences = [...det.matchAll(/silence_start: ([\d.]+)/g)].map((s) => +s[1]);
const probe = spawnSync(ffmpeg, ['-i', voPath, '-hide_banner'], {encoding: 'utf8'}).stderr || '';
const dm = /Duration: (\d+):(\d+):([\d.]+)/.exec(probe);
const filmSeconds = +dm[1] * 3600 + +dm[2] * 60 + +dm[3];
console.log(`VO ${filmSeconds.toFixed(2)}s, ${words.length} words, ${silences.length} silences`);

// Full sequential alignment of script words to transcript words (Needleman-Wunsch with an affine-
// free linear gap). A windowed fuzzy tail-match was tried first and sat 1-2 words late wherever the
// paragraph did not end on strong punctuation, because a position just past the true end scored the
// same as the true end. A global alignment has no such ambiguity: every script word gets exactly one
// transcript index, so a paragraph's end is simply the index its last word mapped to.
const flat = [];
for (let p = 0; p < scriptWords.length; p++) {
  for (const w of scriptWords[p]) flat.push({p, k: w});
}
const N = flat.length;
const M = words.length;
const MATCH = 2;
const MISS = -1;
const GAP = -1;

const H = new Int32Array((N + 1) * (M + 1));
const D = new Int8Array((N + 1) * (M + 1)); // 0 diag, 1 up (skip script), 2 left (skip transcript)
for (let i = 1; i <= N; i++) {
  H[i * (M + 1)] = i * GAP;
  D[i * (M + 1)] = 1;
}
for (let j = 1; j <= M; j++) {
  H[j] = j * GAP;
  D[j] = 2;
}
for (let i = 1; i <= N; i++) {
  const row = i * (M + 1);
  const prev = row - (M + 1);
  const ki = flat[i - 1].k;
  for (let j = 1; j <= M; j++) {
    const diag = H[prev + j - 1] + (ki === words[j - 1].k ? MATCH : MISS);
    const up = H[prev + j] + GAP;
    const left = H[row + j - 1] + GAP;
    let best = diag;
    let dir = 0;
    if (up > best) {
      best = up;
      dir = 1;
    }
    if (left > best) {
      best = left;
      dir = 2;
    }
    H[row + j] = best;
    D[row + j] = dir;
  }
}

// Backtrace: for each script word, the last transcript index it consumed.
const mapTo = new Int32Array(N).fill(-1);
{
  let i = N;
  let j = M;
  while (i > 0 && j > 0) {
    const dir = D[i * (M + 1) + j];
    if (dir === 0) {
      mapTo[i - 1] = j - 1;
      i--;
      j--;
    } else if (dir === 1) {
      i--;
    } else {
      j--;
    }
  }
}
// A script word the aligner skipped inherits the next mapped word's index, so a paragraph whose
// final word was dropped still resolves to a real place in the recording.
for (let i = N - 1; i >= 0; i--) {
  if (mapTo[i] < 0) mapTo[i] = i + 1 < N ? mapTo[i + 1] : M - 1;
}

/** Transcript index of the last word of paragraph p. */
const paraEndIdx = [];
{
  let i = 0;
  for (let p = 0; p < scriptWords.length; p++) {
    i += scriptWords[p].length;
    paraEndIdx.push(mapTo[i - 1]);
  }
}

const cuts = [];
let cursor = 0;

for (let i = 0; i < paragraphs.length; i++) {
  const start = cursor;

  let end;
  if (i === paragraphs.length - 1) {
    end = filmSeconds;
  } else {
    const idx = paraEndIdx[i];

    // Boundary sits in the gap after the paragraph's last word; slide onto a real pause if one
    // falls in that gap.
    const wEnd = words[idx].t1;
    const nextStart = idx + 1 < words.length ? words[idx + 1].t0 : wEnd;
    end = (wEnd + nextStart) / 2;
    for (const s of silences) {
      if (s >= wEnd - 0.05 && s <= nextStart + 0.25) {
        end = s + 0.06;
        break;
      }
    }
    if (end <= start + 0.5) end = Math.max(start + 0.5, nextStart); // never emit a zero-length scene
    console.log(
      `  ${String(i + 1).padStart(2)}  "...${words[idx].raw}" | "${words[idx + 1]?.raw ?? ''}..."` +
        `  -> ${end.toFixed(2)}`
    );
  }

  cuts.push({n: i + 1, start: +start.toFixed(2), end: +end.toFixed(2)});
  cursor = end;
}

const KINDS = ['dip', 'push', 'whip', 'wipe', 'whipDown'];
const transitions = cuts.map((_, i) => (i === 0 ? 'dip' : KINDS[(i * 2 + 1) % KINDS.length]));

const src = `// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = ${FPS};
export const FILM_SECONDS = ${filmSeconds.toFixed(2)};
export const OVERLAP = ${OVERLAP};
export const BLEED = ${BLEED};

// No cold-open hook clip in this film - the VO starts at frame 0. HOOK_SECONDS stays 0 so every
// downstream offset (FinalFilm.tsx, TOTAL_FRAMES) is a no-op rather than a special case.
export const HOOK_SECONDS = 0;
export const HOOK_FRAMES = Math.round(HOOK_SECONDS * FPS);
export const VO_ALIGNED = true;

export type Cut = {n: number; start: number; end: number};
export type TKind = 'dip' | 'whip' | 'whipDown' | 'push' | 'wipe';

export const TRANSITION_IN: TKind[] = [
${transitions.map((t, i) => `  '${t}', // ${i + 1}  ${paragraphs[i].slice(0, 64).replace(/\s+/g, ' ')}`).join('\n')}
];

export const CUTS: Cut[] = [
${cuts.map((c) => `  {n: ${c.n}, start: ${c.start}, end: ${c.end}},`).join('\n')}
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);

/**
 * How many frames a scene is actually mounted for. Every scene but the last carries OVERLAP extra
 * frames so the next one can cross over it, and a scene's footage has to cover those frames too.
 */
export const mountedFrames = (n: number) =>
  sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS) + HOOK_FRAMES;
`;

writeFileSync('remotion/src/timeline.ts', src);
console.log(`\nWrote timeline.ts — ${cuts.length} scenes, ${filmSeconds.toFixed(2)}s`);
for (const c of cuts) {
  console.log(
    `  ${String(c.n).padStart(2)}  ${c.start.toFixed(2)} -> ${c.end.toFixed(2)}  (${(c.end - c.start).toFixed(1)}s)`
  );
}
