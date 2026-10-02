// Bakes 9:16 beds for the Yu Zidi rankings short (yuzidi9). Time-constrained build: fly_full.mp4
// and the other Yu Zidi/McIntosh sources are saturated by yuzidi5-8 and zhang5's own films, so
// this one leans on StatCard/RankStat/BigType graphics to carry the actual numbers (200 fly
// 2:05.08, 200 IM 2:06.10, 400 IM behind McIntosh) and uses safe, identity-free Asian Games venue
// b-roll (empty pool, Aichi-Nagoya branding, no swimmer close-up) as the backdrop - no new
// identity-verification risk since no footage claims to show a specific swimmer.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\swimming\\output\\yuzidi6\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\zhang2\\dl\\race200.mp4';
const OUT = 'D:\\flick\\swimming\\output\\yuzidi9\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

// name, start s, len s, cx, s(height frac), cy
export const BEATS = [
  ['V1', 600.0, 3.0, 0.5, 0.9, 0.5],
  ['V2', 612.0, 3.0, 0.5, 0.9, 0.5],
  ['V3', 636.0, 3.0, 0.5, 0.9, 0.5],
  ['V4', 660.0, 3.0, 0.5, 0.9, 0.5],
  ['V5', 672.0, 3.0, 0.5, 0.9, 0.5],
];

let txt = '';
try { execFileSync(ff, ['-hide_banner', '-i', DL], {stdio: ['ignore', 'pipe', 'pipe']}); } catch (e) { txt = String(e.stderr); }
const m = /Video:.*?, (\d{3,5})x(\d{3,5})/.exec(txt);
const W = Number(m[1]), H = Number(m[2]);
console.log('dims', W, H);

const only = process.argv.slice(2);
for (const [name, start, len, cx, s, cy] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const h = Math.round((H * s) / 2) * 2;
  const w = Math.round((h * 9) / 16 / 2) * 2;
  const x = Math.round(Math.max(0, Math.min(W - w, cx * W - w / 2)));
  const y = Math.round(Math.max(0, Math.min(H - h, cy * H - h / 2)));
  const vf = `crop=${w}:${h}:${x}:${y},scale=720:1280:flags=lanczos,fps=30,setsar=1`;
  execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len),
    '-i', DL, '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-threads', '3', OUT + name + '.mp4']);
  console.log(name, start, `crop ${w}x${h}@${x},${y}`);
}
