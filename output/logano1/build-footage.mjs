import {readFileSync, writeFileSync} from 'fs';
import {allocate, render} from './alloc-footage.mjs';

const FPS = 30;
const OVERLAP = 16;
const tl = readFileSync('./remotion/src/timeline.ts', 'utf8');
const cuts = [...tl.matchAll(/\{n: (\d+), start: ([\d.]+), end: ([\d.]+)\}/g)].map((m) => ({
  n: +m[1],
  start: +m[2],
  end: +m[3],
}));
const startFrame = (n) => Math.round(cuts[n - 1].start * FPS);
const endFrame = (n) => Math.round(cuts[n - 1].end * FPS);
const mounted = (n) => endFrame(n) - startFrame(n) + (n === cuts.length ? 0 : OVERLAP);

const D = 'gateway-drone1.mp4';
const G = 'gateway-drone2.mp4';
const W = 'broadcast-wide.mp4';
const T = 'broadcast-turn.mp4';
const P = 'broadcast-pitroad.mp4';
const H = 'broadcast-hamlin.mp4';

// Which source each scene draws from - budgeted so no source's cursor ever exceeds its real
// clip length (W=360f/12s, T/P/H=900f/30s each, D=7235f/241s, G=~6163f/205s). Single-letter names
// only - verify-chains.mjs's parser can't read a multi-char id like "D1".
const SOURCE = {
  1: W, 2: D, 3: G, 4: T, 5: D, 6: H, 7: G, 8: D,
  9: P, 10: G, 11: D, 12: G, 13: G, 14: D, 15: G, 16: D,
};

const EXTRAS = [{driftX: 0.5}, {zoom: 1.05}, {driftX: -0.5}, {driftX: 0.4}, {zoom: 1.04}];
const withExtras = (links) => links.map((l, i) => ({...l, extra: EXTRAS[i % EXTRAS.length]}));

const NOTE = {
  1: 'title card - the pole margin as the hook',
  2: 'the two-tenths gap - largest margin in years (stat card)',
  3: 'the qualifying lap - 32.817s / 137.124mph (stat card)',
  4: 'Logano vs Larson qualifying speed (comparison card)',
  5: 'Logano quote - "screwed up Turn 1... clean lap" (quote card)',
  6: 'the points gap - 8th, 72 back of Hamlin (stat card)',
  7: 'Logano quote - "racetrack we had circled" (quote card)',
  8: 'what starting first actually buys - footage only',
  9: 'Gateway track record - won 2022, 4-for-4 top-5s (stat card)',
  10: "Larson's winless streak - 50 races (stat card)",
  11: 'front row + row two lineup - Logano/Larson/Blaney/Bell (lineup card)',
  12: 'Briscoe 5th, Hocevar 6th - six Chase drivers top six - footage only',
  13: "Hamlin 10th, leads Bell by 12 - the standings gap (stat card)",
  14: 'pole is not a win - footage only',
  15: 'the margin that matters - footage only',
  16: 'the closing question - footage only',
};

const scenes = {};
for (let n = 1; n <= 16; n++) {
  scenes[n] = withExtras(allocate(SOURCE[n], mounted(n)));
}

let chains = 'export const CHAINS: Record<number, Link[]> = {\n';
for (let n = 1; n <= 16; n++) {
  chains += `  // ${n} (${mounted(n)}f) - ${NOTE[n]}\n`;
  chains += `  ${n}: [${render(scenes[n])}],\n\n`;
}
chains += '};\n';

const header = `/**
 * Scene -> chain of bed clips.
 *
 * Same rules as every film before this one:
 *   1. No link over 7s (190 frames used here, under the 210 hard cap for margin).
 *   2. No two links anywhere in this file share overlapping ranges of the same source.
 *   3. Relevancy: this event (Joey Logano's pole at Gateway/WWTR for the 2026 Enjoy Illinois 300,
 *      beating Kyle Larson by 0.276s) happened within the last 24-48 hours of this build, so no
 *      on-car/qualifying-lap footage or driver interview video exists yet on any channel searched.
 *      Every specific fact and quote in this script is instead carried by a stat/quote/comparison
 *      card (see scene files); the video underneath is real, honest, generic Gateway/WWTR footage
 *      used only as atmosphere - never captioned or implied to be "this exact race."
 *
 * Sources (confirmed real, downloaded ${new Date().toISOString().slice(0, 10)}):
 *   D  gateway-drone1.mp4     "Raw drone video: World Wide Technology Raceway preps for NASCAR
 *                             race" (KSDK News, St. Louis NBC affiliate,
 *                             youtube.com/watch?v=6hRnCz3_hNo, 2023-06-01). Clean aerial of the
 *                             oval, grandstands, garage/hauler lot - no overlay anywhere in it.
 *   G  gateway-drone2.mp4     "Drone video: World Wide Technology Raceway preps for NASCAR race"
 *                             (KSDK News, youtube.com/watch?v=SsSnWfKV_kU, 2022-06-03). Same style;
 *                             includes a wide shot with the St. Louis Arch/skyline in frame. Clean
 *                             throughout.
 *   W  broadcast-wide.mp4     First 12s of a real Cup Series broadcast clean shot (no leaderboard),
 *                             pulled from NASCAR's own "2025 NASCAR Cup Series Full Race: Enjoy
 *                             Illinois 300 at World Wide Technology Raceway" upload
 *                             (youtube.com/watch?v=IqRKxvua7q8) - real cars racing at this exact
 *                             track, one year prior. Used purely as generic track action.
 *   T  broadcast-turn.mp4     30s clean in-car segment from the same 2025 broadcast (~2:10:00 mark)
 *                             - real racing, no leaderboard/graphic in frame.
 *   P  broadcast-pitroad.mp4  30s clean pit-road segment from the same broadcast (~1:05:00 mark).
 *   H  broadcast-hamlin.mp4   30s clean segment from the same broadcast (~3:05:00 mark) showing the
 *                             real No. 11 car (Denny Hamlin, who is factually part of this story).
 *
 * No confirmed real footage exists yet for the actual 2026 qualifying lap, Logano's or Larson's
 * on-camera quotes, or this specific race weekend - every scene that needs those facts uses a
 * card instead of a forced/mismatched clip. See each scene file's comment for its sourcing note.
 *
 * CHAINS below is generated by build-footage.mjs (project root) from alloc-footage.mjs's
 * non-overlapping allocator - regenerate with \`node build-footage.mjs\` if scene durations change.
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

const D = 'gateway-drone1.mp4';
const G = 'gateway-drone2.mp4';
const W = 'broadcast-wide.mp4';
const T = 'broadcast-turn.mp4';
const P = 'broadcast-pitroad.mp4';
const H = 'broadcast-hamlin.mp4';

`;

const footer = '\nexport const chain = (n: number): Link[] => CHAINS[n];\n';

writeFileSync('remotion/src/footage.ts', header + chains + footer);
console.log('Wrote footage.ts');
