// Bakes every 9:16 bed (720x1280, 30fps) for the "3 races that could break the Chase" short: a 9:16 window cut
// from the 16:9 source, centred on the subject (cx, cy = fractions of the frame; s = window height fraction).
// Every range is used once, no overlaps. All NASCAR-official 2026 footage:
//   OT  "Kansas Final Laps ERUPT in Overtime | 2026" (VTBqA77xDE4) - scoring pylon on the left, cropped away
//   VG  "NASCAR Cup Series Highlights | 2026 Las Vegas Motor Speedway" (QiPbZV4zRpo)
//   VF  FOX "FINAL LAPS: Denny Hamlin takes the checkered flag at Pennzoil 400 in Las Vegas" (VYNROY3WGh0)
//   CC  "2026 Coca-Cola 600 | NASCAR Cup Series Highlights" (a_6CpnBk-uQ) - Charlotte
//   BR  "Denny Hamlin and Kyle Larson battle it out in Stage 1" (FjtMypEqYUc) - Bristol 2026; #5 Larson and #11 Hamlin; ticker row cropped off
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\long2\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\chase2\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\chase2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {OT: 'ot26.mp4', VG: 'vegas.mp4', VF: 'vegasfl.mp4', CC: 'c600.mp4', BR: 'battle1.mp4'};

// name, src, start s, bed length s, cx, s, cy
export const BEATS = [
  // S1 "NASCAR's championship battle is entering a dangerous three-race stretch."
  ['a1', 'VG', 16.0, 1.65, 0.45, 0.9, 0.5],
  ['a2', 'CC', 304.0, 1.65, 0.50, 0.9, 0.5],
  ['a3', 'OT', 8.0, 2.0, 0.55, 0.9, 0.5],
  // S2 "Kansas comes first, followed by Las Vegas and Charlotte,"
  ['t1', 'OT', 250.0, 1.8, 0.58, 0.9, 0.5],
  ['t2', 'VG', 232.0, 1.6, 0.50, 0.9, 0.5],
  ['t3', 'CC', 1420.0, 1.6, 0.55, 0.9, 0.5],
  // S3 "all 1.5-mile tracks,"
  ['u1', 'OT', 216.0, 1.5, 0.55, 0.9, 0.5],
  ['u2', 'CC', 100.0, 1.9, 0.60, 0.9, 0.5],
  // S4 "and with Kyle Larson only one point ahead of Denny Hamlin,"
  ['s4a', 'BR', 62.6, 1.6, 0.50, 0.82, 0.60],
  ['s4b', 'BR', 95.0, 1.6, 0.55, 0.82, 0.60],
  ['s4c', 'BR', 180.0, 1.95, 0.50, 0.82, 0.60],
  // S5 "every mistake could be massive,"
  ['w1', 'CC', 311.0, 1.4, 0.50, 0.9, 0.5],
  ['w2', 'CC', 1370.0, 1.7, 0.50, 0.9, 0.5],
  // S6 "three races, one championship fight,"
  ['x1', 'VF', 444.0, 1.5, 0.50, 0.9, 0.5],
  ['x2', 'VF', 492.0, 1.9, 0.50, 0.9, 0.5],
  // S7 "and everything could change!"
  ['y1', 'CC', 1410.0, 1.55, 0.50, 0.9, 0.5],
  ['y2', 'VF', 404.0, 1.9, 0.62, 0.9, 0.5],
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

