// Bakes 9:16 beds for "The 2026 Swimming World Cup Starts TODAY!" (worldcup2). Reuses worldcup1's
// three official World Aquatics promo downloads at fresh ranges (checked against worldcup1's own
// bake.mjs beat list) - no new download. The script names four specific swimmers (McEvoy, Haughey,
// Steenbergen, Qin) with no time to verify per-swimmer footage, so S3 uses typographic name cards
// over generic racing b-roll instead of guessing at footage (CLAUDE.md rule 6: drop footage / use a
// typographic plate when identity can't be confirmed).
//
//   SR  FoHSNV8VdEo  "Silk Road Tour" promo. worldcup1 used 7.4-9.05(a1),9.6-11.25(a2),17.9-19.85(a3),
//       32.9-35.35(b1). Fresh here: 3.0 (title card), 20.0 (Tashkent/nations card), 43.0 ($1.2M card).
//   BJ  4nB6hRq63v0  Beijing 2026 promo. worldcup1 used 44.6-46.65(d1),52.3-54.65(d2),24.1-26.25(e1).
//       Fresh here: 50.0 (Forbidden City b-roll), 58.0 (BEIJING 2026 card).
//   WC  OFbxcD5DuqE  Josh Liendo WR promo. worldcup1 used 22.0-23.65(c1),45.0-46.65(c2).
//       Fresh here: 30.0 (generic racing, for the athlete-names scene), 53.0 (Liendo WR/47.68 card).
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\swimming\\output\\yuzidi6\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\worldcup1\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\worldcup2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {
  SR: DL + 'FoHSNV8VdEo.mp4',
  BJ: DL + '4nB6hRq63v0.mp4',
  WC: DL + 'OFbxcD5DuqE.mp4',
};

// name, src, start s, len s, cx, s, cy, mode
export const BEATS = [
  ['a1', 'SR', 15.3, 2.0, 0.5, 1.0, 0.5, 'fill'], // BAKU AZERBAIJAN map pin - clean, no distracting banner
  ['a2', 'SR', 38.3, 2.0, 0.5, 1.0, 0.5, 'fill'], // 500+ ATHLETES card
  ['b1', 'WC', 30.0, 6.6, 0.5, 1.0, 0.5], // generic racing b-roll, athlete-name cards scene
  ['c1', 'SR', 41.8, 1.8, 0.5, 1.0, 0.5, 'fill'], // $1.2M PRIZE POOL
  ['c2', 'BJ', 51.6, 2.0, 0.5, 1.0, 0.5], // Beijing - Forbidden City b-roll
  ['d1', 'WC', 55.5, 2.3, 0.5, 1.0, 0.5], // finish-wall reaction, WORLD AQUATICS board
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
for (const [name, k, start, len, cx, s, cy, mode] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const [W, H] = dims[k];
  const args = ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len), '-i', FILES[k]];
  if (mode === 'fill') {
    args.push('-filter_complex',
      '[0:v]split[a][b];' +
      '[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=26:2,eq=brightness=-0.14[bg];' +
      '[b]scale=720:-2:flags=lanczos[fg];' +
      '[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30,setsar=1');
  } else {
    const h = Math.round((H * s) / 2) * 2;
    const w = Math.round((h * 9) / 16 / 2) * 2;
    const x = Math.round(Math.max(0, Math.min(W - w, cx * W - w / 2)));
    const y = Math.round(Math.max(0, Math.min(H - h, cy * H - h / 2)));
    args.push('-vf', `crop=${w}:${h}:${x}:${y},scale=720:1280:flags=lanczos,fps=30,setsar=1`);
  }
  args.push('-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-threads', '3', OUT + name + '.mp4');
  execFileSync(ff, args);
  console.log(name, k, start, mode || 'cover');
}
