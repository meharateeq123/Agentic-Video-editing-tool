// Bakes every 9:16 bed (720x1280, 30fps) for the LA 2028 triathlon short. Each bed is a 9:16 window cut from the
// 16:9 source: cx = subject x (fraction of frame width), s = window height (fraction of the frame; <1 keeps
// bottom graphics and corner marks out), cy = subject y. Every range is used once, no overlaps.
//   VE  Drone Snap, "Venice Beach & Venice Canals in 4K" (0irnwM7VhIk) - crops keep its corner mark out (s<=0.9)
//   JG  Gwen Jorgensen, "Olympic Triathlon LA 2028 Swim Course Preview" (IODb4LERD78) - filmed on the Venice Beach swim course
//   WH  World Triathlon, "HIGHLIGHTS - WOMEN'S 2026 WTCS WEIHAI" (eI8xXcfvg_o) - bike pack; crop clears the left leaderboard
//   BG  Olympic Games, "Cassandre Beaugrand ... Paris 2024" (65e-cV2S1Ko) - women's Olympic triathlon run, finish and victory ceremony
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\long2\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\tri1\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\tri1\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {VE: 'venice2.mp4', JG: 'jorgensen.mp4', WH: 'weihai.mp4', BG: 'beaugrand.mp4'};

// name, src, start s, bed length s, cx, s, cy
export const BEATS = [
  // S1 "The 2028 Olympic triathlon is coming to Venice Beach, and the course looks incredible."
  ['d1', 'VE', 15.0, 1.95, 0.15, 0.9, 0.5],
  ['d2', 'VE', 260.0, 1.95, 0.62, 0.85, 0.45],
  ['d3', 'VE', 80.0, 2.3, 0.55, 0.9, 0.5],
  // S2 "Athletes will swim 1.5 km,"
  ['f1', 'JG', 12.0, 1.65, 0.50, 1.0, 0.5],
  ['f2', 'JG', 68.0, 2.0, 0.55, 1.0, 0.5],
  // S3 "bike 40 km,"
  ['g1', 'WH', 279.0, 2.1, 0.70, 0.82, 0.45],
  // S4 "then finish with a 10 km run along the iconic Los Angeles coastline."
  ['r1', 'BG', 444.0, 1.75, 0.20, 0.86, 0.5],
  ['e1', 'VE', 250.0, 1.75, 0.75, 0.85, 0.45],
  ['e2', 'VE', 200.0, 2.15, 0.75, 0.85, 0.45],
  // S5 "And here's the crazy part."
  ['k1', 'JG', 60.0, 2.0, 0.50, 1.0, 0.5],
  // S6 "The women's race will award the first Olympic medal of LA 2028."
  ['m1', 'BG', 468.6, 2.1, 0.55, 0.86, 0.5],
  ['m2', 'BG', 532.0, 2.1, 0.50, 0.86, 0.5],
  ['m3', 'BG', 540.0, 2.5, 0.62, 0.86, 0.5],
];

const dims = {};
for (const [k, f] of Object.entries(FILES)) {
  let txt = '';
  try { execFileSync(ff, ['-hide_banner', '-i', DL + f], {stdio: ['ignore', 'pipe', 'pipe']}); } catch (e) { txt = String(e.stderr); }
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
  execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len), '-i', DL + FILES[k], '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-threads', '3', OUT + name + '.mp4']);
  console.log(name, k, start, `crop ${w}x${h}@${x},${y}`);
}
