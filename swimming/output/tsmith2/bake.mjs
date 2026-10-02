// Bakes every 9:16 bed (720x1280, 30fps) for the Tatjana Smith comeback short, with the crop window centred on
// HER in each shot (cx = subject x as a fraction of the frame width, s = window height as a fraction of the
// frame, cy = subject y). Sources are the files already in ../tsmith1/dl; every range below was chosen to
// sit outside the ranges the long film (tsmith1) uses, and no two beats here overlap.
//   P   paris-100br-inspires  Paris 2024 100 br final, the walk-out: broadcast bar "RSA TATJANA SMITH", "T. SMITH"
//   TA  tokyo-anthem          Tokyo 2020 gold podium
//   AQ  aquapark              Aquapark's 2026 film about her (interview, medals, pool, Fukuoka 2023 reaction)
//   FR  fullview-reaffirm     Paris 2024 mixed zone after her last final - "couldn't have asked for a better way to end my career"
//   LD  la-drone              Los Angeles from the air
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\long2\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\tsmith1\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\tsmith2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {
  P: 'paris-100br-inspires.mp4',
  TA: 'tokyo-anthem.mp4',
  AQ: 'aquapark.mp4',
  FR: 'fullview-reaffirm.mp4',
  LD: 'la-drone.mp4',
};

// name, src, start s, bed length s, cx, s, cy
export const BEATS = [
  // S1 - "After retiring, following the Paris 2024 Olympics," (the bar is cropped out; the walk-out bar reads RSA TATJANA SMITH)
  ['b1', 'P', 137.6, 2.2, 0.43, 0.75, 0.455],
  ['b2', 'P', 140.2, 2.2, 0.46, 0.75, 0.455],
  // S2 - "double Olympic champion Tatjana Smith is officially back!"
  ['b3', 'AQ', 40.0, 2.4, 0.60, 1.0, 0.5],
  ['b4', 'AQ', 96.0, 2.4, 0.66, 0.9, 0.5],
  // S3 - "She says she started missing the water and rediscovered her love for swimming."
  ['b5', 'AQ', 57.0, 1.9, 0.55, 1.0, 0.5],
  ['b21', 'TA', 24.6, 1.9, 0.50, 1.0, 0.5],
  ['b8', 'AQ', 11.0, 1.9, 0.62, 1.0, 0.5],
  ['b24', 'AQ', 20.0, 1.9, 0.45, 1.0, 0.5],
  // S4 - "But this time, she has a new challenge."
  ['b22', 'AQ', 99.9, 1.2, 0.62, 1.0, 0.5],
  ['b9', 'AQ', 59.6, 2.0, 0.40, 1.0, 0.5],
  // S5 - "The 50-meter breaststroke at LA 2028 still has to qualify,"
  ['b10', 'AQ', 98.5, 1.4, 0.55, 1.0, 0.5],
  ['b11', 'LD', 13.0, 1.5, 0.40, 1.0, 0.5],
  ['b12', 'LD', 66.0, 1.8, 0.50, 1.0, 0.5],
  // S6 - "but at 29, Smith is ready to write a brand new chapter."
  ['c1', 'AQ', 9.0, 1.1, 0.42, 1.0, 0.5],
  ['c2', 'FR', 60.0, 1.5, 0.60, 1.0, 0.5],
  ['c3', 'FR', 76.0, 1.5, 0.60, 1.0, 0.5],
  ['c4', 'FR', 93.0, 1.7, 0.62, 1.0, 0.5],
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
