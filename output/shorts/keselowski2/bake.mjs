// Bakes every 9:16 bed (720x1280, 30fps) for the Keselowski crew-chief-change short. Sources, both official RFK Racing channel uploads:
//   ST shoptour.mp4  RFK Racing 'Shop Tour with Brad Keselowski' - lower-third confirms 'BRAD KESELOWSKI, DRIVER/OWNER - RFK RACING'
//   PC podcast.mp4   RFK Racing 'Backstretch Banter' podcast intro - lower-third confirms 'JEREMY BULLINS, CREW CHIEF, NO. 6 CAR'
// Mike Skarbowski has no verifiable footage anywhere (only AI-recap channels use his name), so he is named in captions only, never shown as a face.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\keselowski2\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\keselowski2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {ST: 'shoptour.mp4', PC: 'podcast.mp4'};

export const BEATS = [
  // S1 (104f) "Brad Keselowski's team just went through a major change before Kansas."
  ['a1', 'ST', 0.5, 2.0, 0.10, 1.0, 0.42],
  ['a2', 'ST', 11.0, 2.6, 0.5, 1.0, 0.40, 'fill', 1.0, 0],
  // S2 (224f) "RFK Racing split with longtime crew chief Jeremy Bullins and 35-year-old Mike Skarbowski has now taken over the No. 6."
  ['b1', 'ST', 61.0, 2.0, 0.24, 1.0, 0.42],
  ['b2', 'PC', 37.0, 1.8, 0.5, 1.0, 0.32],
  ['b3', 'PC', 93.0, 2.5, 0.5, 1.0, 0.40, 'fill', 1.0, 0],
  ['b4', 'ST', 101.0, 2.5, 0.30, 1.0, 0.42],
  // S3 (63f) "His first real test comes Sunday."
  ['c1', 'ST', 213.0, 2.8, 0.55, 1.0, 0.45],
  // S4 (125f) "Can Skarbowski immediately turn things around for Keselowski?"
  ['d1', 'ST', 131.0, 2.1, 0.40, 1.0, 0.42],
  ['d2', 'ST', 133.2, 2.8, 0.40, 1.0, 0.42],
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
for (const [name, k, start, len, cx, s, cy, mode, fw, fx = 0] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const [W, H] = dims[k];
  const src = ['-ss', String(start), '-t', String(len), '-i', DL + FILES[k]];
  const enc = ['-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-threads', '3', OUT + name + '.mp4'];
  if (mode === 'fill') {
    const cw = Math.round((W * fw) / 2) * 2;
    const fg = `[0:v]crop=${cw}:${H}:${Math.round(W * fx)}:0,split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,gblur=sigma=30,eq=brightness=-0.18[bg];[b]scale=720:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30,setsar=1`;
    execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', ...src, '-filter_complex', fg, ...enc]);
    console.log(name, k, start, `fill ${cw}x${H}`);
    continue;
  }
  const h = Math.round((H * s) / 2) * 2;
  const w = Math.round((h * 9) / 16 / 2) * 2;
  const x = Math.round(Math.max(0, Math.min(W - w, cx * W - w / 2)));
  const y = Math.round(Math.max(0, Math.min(H - h, cy * H - h / 2)));
  const vf = `crop=${w}:${h}:${x}:${y},scale=720:1280:flags=lanczos,fps=30,setsar=1`;
  execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', ...src, '-vf', vf, ...enc]);
  console.log(name, k, start, `crop ${w}x${h}@${x},${y}`);
}
