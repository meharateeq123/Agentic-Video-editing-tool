// Bakes every 9:16 bed (720x1280, 30fps) for the Zhang Zhanshuo Asian-record short, with the crop
// window centred on HIM in each shot (cx = subject x as a fraction of the frame width, s = window height
// as a fraction of the frame, cy = subject y).
//
// Identity (swimming CLAUDE.md rule 6). This final had TWO Chinese swimmers - lane 2 ZHANG Zhanshuo and
// lane 7 XU Haibo - so a red Team China tracksuit proves nothing on its own. What does:
//   - Zhang's own white Speedo cap has "ZHANG ZH" printed on the side (readable in the walk-out shots)
//   - the host broadcast's name bars: "ZHANG Zhanshuo 1" at the finish, and the winner lower-third
//     "WINNER - ZHANG Zhanshuo - AR 1:43.49 - Men's 200m Freestyle - Final"
//   - the results graphic: 1 ZHANG Zhanshuo AR 1:43.49, 2 HWANG Sunwoo 1:44.62
// Deliberately unused: R 96-110 (Xu Haibo, his own lower-third names him) and R 445-455 (Hwang Sunwoo's
// KOR cap close-up) except where the script actually names Hwang.
//
//   R   race200      the host-broadcast feed of the Men's 200m Freestyle final, 20th Asian Games,
//                    Aichi-Nagoya 2026, cut out of the full finals session (nXd4S_UrGg0, 1700-2430s)
//   C   Kc-iQ-QGGYk  CGTN Sports Scene, Zhang in the mixed zone afterwards - no burned-in subtitles
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\zhang2\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\zhang2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {
  R: 'race200.mp4',
  C: 'Kc-iQ-QGGYk.mp4',
};

// name, src, start s, bed length s, cx, s, cy
export const BEATS = [
  // S1 - "The 19-year-old Chinese swimmer blasted a stunning 1:43.49"
  ['a1', 'R', 206.0, 2.25, 0.5, 0.86, 0.46], // walk-out; his cap reads ZHANG ZH
  ['a2', 'R', 427.3, 2.55, 0.52, 0.92, 0.5], // the finish, under the ZHANG Zhanshuo name bar - the 1:43.49 stamp lands here
  // S2 - "in the 200-meter freestyle at the Asian Games, smashing the Asian record."
  ['b1', 'R', 330.0, 1.65, 0.5, 0.9, 0.52],
  ['b2', 'R', 380.0, 1.7, 0.5, 0.9, 0.52],
  ['b3', 'R', 415.0, 2.0, 0.5, 0.9, 0.52],
  // S3 - "Even crazier, he dropped more than a second from his previous best"
  ['c1', 'R', 462.6, 1.7, 0.5, 0.9, 0.44], // celebrating under the WINNER / AR 1:43.49 lower-third
  ['c2', 'R', 552.0, 2.0, 0.5, 0.9, 0.44],
  // S4 - "and beat reigning Asian Games champion, Hwang Sun-woo."
  ['d1', 'R', 446.5, 1.75, 0.55, 0.9, 0.45], // Hwang's own KOR cap, his name on it - the one beat that is his
  ['d2', 'R', 431.0, 2.1, 0.42, 0.92, 0.5],
  // S5 - "Zhang is now officially one of the biggest names to watch heading toward LA 2028."
  ['e1', 'C', 2.0, 1.7, 0.55, 0.92, 0.42], // the ID card lands here
  ['e2', 'C', 9.0, 1.7, 0.6, 0.92, 0.42],
  ['e3', 'R', 556.0, 2.0, 0.5, 0.9, 0.44],
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
