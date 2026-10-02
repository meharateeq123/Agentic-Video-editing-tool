// Bakes every 9:16 bed (720x1280, 30fps) for the Kristof Milak 49.48 short. Each row: name, source, start s,
// bed length s, cx (subject x as a fraction of the frame width), s (window height as a fraction of the frame),
// cy (subject y), mode. mode 'fill' = the whole (optionally left-cropped) frame over a blurred copy of itself,
// used where a broadcast graphic is the evidence and must not be cut.
//   N2  nat2      Eurovision Sport feed of the 2026 European Championships men's 100 fly final (Paris). Name lower-thirds
//                 "HUN Kristof MILAK 5" prove Milak; lane 5. Bug top-right sits outside a centred 9:16 window.
//   N1  nat1      RTVE feed of the same final
//   WL  waterlife france.tv feed of the same final (finish + Milak reaction under the "HUN Kristof MILAK 5" bar)
//   DR  dressel   Tokyo 2020 men's 100 fly final: Dressel's 49.45 world record (cap "DRESSEL", lane graphic "C. DRESSEL WR")
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\milak1\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\milak1\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {N2: 'nat2.mp4', N1: 'nat1.mp4', WL: 'waterlife.mp4', DR: 'dressel.mp4'};

export const BEATS = [
  // S1 (100f) "Kristof Milak is back, and he nearly did something incredible."
  ['a1', 'N2', 24.2, 1.95, 0.50, 1.0, 0.5],
  ['a2', 'N1', 21.5, 1.9, 0.50, 1.0, 0.5],
  ['a3', 'N2', 30.0, 1.9, 0.50, 1.0, 0.5],
  // S2 (235f) "At the 2026 European Championships, Milak won the 100-meter butterfly in 49.48, setting a European record."
  ['b1', 'N2', 111.0, 1.85, 0.30, 1.0, 0.5],
  ['b2', 'N2', 7.3, 1.95, 0.50, 1.0, 0.5],
  ['b3', 'N2', 129.0, 2.0, 0.58, 1.0, 0.5],
  ['b4', 'N2', 161.0, 2.75, 0.30, 1.0, 0.5, 'fill', 0.62],
  ['b5', 'N2', 172.0, 2.1, 0.55, 1.0, 0.5],
  // S3 (118f) "But the crazy part? Caeleb Dressel's world record is 49.45."
  ['c1', 'N2', 170.0, 1.95, 0.50, 1.0, 0.5],
  ['c2', 'DR', 18.0, 2.1, 0.38, 1.0, 0.5],
  ['c3', 'DR', 95.4, 2.1, 0.5, 1.0, 0.5, 'fill', 0.62, 0.38],
  // S4 (108f) "That means Milak was just 0.03 seconds away from history."
  ['d1', 'WL', 63.0, 1.95, 0.50, 1.0, 0.5],
  ['d2', 'WL', 58.4, 2.15, 0.50, 1.0, 0.5],
  ['d3', 'DR', 108.0, 1.85, 0.40, 1.0, 0.5],
  // S5 (67f) "Could the record finally fall?"
  ['e1', 'N1', 169.0, 1.95, 0.50, 1.0, 0.5],
  ['e2', 'WL', 69.0, 1.9, 0.60, 1.0, 0.5],
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
