// Bakes every 9:16 bed (720x1280, 30fps) for the Puripol Boonson sprint-double short.
// Row: name, source, start s, bed length s, cx, s (window height fraction), cy, mode, trim.
//   'cover' (default) = tight 9:16 crop. Both sources carry a small channel bug in the TOP-RIGHT
//                       corner, and a window centred near cx 0.5 is well clear of it.
//   'fill'            = the frame with its right `trim` fraction cut off (that is where the bug is),
//                       then laid over its own blurred copy. Only for the full-width result boards,
//                       which a tight crop would cut the names off.
//
//   H  8L33gG5CiR8  T Sports 7 (Thai broadcaster), men's 100m FINAL highlight, Asian Games 2026.
//                   Clean host pictures. His name is on screen three times: the START LIST
//                   ("Puripol BOONSON"), the winner lower-third ("WINNER Puripol BOONSON GR 9.90")
//                   and the RESULTS board ("1 Puripol BOONSON GR 9.90"). His bib reads BOONSON.
//   G  tHVWRhjsaCE  Global Athletics, men's 200m final highlights. Softer (an upscale) and it carries
//                   a round logo top-right, so every beat from it is a tight centred crop except the
//                   results board, which is baked 'fill' with the right 14% trimmed away.
//                   On-screen proof: "FINISH 19.88", the ASIAN RECORD board, and
//                   "ATHLETICS Men's 200m - Final Results: 1 Puripol BOONSON 19.88".
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\puripol1\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\puripol1\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {H: '8L33gG5CiR8.mp4', G: 'tHVWRhjsaCE.mp4'};

export const BEATS = [
  // S1 - "After winning the Asian Games 100 meters in a stunning 9.90,"
  ['a1', 'H', 12.0, 1.45, 0.5, 1.0, 0.5],
  ['a2', 'H', 45.0, 1.45, 0.5, 1.0, 0.5, 'fill', 0.08], // WINNER Puripol BOONSON GR 9.90
  ['a3', 'H', 109.3, 1.65, 0.5, 1.0, 0.5, 'fill', 0.08], // 100m RESULTS: 1 Puripol BOONSON GR 9.90
  // S2 - "the Thai sprinter returned for the 200 meter final"
  ['b1', 'H', 104.0, 1.35, 0.5, 1.0, 0.5], // with the Thai flag
  ['b2', 'G', 9.0, 1.65, 0.45, 1.0, 0.5], // at the 200m, bib BOONSON
  // S3 - "and ran an incredible 19.88 seconds."
  ['c1', 'G', 32.0, 1.7, 0.5, 1.0, 0.5], // the 200m final - the 19.88 stamp lands here
  ['c2', 'G', 45.3, 2.0, 0.68, 1.0, 0.5], // the FINISH clock reading 19.88
  // S4 - "That matched the Asian record and completed his sprint double in Nagoya."
  ['d1', 'G', 64.0, 1.9, 0.5, 1.0, 0.5], // the Thai flag beside the ASIAN RECORD board
  ['d2', 'G', 71.0, 2.15, 0.5, 1.0, 0.5, 'fill', 0.14], // 200m RESULTS: 1 Puripol BOONSON 19.88
  // S5 - "He now owns two huge performances at one Asian Games,"
  ['e1', 'H', 95.0, 1.8, 0.5, 1.0, 0.5],
  ['e2', 'G', 56.0, 2.0, 0.5, 1.0, 0.5],
  // S6 - "so how fast can Puripol go next?"
  ['f1', 'H', 70.0, 1.4, 0.5, 1.0, 0.5],
  ['f2', 'H', 99.0, 1.75, 0.5, 1.0, 0.5],
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
for (const [name, k, start, len, cx, s, cy, mode, trim = 0.1] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const [W, H] = dims[k];
  const args = ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len), '-i', DL + FILES[k]];
  if (mode === 'fill') {
    const cw = Math.round((W * (1 - trim)) / 2) * 2;
    const fc =
      `[0:v]crop=${cw}:${H}:0:0,split[a][b];` +
      '[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=26:2,eq=brightness=-0.14[bg];' +
      '[b]scale=720:-2:flags=lanczos[fg];' +
      '[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30,setsar=1';
    args.push('-filter_complex', fc);
  } else {
    const h = Math.round((H * s) / 2) * 2;
    const w = Math.round((h * 9) / 16 / 2) * 2;
    const x = Math.round(Math.max(0, Math.min(W - w, cx * W - w / 2)));
    const y = Math.round(Math.max(0, Math.min(H - h, cy * H - h / 2)));
    args.push('-vf', `crop=${w}:${h}:${x}:${y},scale=720:1280:flags=lanczos,fps=30,setsar=1`);
  }
  args.push('-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-threads', '3', OUT + name + '.mp4');
  execFileSync(ff, args);
  console.log(name, k, start, mode || 'cover');
}
