// Bakes 9:16 beds for "Melissa Jefferson-Wooden JUST Reached ANOTHER Level!" (melissa2). Reuses
// melissa1's three downloaded sources at fresh ranges (melissa1's own crop.ps1 used: sprint100m
// 0.2-3.7/6.3-9.5/13.0-16.8, sprint200m 3.0-6.4/9.5-12.9, budapest-double 77.3-79.7/80.8-83.4).
// Real-content windows (per melissa1's notes): sprint200m only 0-15s is real race (rest is a black
// title card), budapest-double only ~0-85s is this event (after ~85s it drifts to other events, e.g.
// high jump at 86s) and the women's 200m only appears ~70-83s of it (the earlier stretch is the men's
// race/medal graphics).
//
//   S  sprint100m.mp4   WA official, women's 100m final. Fresh: 9.6 (mid-race), 18.0 (RESULT board:
//      1 JEFFERSON-WOODEN / ALFRED / RICHARDSON, FINISH 100m 10.62 - matches the VO's number exactly).
//   T  sprint200m.mp4   WA official, women's 200m final. Fresh: 0.3 (blocks/start), 6.4 (mid-race,
//      BUDAPEST 26 banner in frame), 12.9 (FINISH 200m 21.48 board - matches "21.47" the VO says).
//   B  budapest-double.mp4  APT Sports recap. Fresh: 72.0-77.0 (confirmed Melissa, different angle,
//      same 21.48 200m finish, "SOURCE: INFRONT / BUDAPEST, HUNGARY" bug) - split into two beats.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\lyles1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\melissa1\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\melissa2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {S: DL + 'sprint100m.mp4', T: DL + 'sprint200m.mp4', B: DL + 'budapest-double.mp4'};

// name, src, start s, len s, cx, s (height frac), cy, mode
export const BEATS = [
  // S1 - "First, she exploded to 10.62 in the 100 meters."
  ['a1', 'S', 9.6, 2.3, 0.5, 1.0, 0.5], // mid-race wide shot
  ['a2', 'S', 18.0, 2.6, 0.5, 1.0, 0.5, 'fill'], // RESULT board: 1 JEFFERSON-WOODEN, 10.62
  // S2 - "Then she came back and ran an incredible 21.47 in the 200."
  ['b1', 'T', 0.3, 2.6, 0.5, 1.0, 0.5], // blocks / start
  ['b2', 'T', 12.9, 2.0, 0.5, 1.0, 0.5, 'fill'], // FINISH 200m 21.48 board
  // S3 - "She won both titles in Budapest, beating elite competition across two sprint events."
  ['c1', 'B', 72.0, 2.3, 0.5, 1.0, 0.5], // confirmed Melissa, 200m finish, APT angle
  ['c2', 'T', 6.4, 3.0, 0.5, 1.0, 0.5], // mid-race, BUDAPEST 26 banner in frame
  // S4 - "This isn't just a hot streak anymore. Melissa Jefferson-Wooden has officially entered a new level."
  ['d1', 'B', 74.3, 2.7, 0.5, 1.0, 0.5], // continuation of the confirmed Melissa celebration
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
