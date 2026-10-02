// Bakes every 9:16 bed (720x1280, 30fps) for the Marchand-calls-Ohashi-"scary" short.
// Row: name, source, start s, bed length s, cx, s (window height fraction), cy.
//
// Identity, per source:
//   OH/DT  Ohashi. This final had TWO Japanese swimmers (lane 4 OHASHI, lane 5 WATANABE), so the
//          markers from [[ohashi1-short]] still apply: black *arena* cap + Japan flag + pink goggles,
//          and the broadcast ticker highlighting "4 OHASHI 2:04.83 WR". Every range here is disjoint
//          from the ones ohashi1 used (OH 76-79.05, 128.3-130.55, 130.55-131.7, 132.45-133.7;
//          DT 3.45-6.1, 6.2-7.7, 15.6-17.9, 46.45-48.4, 49.95-61.75).
//   MA/MB  Marchand. Both feeds name him on screen - MA's results board reads "WR MARCHAND 1" and
//          MB's reads "1 MARCHAND FRA OR" - and he is the only swimmer in those close-ups.
//   GD     The Reuters mixed-zone interview with Ohashi. The Daily Guardian burns a "BREAKING NEWS"
//          strap across the bottom (y>0.86) and a "SOURCE: REUTERS" tag top-left (x<0.16), so every
//          crop from it uses s<=0.84 (cuts the strap) and sits at cx~0.53 (clears the tag).
//
//   OH  m69C8aYhbVg   host broadcast, Men's 200m Breaststroke final, Aichi-Nagoya 2026 (via ohashi1)
//   DT  vsDfRF3S5lw   agency close-ups of the same celebration, lane "4" board in frame (via ohashi1)
//   MA  wR0FW5Lab6w   World Aquatics, Marchand's 200m IM world record, Singapore 2025 - clean
//   MB  NmQk2BjelRI   Eurosport, Marchand's Paris 2024 200m BREASTSTROKE gold - Ohashi's own event.
//                     "LIVE EUROSPORT" bug top-right (x>0.82), so crops stay left of it.
//   GD  556W2LjdR7I   Ohashi in the mixed zone afterwards
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const O1 = 'D:\\flick\\swimming\\output\\ohashi1\\dl\\';
const DL = 'D:\\flick\\swimming\\output\\ohashi2\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\ohashi2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {
  OH: O1 + 'm69C8aYhbVg.mp4',
  DT: O1 + 'vsDfRF3S5lw.mp4',
  MA: DL + 'wR0FW5Lab6w.mp4',
  MB: DL + 'NmQk2BjelRI.mp4',
  GD: DL + '556W2LjdR7I.mp4',
};

export const BEATS = [
  // S1 - "But Leon Marchand has already noticed swimming's newest rising star."
  ['a1', 'MA', 133.0, 1.85, 0.52, 0.9, 0.38],
  ['a2', 'DT', 11.8, 2.15, 0.45, 0.92, 0.53],
  // S2 - "After Shin Ohashi broke the 200m breaststroke world record"
  ['b1', 'OH', 60.0, 1.85, 0.5, 1.0, 0.5],
  ['b2', 'OH', 110.0, 2.1, 0.5, 1.0, 0.5],
  // S3 - "in 2:04.83," - the stamp lands here
  ['c1', 'OH', 125.4, 2.65, 0.45, 0.94, 0.45],
  // S4 - "Marchand called the 17-year-old Japanese swimmer a 'scary' competitor."
  ['d1', 'MA', 128.0, 2.2, 0.52, 0.9, 0.38],
  ['d2', 'GD', 44.0, 2.5, 0.53, 0.8, 0.4],
  // S5 - "Ohashi is now looking toward LA 2028,"
  ['e1', 'GD', 52.0, 1.55, 0.53, 0.8, 0.4],
  ['e2', 'GD', 88.0, 1.85, 0.53, 0.8, 0.4],
  // S6 - "where Marchand could become one of his biggest rivals."
  ['f1', 'MB', 136.0, 2.85, 0.55, 0.95, 0.55],
  // S7 - "And Ohashi says he's ready for the challenge."
  ['g1', 'GD', 92.0, 2.75, 0.53, 0.8, 0.4],
  // S8 - "Could this become a HUGE Olympic battle?"
  ['h1', 'MA', 120.5, 1.4, 0.5, 1.0, 0.5],
  ['h2', 'OH', 122.0, 1.7, 0.5, 1.0, 0.5],
];

const dims = {};
for (const [k, f] of Object.entries(FILES)) {
  let txt = '';
  try { execFileSync(ff, ['-hide_banner', '-i', f], {stdio: ['ignore', 'pipe', 'pipe']}); } catch (e) { txt = String(e.stderr); }
  const m = /Video:.*?, (\d{3,5})x(\d{3,5})/.exec(txt);
  dims[k] = [Number(m[1]), Number(m[2])];
}
console.log(dims);

const only = process.argv.slice(2);
for (const [name, k, start, len, cx, s, cy] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const [W, H] = dims[k];
  const h = Math.round((H * s) / 2) * 2;
  const w = Math.round((h * 9) / 16 / 2) * 2;
  const x = Math.round(Math.max(0, Math.min(W - w, cx * W - w / 2)));
  const y = Math.round(Math.max(0, Math.min(H - h, cy * H - h / 2)));
  const vf = `crop=${w}:${h}:${x}:${y},scale=720:1280:flags=lanczos,fps=30,setsar=1`;
  execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len),
    '-i', FILES[k], '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
    '-pix_fmt', 'yuv420p', '-threads', '3', OUT + name + '.mp4']);
  console.log(name, k, start);
}
