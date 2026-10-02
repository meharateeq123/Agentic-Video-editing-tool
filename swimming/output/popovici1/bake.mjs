// Bakes every 9:16 bed (720x1280, 30fps) for the David Popovici short. Each row: name, source, start s, bed length s, cx, s, cy, mode, fw, fx.
// Sources: EU46/EU56/TV26 = 2026 European Championships (Paris) men's 100 free final (Eurovision/RTVE/TVR of the same host feed; Popovici lane 4,
// lower-thirds "ROU David POPOVICI 4"); WA100/WA66/TV25 = Singapore 2025 Worlds (WA feed; graphic "POPOVICI 1", "NEW CR 46.51"); LA2 = LA night skyline.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\popovici1\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\popovici1\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {EU46: 'eu46.mp4', EU56: 'eu56.mp4', TV26: 'tvr26.mp4', WA100: 'wa100.mp4', WA66: 'wa66.mp4', TV25: 'tvr25.mp4', LA2: 'la2.mp4'};

export const BEATS = [
  // S1 (106f) "David Popovici remains one of the biggest names in sprint freestyle."
  ['a1', 'EU46', 0.0, 1.95, 0.48, 1.0, 0.5],
  ['a2', 'EU56', 32.0, 1.9, 0.50, 1.0, 0.5],
  ['a3', 'WA100', 36.0, 1.9, 0.50, 1.0, 0.5],
  // S2 (197f) "His European record of 46.51 in the 100 freestyle came at the 2025 World Championships,"
  ['b1', 'TV25', 70.0, 1.85, 0.60, 1.0, 0.5],
  ['b2', 'WA66', 48.0, 2.3, 0.5, 1.0, 0.5, 'fill', 0.82, 0.10],
  ['b3', 'WA66', 0.0, 1.95, 0.55, 1.0, 0.5],
  ['b4', 'WA66', 8.0, 2.1, 0.50, 1.0, 0.5],
  ['b5', 'TV25', 114.0, 2.1, 0.50, 1.0, 0.5],
  // S3 (106f) "and he has continued competing at the highest level in 2026."
  ['c1', 'EU56', 126.0, 1.9, 0.45, 1.0, 0.5],
  ['c2', 'TV26', 80.0, 1.9, 0.58, 1.0, 0.5],
  ['c3', 'EU56', 198.0, 1.95, 0.5, 1.0, 0.5, 'fill', 0.55, 0.25],
  // S4 (101f) "With the next Olympic cycle already underway, the question is simple."
  ['d1', 'EU46', 108.0, 1.88, 0.50, 1.0, 0.5],
  ['d2', 'TV25', 92.0, 1.85, 0.60, 1.0, 0.5],
  ['d3', 'TV25', 108.0, 1.88, 0.55, 1.0, 0.5],
  // S5 (108f) "How fast can Popovici go before LA 2028?"
  ['e1', 'WA100', 51.0, 1.75, 0.55, 1.0, 0.5],
  ['e2', 'WA100', 330.0, 1.7, 0.50, 1.0, 0.5],
  ['e3', 'LA2', 2.0, 2.4, 0.55, 1.0, 0.5],
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
