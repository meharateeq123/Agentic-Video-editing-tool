// Bakes every 9:16 bed (720x1280, 30fps) for the Zhang Yufei 50 fly short.
// Row: name, source, start s, bed length s, cx, s (window height fraction), cy.
//
// Same event as zhang1 ("Zhang Yufei JUST Dominated the Asian Games AGAIN!"), so every range here is
// disjoint from the ranges that short used:
//   race   18, 45, 80, 221.5, 231, 264, 312, 318, 333.5, 337, 409   (each ~1.6-1.9s long)
//   podium 221, 259.5, 276, 300, 334, 354
//
// Sources are sections of the host broadcast of Aichi-Nagoya 2026 swimming day 6, already downloaded
// for zhang1 (GreekVideos upload AEnPtu7jM78). The host feed carries no channel bug - only its own
// lower-thirds and the event bar - so these crops use the full frame height.
//   RC race.mp4   women's 50 fly final: start list, walk-outs with per-swimmer name bars, the race,
//                 the wall, and the results board (1 ZHANG Yufei 25.41, 2 WU Qingfeng, 3 IKEE Rikako)
//   PD podium.mp4 the 50 fly victory ceremony
//
// Identity: her white cap is printed "ZHANG YUFEI"; the walk-out and results bars name every swimmer.
// c1 is the beat that names Wu Qingfeng and it is her own walk-out bar ("WU Qingfeng CHN 26.00"),
// not a guess; c2 is the podium itself, where the CHN gold, CHN silver and JPN bronze all stand.
// Rejected: zhang_int (a studio presenter, not Zhang, with a "sports scene" bug on every frame) and
// wu12 (a team celebration with no name on screen - identity unprovable).
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\zhang1\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\zhang3\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {RC: 'race.mp4', PD: 'podium.mp4'};

export const BEATS = [
  // S1 - "At the 2026 Asian Games, the Chinese star defended her 50-meter butterfly title."
  ['a1', 'RC', 15.5, 1.85, 0.27, 1.0, 0.5], // the start-list card, ZHANG Yufei among the names
  ['a2', 'RC', 227.0, 1.85, 0.5, 1.0, 0.5], // her walk-out, CHINA jacket
  ['a3', 'RC', 300.0, 2.05, 0.5, 1.0, 0.5], // the race
  // S2 - "Touching in 25.41,"
  ['b1', 'RC', 405.5, 2.0, 0.34, 1.0, 0.5], // the results board - the 25.41 stamp lands here
  // S3 - "she beat teammate Wu Qingfeng and Japan's Rikako Ikee to take another Asian Games gold."
  ['c1', 'RC', 195.0, 1.8, 0.28, 1.0, 0.5], // Wu Qingfeng's own walk-out bar
  ['c2', 'PD', 325.0, 1.8, 0.53, 1.0, 0.5], // the podium: CHN gold, CHN silver, JPN bronze
  ['c3', 'RC', 347.0, 2.1, 0.55, 1.0, 0.5], // Zhang celebrating at the wall
  // S4 - "After everything she's already achieved, Zhang is still winning on the biggest stages,"
  ['d1', 'RC', 322.0, 1.6, 0.52, 1.0, 0.5], // her cap reads ZHANG YUFEI
  ['d2', 'PD', 78.0, 1.6, 0.45, 1.0, 0.5],
  ['d3', 'RC', 329.5, 1.9, 0.5, 1.0, 0.5],
  // S5 - "and the next chapter could be VERY interesting!"
  ['e1', 'PD', 288.0, 1.5, 0.45, 1.0, 0.5], // receiving the gold
  ['e2', 'RC', 400.5, 1.75, 0.5, 1.0, 0.5],
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
  execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len),
    '-i', DL + FILES[k], '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
    '-pix_fmt', 'yuv420p', '-threads', '3', OUT + name + '.mp4']);
  console.log(name, k, start);
}
