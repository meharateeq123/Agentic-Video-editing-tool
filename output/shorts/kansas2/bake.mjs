// Bakes every 9:16 bed (720x1280, 30fps) for the second Kansas short ("KANSAS Could JUST DESTROY the NASCAR
// Championship!"). Cover beds: a 9:16 window cut from the 16:9 source, centred on the subject (cx, cy fractions;
// s = window height fraction). Fill beds ('fill' with an explicit crop) lay a wide crop over its own blur.
// Every range is used once, no overlaps, and none of it is footage the earlier Kansas/Chase shorts used.
//   PH  NASCAR, 2024 Kansas extended highlights, "Action packed race produces photo finish" (57BJ8QugJXc) - mid-race only, never the finish
//   EL  NASCAR, 2025 Kansas "ELECTRIC Playoff Finish" extended highlights (x0KT12x40CY) - restarts only, never the final laps
//   KH  NASCAR, "NASCAR Cup Series Highlights | 2026 Kansas Speedway" (M_N_08SXrzg)
//   NB  Motorsports on NBC, "AdventHealth 400, Kansas Speedway | EXTENDED HIGHLIGHTS" (wzbRzXYXPP8) - the #5 and the 2026 winner
// Left-hand scoring pylons are cropped away (cx >= 0.5).
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\long2\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\kansas2\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\kansas2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {PH: 'photo24.mp4', EL: 'elec25.mp4', KH: 'kh26.mp4', NB: 'nbc26.mp4'};

// name, src, start s, bed length s, cx, s, cy, [fill crop x,y,w,h]
export const BEATS = [
  // S1 "Kansas has become one of NASCAR's wildest Chase tracks."
  ['a1', 'PH', 400.0, 1.95, 0.55, 0.9, 0.5],
  ['a2', 'PH', 416.0, 2.1, 0.62, 0.9, 0.5],
  // S2 "In five of the last seven races, the winning pass came in the final two laps, and four went to overtime."
  ['b1', 'EL', 252.0, 1.9, 0.62, 0.85, 0.55],
  ['b2', 'PH', 592.0, 1.9, 0.55, 0.9, 0.5],
  ['b3', 'KH', 1204.0, 1.9, 0.62, 0.9, 0.5],
  ['b4', 'KH', 1218.0, 2.2, 0.60, 0.9, 0.5],
  // S3 "Now Kyle Larson leads Denny Hamlin by just one point."
  ['c1', 'NB', 415.0, 1.55, 0, 0, 0, [420, 25, 560, 315]],
  ['c2', 'PH', 100.0, 1.55, 0.55, 0.9, 0.5],
  ['c3', 'PH', 104.6, 1.95, 0.60, 0.9, 0.5],
  // S4 "With the championship this close, one late caution or restart could completely flip the standings,"
  ['d1', 'EL', 984.0, 1.75, 0.55, 0.9, 0.5],
  ['d2', 'PH', 408.0, 1.75, 0.60, 0.9, 0.5],
  ['d3', 'NB', 486.0, 1.75, 0.60, 0.9, 0.5],
  ['d4', 'PH', 264.0, 2.15, 0.70, 0.9, 0.5],
  // S5 "and at Kansas, the final lap can change everything."
  ['e1', 'PH', 160.0, 1.7, 0.50, 0.9, 0.5],
  ['e2', 'NB', 864.0, 1.7, 0.50, 0.78, 0.42],
  ['e3', 'KH', 1330.0, 2.1, 0.55, 0.9, 0.5],
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
for (const [name, k, start, len, cx, s, cy, fill] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const [W, H] = dims[k];
  const common = ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len), '-i', DL + FILES[k]];
  const enc = ['-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-threads', '3', OUT + name + '.mp4'];
  if (fill) {
    const [x, y, w, h] = fill;
    const fc = `[0:v]crop=${w}:${h}:${x}:${y},split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=28:2,eq=brightness=-0.15[bg];[b]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30`;
    execFileSync(ff, [...common, '-filter_complex', fc, ...enc]);
    console.log(name, k, start, `fill ${w}x${h}@${x},${y}`);
    continue;
  }
  const h = Math.round((H * s) / 2) * 2;
  const w = Math.round((h * 9) / 16 / 2) * 2;
  const x = Math.round(Math.max(0, Math.min(W - w, cx * W - w / 2)));
  const y = Math.round(Math.max(0, Math.min(H - h, cy * H - h / 2)));
  execFileSync(ff, [...common, '-vf', `crop=${w}:${h}:${x}:${y},scale=720:1280:flags=lanczos,fps=30,setsar=1`, ...enc]);
  console.log(name, k, start, `crop ${w}x${h}@${x},${y}`);
}

