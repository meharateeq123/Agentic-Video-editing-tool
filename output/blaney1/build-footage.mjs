// Generates remotion/src/footage.ts for the Blaney brake-failure film.
// Mostly hand-placed fixed offsets (the crash, the real Blaney/Elliott moments, the quote
// scenes) plus a cursor-swept pool of clean general racing shots from the highlights reel for
// every scene that just needs "real Gateway racing" behind narration.
import {writeFileSync} from 'node:fs';

const FPS = 30;
const MAX_LINK = 190; // 6.33s, under the 7s/210f hard cap
const OVERLAP = 16;

// Same CUTS as remotion/src/timeline.ts - duplicated here so mountedFrames matches exactly
// (timeline.ts is TS and this is a plain node script).
const CUTS = [
  {n: 1, start: 0, end: 1.51},
  {n: 2, start: 1.51, end: 12.16},
  {n: 3, start: 12.16, end: 31.62},
  {n: 4, start: 31.62, end: 41.26},
  {n: 5, start: 41.26, end: 57.97},
  {n: 6, start: 57.97, end: 63.03},
  {n: 7, start: 63.03, end: 91.22},
  {n: 8, start: 91.22, end: 99.58},
  {n: 9, start: 99.58, end: 128.32},
  {n: 10, start: 128.32, end: 146.29},
  {n: 11, start: 146.29, end: 158.83},
  {n: 12, start: 158.83, end: 169.3},
  {n: 13, start: 169.3, end: 185.04},
  {n: 14, start: 185.04, end: 208.79},
  {n: 15, start: 208.79, end: 224.58},
  {n: 16, start: 224.58, end: 239.8},
  {n: 17, start: 239.8, end: 254.96},
  {n: 18, start: 254.96, end: 277.23},
  {n: 19, start: 277.23, end: 292.07},
  {n: 20, start: 292.07, end: 302.32},
  {n: 21, start: 302.32, end: 320.37},
  {n: 22, start: 320.37, end: 338.88},
];

const startFrame = (n) => Math.round(CUTS[n - 1].start * FPS);
const endFrame = (n) => Math.round(CUTS[n - 1].end * FPS);
const sceneFrames = (n) => endFrame(n) - startFrame(n);
const mountedFrames = (n) => sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

// Splits `total` frames into chunks <=MAX_LINK, evenly sized (no tiny tail link).
function chunks(total) {
  const n = Math.ceil(total / MAX_LINK);
  const base = Math.floor(total / n);
  const out = [];
  let left = total;
  for (let i = 0; i < n; i++) {
    const f = i === n - 1 ? left : base;
    out.push(f);
    left -= f;
  }
  return out;
}

// Lays consecutive chunks out from a fixed start point, 0.4s gap between them. Returns
// {links, end} so a caller can chain a following scene right after where this one stopped.
function fixedLinks(src, startSec, totalFrames) {
  let cursor = startSec;
  const links = chunks(totalFrames).map((f) => {
    const l = {src, start: Number(cursor.toFixed(2)), frames: f};
    cursor += f / FPS + 0.4;
    return l;
  });
  return {links, end: cursor};
}

// Cursor-swept general pool, single shared cursor per call site.
function makeSweep(src, start) {
  let cursor = start;
  return (totalFrames) => {
    const links = chunks(totalFrames).map((f) => {
      const l = {src, start: Number(cursor.toFixed(2)), frames: f};
      cursor += f / FPS + 0.4;
      return l;
    });
    return links;
  };
}

const sweepH = makeSweep('highlights.mp4', 13);

// Scene 5's crash sequence flows straight into scene 6's radio-call aftermath - chain the
// cursor instead of guessing where scene 5 ends up after its gaps.
const crash = fixedLinks('highlights.mp4', 985, mountedFrames(5));
const radio = fixedLinks('highlights.mp4', crash.end, mountedFrames(6));

const CHAINS = {
  1: fixedLinks('highlights.mp4', 10, mountedFrames(1)).links,
  2: sweepH(mountedFrames(2)),
  3: sweepH(mountedFrames(3)),
  4: sweepH(mountedFrames(4)),
  5: crash.links,
  6: radio.links,
  7: sweepH(mountedFrames(7)),
  8: fixedLinks('blaney-interview.mp4', 8, mountedFrames(8)).links,
  9: sweepH(mountedFrames(9)),
  10: fixedLinks('zane-crash.mp4', 0, mountedFrames(10)).links,
  11: fixedLinks('highlights.mp4', 1555, mountedFrames(11)).links,
  12: sweepH(mountedFrames(12)),
  13: sweepH(mountedFrames(13)),
  14: fixedLinks('larson-win.mp4', 0, mountedFrames(14)).links,
  15: sweepH(mountedFrames(15)),
  16: fixedLinks('blaney-interview.mp4', 87, mountedFrames(16)).links,
  17: sweepH(mountedFrames(17)),
  18: fixedLinks('blaney-interview.mp4', 27, mountedFrames(18)).links,
  19: sweepH(mountedFrames(19)),
  20: fixedLinks('bristol1.mp4', 0, mountedFrames(20)).links,
  21: fixedLinks('bristol2.mp4', 0, mountedFrames(21)).links,
  22: sweepH(mountedFrames(22)),
};

const SHORT = {
  'highlights.mp4': 'H',
  'blaney-interview.mp4': 'B',
  'zane-crash.mp4': 'Z',
  'larson-win.mp4': 'K',
  'bristol1.mp4': 'D',
  'bristol2.mp4': 'G',
};

function renderLinks(links) {
  const calls = links.map((l) => `L(${SHORT[l.src]}, ${l.start}, ${l.frames})`);
  if (calls.length <= 1) return calls.join(', ');
  return '\n    ' + calls.join(',\n    ') + ',\n  ';
}

const chainsSrc = Object.entries(CHAINS)
  .map(([n, links]) => `  ${n}: [${renderLinks(links)}],`)
  .join('\n');

const out = `/**
 * Scene -> chain of bed clips.
 *
 * Same rules as every film before this one:
 *   1. No link over 7s (190 frames used here, under the 210 hard cap for margin).
 *   2. No two links anywhere in this file share overlapping ranges of the same source.
 *   3. Relevancy: this is the actual 2026 Enjoy Illinois 300 at Gateway (Sept 13-14) - Ryan
 *      Blaney's brake-rotor failure on Lap 155, Chase Elliott's near-identical failure soon
 *      after, Zane Smith's earlier brake failure, and Kyle Larson's win. Unlike the previous
 *      qualifying-only film (logano1), this race already happened and real footage of every
 *      major beat was found and used - not generic atmosphere b-roll standing in for it.
 *
 * Sources (confirmed real, downloaded 2026-09-14):
 *   H  highlights.mp4       "NASCAR Cup Series Highlights | 2026 World Wide Technology Raceway"
 *                            (official @NASCAR channel, youtube.com/watch?v=W1u734oeW1o). Contains
 *                            the real Blaney crash (~16:25-17:03 in source = offset 985-1023 here)
 *                            with his own team radio ("Yep. I'm fine. Brakes.") and commentary
 *                            confirming "the rotor come up through the hood", and the real Elliott
 *                            (#9) brake failure that collects Chase Briscoe (~26:04-26:28 = offset
 *                            1555-1580). General racing shots elsewhere in the reel (offset 13-790,
 *                            well clear of both crash zones and the Zane Smith replay segment
 *                            around 800-870) cover every scene that just needs real Gateway race
 *                            action behind narration.
 *   B  blaney-interview.mp4 Ryan Blaney's real post-race interview ("Ryan Blaney Reacts to DNF at
 *                            Gateway", Frontstretch, youtube.com/watch?v=nLLJbPc6RU8). Auto-captions
 *                            confirmed this is the actual source the script's Blaney quotes were
 *                            transcribed from - offsets 8/87/27 seconds into it are him actually
 *                            saying the three quoted lines on camera.
 *   Z  zane-crash.mp4       "Zane Smith's Brake Rotor Broke at Gateway" (Jared Haas,
 *                            youtube.com/watch?v=Ip5hd9I5LcU) - real in-car footage of his crash.
 *   K  larson-win.mp4       "Kyle Larson earns first win of season at Enjoy Illinois 300" (KSDK
 *                            News, youtube.com/watch?v=d-np3aBM8tE) - real win/victory-lane footage.
 *   D  bristol1.mp4         "Bristol Motor Speedway as a drone sees it" (ricky clowers,
 *                            youtube.com/watch?v=-mMfn-NbzV0) - real drone footage of the track the
 *                            Chase moves to next; honest atmosphere, not implied to be raceday.
 *   G  bristol2.mp4         "Bristol Motor Speedway drone flight" (Jeanne's Droneventures,
 *                            youtube.com/watch?v=xqdP_7arnl8) - same use as D, second angle.
 *
 * CHAINS below is generated by build-footage.mjs (project root) - regenerate with
 * \`node build-footage.mjs\` if scene durations change.
 */

export type Bed = {
  src: string;
  startFrom: number;
  span: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
};

export type Link = Bed & {frames: number};

const P_ = (name: string) => \`bed-pool/\${name}\`;

const L = (
  file: string,
  startFrom: number,
  frames: number,
  extra: Omit<Bed, 'src' | 'startFrom' | 'span'> = {},
): Link => ({src: P_(file), startFrom, frames, span: frames / 30, ...extra});

const H = 'highlights.mp4';
const B = 'blaney-interview.mp4';
const Z = 'zane-crash.mp4';
const K = 'larson-win.mp4';
const D = 'bristol1.mp4';
const G = 'bristol2.mp4';

export const CHAINS: Record<number, Link[]> = {
${chainsSrc}
};

export const chain = (n: number): Link[] => CHAINS[n];
`;

writeFileSync('remotion/src/footage.ts', out);
console.log('Wrote footage.ts');
for (const [n, links] of Object.entries(CHAINS)) {
  const total = links.reduce((t, l) => t + l.frames, 0);
  console.log(`  scene ${n}: ${links.length} link(s), ${total}f (${(total / 30).toFixed(2)}s) need=${mountedFrames(Number(n))}f`);
}
