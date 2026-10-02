// Bakes every 9:16 bed (720x1280, 30fps) for "Zhang Zhanshuo JUST Did Something NO Swimmer Had
// Done Before!" (zhang5) - his record 7 golds at the 2026 Asian Games, plus the 200m free AR
// (1:43.49) from zhang2's race. Reuses the same two downloads zhang2 already sourced and verified
// (no new download needed) but every range below is fresh - checked against zhang2/bake.mjs's
// exact used windows so nothing repeats:
//   race200.mp4 prior use (zhang2): 206-208.25, 330-331.65, 380-381.7, 415-417, 427.3-429.85,
//     431-433.1, 446.5-448.25, 462.6-464.3, 552-554, 556-558.
//   Kc-iQ-QGGYk.mp4 prior use (zhang2): 2.0-3.7, 9.0-10.7.
//
// Identity - same standard as zhang2 (two Chinese swimmers in this final, lane 2 Zhang / lane 7 Xu
// Haibo, so a red tracksuit alone proves nothing):
//   SL  (32.0)   the broadcast's own "Start List - Final" graphic - lane 2 = ZHANG Zhanshuo, printed.
//   W1/W2 (465.0/467.5)  his face, cap off, under the "WINNER - ZHANG Zhanshuo - AR 1:43.49" lower
//     third - continues the same continuous celebration shot zhang2's c1 stopped at 464.3.
//   R1/R2/R3 (562/574/578)  the broadcast's own "Results - Final" graphic, holds clean from ~558 to
//     ~585 - "1 ZHANG Zhanshuo AR 1:43.49" printed directly on it. Three non-overlapping sub-ranges.
//   C1/C2 (13.0/16.0)  the CGTN mixed-zone interview - same file zhang2 used for its ID card.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\swimming\\output\\yuzidi6\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\zhang2\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\zhang5\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {R: 'race200.mp4', C: 'Kc-iQ-QGGYk.mp4'};

// name, src, start s, bed length s, cx, s(height frac), cy, mode?, fw(fill width px)
// The Start List / Results graphics are a split panel (purple info left ~55%, pool video insert
// right) - too wide for a straight 9:16 crop without losing the times column, so those use 'fill'
// (crop the panel's own pixel width, keep full height, then letterbox-fit) same as yuzidi8's
// lineup-graphic beats. Results graphic confirmed holding clean from ~566s to ~582s (not from 558 -
// there's a celebration replay in between); every R beat below sits inside that window with margin.
export const BEATS = [
  ['SL', 'R', 32.0, 2.6, 0, 0, 0, 'fill', 700], // Start List - Final graphic, lane 2 = ZHANG Zhanshuo
  ['W1', 'R', 465.0, 2.5, 0.5, 0.9, 0.44], // WINNER lower-third celebration close-up
  ['R1', 'R', 567.0, 2.3, 0, 0, 0, 'fill', 700], // Results - Final graphic
  ['C1', 'C', 13.0, 2.0, 0.55, 0.92, 0.42], // CGTN mixed-zone interview
  ['R2', 'R', 571.0, 2.3, 0, 0, 0, 'fill', 700],
  ['W2', 'R', 467.5, 2.0, 0.5, 0.9, 0.44],
  ['C2', 'C', 16.0, 1.8, 0.55, 0.92, 0.42],
  ['R3', 'R', 577.0, 2.0, 0, 0, 0, 'fill', 700],
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
for (const [name, k, start, len, cx, s, cy, mode, fw] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const [W, H] = dims[k];
  const src = ['-ss', String(start), '-t', String(len), '-i', DL + FILES[k]];
  const enc = ['-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-threads', '3', OUT + name + '.mp4'];
  if (mode === 'fill') {
    const cw = Math.round(Math.min(W, fw) / 2) * 2;
    const fg = `[0:v]crop=${cw}:${H}:0:0,split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,gblur=sigma=30,eq=brightness=-0.18[bg];[b]scale=720:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30,setsar=1`;
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
