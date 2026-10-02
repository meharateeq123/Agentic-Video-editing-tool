// Generates remotion/src/footage.ts for the Larson-Hamlin points-swing film.
//
// CORRECTED 2026-09-16: the first build assigned real-footage/graphics to scene numbers based on
// an assumed paragraph order that turned out to be off by one starting at scene 2 - gen-timeline's
// scene N is title (N=1) or body paragraph N-1, and every "which scene says X" assumption here was
// never checked against the actual generated timeline.ts TRANSITION_IN comments (or the VO
// transcript) before footage/graphics were assigned. The user caught it ("18 or 0.333 wali tumnai
// motion graphics itni pahlai hi laga dia") - the "18 cautions" and "0.333s" cards were sitting a
// full scene early. Verified against remotion/public/vo transcript.json word timestamps this time.
import {writeFileSync} from 'node:fs';

const FPS = 30;
const MAX_LINK = 190; // 6.33s, under the 7s/210f hard cap
const OVERLAP = 16;

// Same CUTS as remotion/src/timeline.ts - duplicated here so mountedFrames matches exactly
// (timeline.ts is TS and this is a plain node script).
const CUTS = [
  {n: 1, start: 0, end: 4.6},
  {n: 2, start: 4.6, end: 17.0},
  {n: 3, start: 17.0, end: 36.92},
  {n: 4, start: 36.92, end: 47.52},
  {n: 5, start: 47.52, end: 68.22},
  {n: 6, start: 68.22, end: 85.45},
  {n: 7, start: 85.45, end: 96.21},
  {n: 8, start: 96.21, end: 108.46},
  {n: 9, start: 108.46, end: 130.69},
  {n: 10, start: 130.69, end: 147.14},
  {n: 11, start: 147.14, end: 162.54},
  {n: 12, start: 162.54, end: 178.97},
  {n: 13, start: 178.97, end: 197.92},
  {n: 14, start: 197.92, end: 205.33},
  {n: 15, start: 205.33, end: 224.56},
  {n: 16, start: 224.56, end: 237.27},
  {n: 17, start: 237.27, end: 251.12},
  {n: 18, start: 251.12, end: 283.32},
  {n: 19, start: 283.32, end: 296.95},
  {n: 20, start: 296.95, end: 318.42},
  {n: 21, start: 318.42, end: 337.32},
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

// highlights.mp4 is 1974.69s. blaney1 already used 13-790 (general), 800-870 (Zane replay),
// 985-1023 (Blaney crash), 1555-1580 (Elliott crash). Every zone below is fresh territory this
// film claims for itself, well clear of all four.
//
// Real-moment homes, corrected to their actual scenes:
//   scene 6  - "He led 80 laps...passed Joey Logano for the lead...crossing the line 0.333
//              seconds ahead..." -> the real restart-pass footage (was wrongly on scene 5).
//   scene 7  - "It was his 33rd career Cup win, his first at Gateway..." -> the real "GOES BACK
//              TO VICTORY LANE...WINS" call (was wrongly on scene 6).
//   scene 10 - "...Hamlin largely stayed out of trouble, finishing ninth..." -> real Denny
//              Hamlin footage (was wrongly on scene 9).
const sweepH_a = makeSweep('highlights.mp4', 1023); // scenes 1-5, general Gateway action
const scene6 = fixedLinks('highlights.mp4', 1611, mountedFrames(6)); // real Larson restart pass
const scene7 = fixedLinks('highlights.mp4', 1907, mountedFrames(7)); // real victory-lane call
const scene10 = fixedLinks('highlights.mp4', 1112, mountedFrames(10)); // real Denny Hamlin footage
const sweepH_b = makeSweep('highlights.mp4', 1140); // scenes 11,12,16,19, general again

// scene 8 - "victory...vaulted him from seventh to second...nine points back" -> larson-win.mp4
// scene 9 - "That's a 40-point swing in one race..." -> larson-win.mp4 continues
const scene8 = fixedLinks('larson-win.mp4', 26, mountedFrames(8)); // fresh range, blaney1 used 0-25.8
const scene9 = fixedLinks('larson-win.mp4', scene8.end, mountedFrames(9));

// scenes 13/14/15 - the three real Larson quotes, in their correct order now:
//   13 "We got our swagger back."
//   14 "I don't know if we're quite yet where we can go dominate..."
//   15 "I haven't doubted myself. I haven't doubted our team."
const scene13 = fixedLinks('larson-interview.mp4', 0, mountedFrames(13));
const scene14 = fixedLinks('larson-interview.mp4', scene13.end, mountedFrames(14));
const scene15 = fixedLinks('larson-interview.mp4', scene14.end, mountedFrames(15));

const scene18 = fixedLinks('bristol2.mp4', 20, mountedFrames(18));
const scene20 = fixedLinks('bristol2.mp4', scene18.end, mountedFrames(20));

const CHAINS = {
  1: sweepH_a(mountedFrames(1)),
  2: sweepH_a(mountedFrames(2)),
  3: sweepH_a(mountedFrames(3)),
  4: sweepH_a(mountedFrames(4)),
  5: sweepH_a(mountedFrames(5)),
  6: scene6.links,
  7: scene7.links,
  8: scene8.links,
  9: scene9.links,
  10: scene10.links,
  11: sweepH_b(mountedFrames(11)),
  12: sweepH_b(mountedFrames(12)),
  13: scene13.links,
  14: scene14.links,
  15: scene15.links,
  16: sweepH_b(mountedFrames(16)),
  17: fixedLinks('bristol1.mp4', 15, mountedFrames(17)).links,
  18: scene18.links,
  19: sweepH_b(mountedFrames(19)),
  20: scene20.links,
  21: fixedLinks('highlights.mp4', scene7.end, mountedFrames(21)).links,
};

const SHORT = {
  'highlights.mp4': 'H',
  'larson-win.mp4': 'K',
  'larson-interview.mp4': 'I',
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
 *   3. Relevancy: the actual 2026 Enjoy Illinois 300 at Gateway (Sept 13-14) - Kyle Larson's
 *      real restart pass for the lead, the real victory-lane call, Denny Hamlin's own real
 *      footage, and Larson's own real post-race quotes ("We got our swagger back", "I haven't
 *      doubted myself... I haven't doubted our team"). Corrected 2026-09-16 to sit on the scene
 *      that actually narrates each moment - see the CORRECTED note at the top of this file.
 *
 * Sources (confirmed real, downloaded 2026-09-16):
 *   H  highlights.mp4        "NASCAR Cup Series Highlights | 2026 World Wide Technology Raceway"
 *                             (official @NASCAR channel, youtube.com/watch?v=W1u734oeW1o) - shared
 *                             with blaney1's dl folder, already h264. Real Larson restart pass for
 *                             the lead at ~26:51-27:36 (offset 1611 here, scene 6), the real "KYLE
 *                             LARSON GOES BACK TO VICTORY LANE...AND WINS" call at ~31:43-31:56
 *                             (offset 1907, scene 7), and real Denny Hamlin race footage at ~18:32
 *                             ("DENNY HAMLIN SAYS...") (offset 1112, scene 10). General shots used
 *                             from offset 1023 onward, clear of blaney1's own crash-zone usage
 *                             (985-1023, 1555-1580) and its general pool (13-790).
 *   K  larson-win.mp4        "Kyle Larson earns first win of season at Enjoy Illinois 300" (KSDK
 *                             News, youtube.com/watch?v=d-np3aBM8tE) - shared with blaney1's
 *                             bed-pool; this film claims the fresh 26s+ range, clear of blaney1's
 *                             0-25.8s usage.
 *   I  larson-interview.mp4  "LAST WORD from the Enjoy Illinois 300 at Gateway | Exclusive Driver
 *                             Interviews | NASCAR on USA" (USA Sports,
 *                             youtube.com/watch?v=glzPhRIIhNU) - real victory-lane interview.
 *                             Auto-captions confirmed this is the actual source of both quoted
 *                             Larson lines: "we got our swagger back a little bit" (~2:02) and "I
 *                             haven't doubted uh myself. I haven't doubted our team" (~1:36).
 *   D  bristol1.mp4          "Bristol Motor Speedway as a drone sees it" (ricky clowers,
 *                             youtube.com/watch?v=-mMfn-NbzV0) - shared with blaney1's bed-pool,
 *                             fresh offset 15+.
 *   G  bristol2.mp4          "Bristol Motor Speedway drone flight" (Jeanne's Droneventures,
 *                             youtube.com/watch?v=xqdP_7arnl8) - shared with blaney1's bed-pool,
 *                             fresh offset 20+.
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
const K = 'larson-win.mp4';
const I = 'larson-interview.mp4';
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
