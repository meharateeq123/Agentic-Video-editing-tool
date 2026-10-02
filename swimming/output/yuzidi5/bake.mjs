// Bakes every 9:16 bed (720x1280, 30fps) for the Yu Zidi 3-gold Asian Games short. Sources, all verified by name/scoreboard/cap:
//   FF fly_full.mp4  Natación España - official host-feed broadcast of the women's 200 fly final (Aichi-Nagoya 2026, lane 4 = Yu Zidi per start list; GR = Games Record tag; scoreboard 'YU Zidi 1')
//   FC fly_cgtn.mp4  CGTN Sports Scene - Yu Zidi medal-reveal close-up, same backdrop as CH
//   CH cgtn_hist.mp4 CGTN Sports Scene - Yu Zidi interview close-up, Aichi-Nagoya 2026 backdrop
//   WG wion2g.mp4    WION recap - ONLY the cap-confirmed 'CHN YU ZIDI' swim close-up is used (bottom news ticker cropped out); the podium/group shots in this and the sister 400IM recap file show a mismatched male swimmer and are not used anywhere in this film
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\yuzidi5\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\yuzidi5\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {FF: 'fly_full.mp4', FC: 'fly_cgtn.mp4', CH: 'cgtn_hist.mp4', WG: 'wion2g.mp4'};

export const BEATS = [
  // S1 (221f) "At only 13 years old, the Chinese star won the 200 fly, 200 IM, and 400 IM, and she didn't just win."
  ['a1', 'FF', 0.0, 2.0, 0.5, 1.0, 0.5],
  ['a2', 'FF', 10.0, 2.0, 0.5, 1.0, 0.5],
  ['a3', 'FF', 14.0, 2.0, 0.56, 1.0, 0.5],
  ['a4', 'FC', 0.3, 2.0, 0.5, 1.0, 0.42],
  // S2 (165f) "She set games records in all three events, including an incredible 4:28.56 in the 400 IM,"
  ['b1', 'FF', 125.0, 2.0, 0.5, 1.0, 0.5],
  ['b2', 'FF', 134.0, 2.0, 0.58, 1.0, 0.5],
  ['b3', 'WG', 20.5, 1.9, 0.66, 0.75, 0.40],
  // S3 (103f) "making her the fifth-fastest performer in history."
  ['c1', 'FF', 144.0, 1.8, 0.42, 1.0, 0.5],
  ['c2', 'FF', 150.0, 1.7, 0.42, 1.0, 0.5],
  // S4 (119f) "Three races. Three golds. And Yu Zidi is only 13!"
  ['d1', 'CH', 1.0, 2.0, 0.5, 1.0, 0.42],
  ['d2', 'FF', 156.0, 2.0, 0.42, 1.0, 0.5],
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
