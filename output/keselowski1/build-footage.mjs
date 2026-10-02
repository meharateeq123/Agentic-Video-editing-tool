import {readFileSync} from 'fs';
import {allocate, fixed, render} from './alloc-footage.mjs';

// Pull the exact mounted-frame count per scene straight from timeline.ts instead of hand-copying
// numbers (timeline.ts rounds each cut boundary independently, so a duration-based hand calc drifts
// by a frame here and there - exactly the mismatch verify-chains.mjs caught).
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

const H = 'highlights.mp4';
const Q = 'quotes.mp4';
const K = 'keselowski-quote.mp4';
const G = 'gateway-drone.mp4';

const EXTRAS = [{driftX: 0.5}, {zoom: 1.05}, {driftX: -0.5}, {driftX: 0.4}, {zoom: 1.04}];

const withExtras = (links) => links.map((l, i) => ({...l, extra: EXTRAS[i % EXTRAS.length]}));

const scenes = {};

scenes[1] = withExtras(allocate(H, mounted(1)));
scenes[2] = withExtras(allocate(H, mounted(2)));
scenes[3] = withExtras(allocate(H, mounted(3)));
scenes[4] = withExtras(allocate(H, mounted(4)));
scenes[5] = withExtras(allocate(H, mounted(5)));
scenes[6] = withExtras(allocate(H, mounted(6)));
scenes[7] = withExtras(allocate(H, mounted(7)));
scenes[8] = fixed(K, 6.3, mounted(8), {driftX: 0.4}); // "He ran into me"
scenes[9] = withExtras(allocate(H, mounted(9)));
scenes[10] = fixed(K, 11.7, mounted(10), {driftX: -0.4}); // "No, but there will be"
scenes[11] = fixed(K, 14.5, mounted(11), {zoom: 1.04}); // "His day is coming... watch out, Carson."
scenes[12] = withExtras(allocate(H, mounted(12)));
scenes[13] = withExtras(allocate(H, mounted(13)));
scenes[14] = fixed(Q, 796, mounted(14), {driftX: 0.4}); // "I don't know what happened, he spun."
scenes[15] = withExtras(allocate(H, mounted(15)));
scenes[16] = fixed(K, 49.5, mounted(16), {driftX: -0.4}); // "I'll tighten my belts."
scenes[17] = (() => {
  const total = mounted(17);
  const a = Math.min(104, total);
  const b = Math.min(190, total - a);
  const c = total - a - b;
  return [
    ...fixed(Q, 770, a, {driftX: 0.5}),
    ...fixed(Q, 776, b, {zoom: 1.05}),
    ...(c > 0 ? fixed(Q, 786, c, {driftX: -0.4}) : []),
  ];
})(); // the "clicks" quote + the reporter's stage-one follow-up
scenes[18] = withExtras(allocate(H, mounted(18)));
scenes[19] = withExtras(allocate(H, mounted(19)));
scenes[20] = withExtras(allocate(H, mounted(20)));
scenes[21] = withExtras(allocate(H, mounted(21))); // Amanda Ellis - no source clip found, neutral b-roll under a quote card
scenes[22] = withExtras(allocate(H, mounted(22)));
scenes[23] = withExtras(allocate(H, mounted(23))); // Amanda Ellis / Brad Moran - same gap, neutral b-roll
scenes[24] = withExtras(allocate(H, mounted(24)));
scenes[25] = withExtras(allocate(H, mounted(25))); // Hill/SVG mention - no source clip downloaded, neutral b-roll
scenes[26] = withExtras(allocate(H, mounted(26)));
scenes[27] = withExtras(allocate(H, mounted(27)));
scenes[28] = withExtras(allocate(G, mounted(28)));
scenes[29] = withExtras(allocate(G, mounted(29)));
scenes[30] = withExtras(allocate(G, mounted(30)));

let out = 'export const CHAINS: Record<number, Link[]> = {\n';
for (let n = 1; n <= 30; n++) {
  out += `  ${n}: [${render(scenes[n])}],\n`;
}
out += '};\n';

console.log(out);
