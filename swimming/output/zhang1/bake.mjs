// Bakes every 9:16 bed (720x1280, 30fps) for the Zhang Yufei Asian Games short. Each row: name, source, start s, bed length s, cx, s, cy, mode, fw, fx.
// Sources are sections of the host broadcast of Aichi-Nagoya 2026 swimming day 6 (GreekVideos upload AEnPtu7jM78), cut with yt-dlp --download-sections:
//   RC race.mp4   (session 3:35-10:50)  women's 50 fly final: start list, walk-outs, finish, results board, reactions
//   PD podium.mp4 (40:20-46:30)        women's 50 fly victory ceremony (lower-thirds: IKEE Rikako BRONZE, ZHANG Yufei GOLD, SILVER)
//   RL relay.mp4  (1:42:00-1:53:00)    women's 4x100 medley relay (cap CHN ZHANG YUFEI)
//   CR cer.mp4    (2:08:00-2:20:30)    relay victory ceremony
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\zhang1\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\zhang1\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {RC: 'race.mp4', PD: 'podium.mp4', RL: 'relay.mp4', CR: 'cer.mp4'};

export const BEATS = [
  // S1 (119f) "The Chinese swimming star defended her Asian Games title in the 50-meter butterfly,"
  ['a1', 'RC', 221.5, 1.85, 0.38, 1.0, 0.5],
  ['a2', 'RC', 45.0, 1.9, 0.40, 1.0, 0.5],
  ['a3', 'RC', 231.0, 1.9, 0.50, 1.0, 0.5],
  ['a4', 'RC', 18.0, 1.9, 0.5, 1.0, 0.5, 'fill', 0.62, 0.0],
  // S2 (87f) "touching in 25.41 to take another gold medal."
  ['b1', 'RC', 409.0, 1.9, 0.5, 1.0, 0.5, 'fill', 0.62, 0.0],
  ['b2', 'RC', 312.0, 1.75, 0.50, 1.0, 0.5],
  ['b3', 'PD', 300.0, 1.55, 0.50, 1.0, 0.5],
  // S3 (111f) "She led a Chinese one-two finish with Wu Qingfeng taking silver,"
  ['c1', 'PD', 334.0, 1.7, 0.55, 1.0, 0.5],
  ['c2', 'RC', 318.0, 1.7, 0.55, 1.0, 0.5],
  ['c3', 'RC', 264.0, 1.7, 0.50, 1.0, 0.5],
  ['c4', 'PD', 259.5, 1.65, 0.50, 1.0, 0.5],
  // S4 (72f) "while Japan's Rikako Ikee grabbed bronze."
  ['d1', 'RC', 80.0, 1.55, 0.60, 1.0, 0.5],
  ['d2', 'RC', 333.5, 1.55, 0.60, 1.0, 0.5],
  ['d3', 'PD', 221.0, 1.55, 0.50, 1.0, 0.5],
  // S5 (142f) "At the end of the Games, Zhang Yufei had added two more medals to her incredible career,"
  ['e1', 'RL', 183.0, 1.9, 0.62, 1.0, 0.5],
  ['e2', 'RL', 605.5, 1.9, 0.50, 1.0, 0.5],
  ['e3', 'CR', 345.0, 1.7, 0.50, 1.0, 0.5],
  ['e4', 'CR', 310.0, 1.55, 0.50, 1.0, 0.5],
  ['e5', 'CR', 512.0, 1.55, 0.50, 1.0, 0.5],
  // S6 (87f) "and she's still one of swimming's biggest stars."
  ['f1', 'PD', 276.0, 1.75, 0.50, 1.0, 0.5],
  ['f2', 'PD', 354.0, 1.75, 0.50, 1.0, 0.5],
  ['f3', 'RC', 337.0, 1.75, 0.55, 1.0, 0.5],
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
