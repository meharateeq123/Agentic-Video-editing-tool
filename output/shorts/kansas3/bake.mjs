// Bakes every 9:16 bed (720x1280, 30fps) for the 'NASCAR JUST Revealed WHY Kansas Could Get CRAZY!' short. Fresh sources:
//   LA larson24.mp4  NASCAR on FOX 'Kyle Larson Crushes the Field at Kansas' (JjxTRchUIYU) - 2025 spring Kansas: #5 HendrickCars.com CHEVROLET, #20 Bell Toyota alongside, #12/#20 contact, restarts, burnout (new download; no earlier short used it)
//   TX texas26.mp4   NASCAR 'Cup Series Highlights | 2026 Texas Motor Speedway' (BtL_H0RvQfA) - the lime #67 Toyota Camry (new download)
//   VG vegasfl.mp4   FOX 'Final laps: Hamlin takes the checkered flag at Las Vegas' (chase2 download, 1280x720) - #11 Toyota, LAS VEGAS WINNER; chase2 used 404-405.9, 444-445.5, 492-493.9 (no overlap here)
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\kansas3\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\kansas3\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {LA: 'D:\\\\flick\\\\output\\\\shorts\\\\kansas3\\\\dl\\\\larson24.mp4', TX: 'D:\\\\flick\\\\output\\\\shorts\\\\kansas3\\\\dl\\\\texas26.mp4', VG: 'D:\\\\flick\\\\output\\\\shorts\\\\chase2\\\\dl\\\\vegasfl.mp4'};

export const BEATS = [
  // S1 (100f) "Kansas is about to start a critical three-race stretch in the Chase."
  ['a1', 'LA', 270.0, 2.0, 0.55, 1.0, 0.5],
  ['a2', 'LA', 293.0, 2.0, 0.55, 1.0, 0.5],
  ['a3', 'LA', 165.0, 2.0, 0.45, 1.0, 0.5],
  // S2 (130f) "And Toyota has been extremely strong on 1.5-mile tracks this season,"
  ['b1', 'TX', 1225.0, 1.8, 0.55, 1.0, 0.5],
  ['b2', 'VG', 420.0, 1.8, 0.62, 1.0, 0.5],
  ['b3', 'TX', 1205.0, 1.8, 0.55, 1.0, 0.5],
  ['b4', 'VG', 500.0, 2.2, 0.60, 1.0, 0.5],
  // S3 (94f) "while Chevrolet has won four of the last five Kansas races."
  ['c1', 'LA', 312.0, 1.7, 0.50, 1.0, 0.5],
  ['c2', 'LA', 405.0, 1.7, 0.50, 1.0, 0.5],
  ['c3', 'LA', 460.0, 2.2, 0.22, 1.0, 0.5],
  // S4 (125f) "With the championship fight so tight, one late restart could change everything."
  ['d1', 'LA', 285.0, 2.0, 0.55, 1.0, 0.5],
  ['d2', 'LA', 450.0, 2.0, 0.60, 1.0, 0.5],
  ['d3', 'LA', 200.0, 1.8, 0.60, 1.0, 0.5],
  ['d4', 'LA', 225.0, 2.2, 0.60, 1.0, 0.5],
  // S5 (49f) "Kansas could be chaos."
  ['e1', 'LA', 121.0, 2.4, 0.55, 1.0, 0.5],
];
const dims = {};
for (const [k, f] of Object.entries(FILES)) {
  let txt = '';
  try { execFileSync(ff, ['-hide_banner', '-i', f], {stdio: ['ignore', 'pipe', 'pipe']}); } catch (e) { txt = String(e.stderr); }
  const m = /Video:.*?, (\d{3,5})x(\d{3,5})/.exec(txt);
  dims[k] = [Number(m[1]), Number(m[2])];
}
console.log(dims);

const only = process.argv.slice(2);
for (const [name, k, start, len, cx, s, cy, mode, fw, fx = 0] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const [W, H] = dims[k];
  const src = ['-ss', String(start), '-t', String(len), '-i', FILES[k]];
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
