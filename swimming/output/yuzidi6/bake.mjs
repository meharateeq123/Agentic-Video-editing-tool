// Bakes every 9:16 bed (720x1280, 30fps) for the Yu Zidi "13-year-old season" short.
// Row: name, source, start s, bed length s, cx, s (window height fraction), cy.
//
// The user's three rules for this one: her FACE must be in frame, no clip carrying a channel logo or a
// burned-in banner, and no clip repeated. So:
//   - every crop uses s <= 0.80 with cy low, which pushes the top ~20% of the source out of frame -
//     that is where hattrick's "SPORTS ROUNDUP" bug (top-left) and fly_full's CCTV-5 bug + Chinese
//     banner (top-right / top-centre) sit.
//   - wion_400 and im400_wion are unused: WION burns a two-line headline strap across every frame.
//   - cgtn3g is unused: it is a Chinese domestic meet (4:34.33), not the Asian Games.
//   - every range below is also disjoint from the ranges yuzidi5 already used from fly_full
//     (0-2, 10-12, 14-16, 125-127, 134-136, 144-145.8, 150-151.7, 156-158).
//
//   H  hattrick   "Sports Roundup" cut - the cleanest close-ups of her at the wall, and the podium
//   F  fly_full   the host-broadcast Women's 200m Butterfly final; her cap reads "CHN YU ZIDI"
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\yuzidi5\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\yuzidi6\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {H: 'hattrick.mp4', F: 'fly_full.mp4'};

export const BEATS = [
  // S1 - "The Chinese teenager won the 200 fly, 200 IM, and 400 IM,"
  ['a1', 'H', 4.3, 1.65, 0.5, 1.0, 0.5],
  ['a2', 'F', 138.0, 1.65, 0.5, 0.9, 0.55],
  ['a3', 'F', 22.0, 1.95, 0.5, 0.9, 0.55],
  // S2 - "setting a Games record in all three."
  ['b1', 'F', 127.0, 2.25, 0.5, 0.9, 0.55],
  // S3 - "Her biggest swim came in the 400 IM, where she clocked an incredible 4:28.56,"
  ['c1', 'F', 55.0, 1.9, 0.5, 0.9, 0.55],
  ['c2', 'F', 147.0, 1.9, 0.5, 0.9, 0.55],
  ['c3', 'F', 166.5, 2.15, 0.45, 0.9, 0.5],
  // S4 - "making her the fifth-fastest performer in history."
  ['d1', 'H', 24.6, 1.4, 0.5, 1.0, 0.5],
  ['d2', 'F', 33.0, 1.75, 0.5, 0.9, 0.55],
  // S5 - "Three golds. Three records."
  ['e1', 'H', 16.9, 2.2, 0.5, 1.0, 0.5],
  // S6 - "What can this 13-year-old do next?"
  ['f1', 'F', 153.0, 1.35, 0.45, 0.9, 0.5],
  ['f2', 'F', 174.5, 1.65, 0.45, 0.9, 0.5],
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
