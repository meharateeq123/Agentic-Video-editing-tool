// Bakes every 9:16 bed (720x1280, 30fps) for the Blaney-Hocevar Bristol-fight follow-up short. Sources:
//   FT fight.mp4  NASCAR official 'Carson Hocevar, Ryan Blaney Get Into It at Bristol' - wreck (#12 WABASH vs #77 ZEIGLER), pit-road brawl, Blaney USA Sports interview, Hocevar by his #77 (windshield name plate)
//   TK talks.mp4  Frontstretch upload of Blaney's Kansas media session (Ford Racing hoodie, Cardell cap, Kansas Speedway backdrop) - first 3 min
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\blaney3\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\blaney3\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {FT: 'fight.mp4', TK: 'talks.mp4'};

export const BEATS = [
  // S1 (132f) "But Ryan Blaney is still carrying a black eye from his Bristol fight with Carson Hocevar."
  ['a1', 'TK', 35.0, 2.0, 0.45, 1.0, 0.5],
  ['a2', 'FT', 94.0, 2.0, 0.62, 1.0, 0.5],
  ['a3', 'FT', 280.0, 2.4, 0.40, 1.0, 0.5],
  // S2 (152f) "But now Blaney has revealed the fight was the result of weeks of frustration, not just one wreck."
  ['b1', 'FT', 72.0, 1.9, 0.52, 1.0, 0.5],
  ['b2', 'FT', 38.0, 1.9, 0.55, 1.0, 0.5],
  ['b3', 'FT', 78.0, 1.9, 0.50, 1.0, 0.5],
  ['b4', 'TK', 95.0, 2.4, 0.45, 1.0, 0.5],
  // S3 (111f) "He also says NASCAR made the right call by giving neither driver a penalty."
  ['c1', 'FT', 151.0, 1.7, 0.55, 1.0, 0.5],
  ['c2', 'FT', 270.0, 1.7, 0.50, 1.0, 0.5],
  ['c3', 'TK', 155.0, 2.2, 0.45, 1.0, 0.5],
  // S4 (70f) "But is this rivalry really over?"
  ['d1', 'FT', 159.0, 1.6, 0.45, 1.0, 0.5],
  ['d2', 'FT', 286.0, 2.0, 0.35, 1.0, 0.5],
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
