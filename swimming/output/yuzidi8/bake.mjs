// Bakes every 9:16 bed (720x1280, 30fps) for "Yu Zidi JUST Got Dangerously Close to Summer
// McIntosh!" (yuzidi8). Every range below is fresh - checked frame-by-frame against every prior
// Yu Zidi film's used ranges (yuzidi5, yuzidi6, yuzidi7) so nothing repeats:
//   fly_full.mp4 prior use: yuzidi5 (0-2,10-12,14-16,125-127,134-136,144-145.8,150-151.7,156-158),
//     yuzidi6 (22-23.95,33-34.75,55-56.9,127-129.25,138-139.65,147-148.9,153-154.35,166.5-168.65,
//     174.5-176.15), yuzidi7 long film (5-158.4 in dense 3s/4.7s-step chunks covering nearly the
//     whole zone). Fresh windows used here: 2.2-5.0, 158.6-166.4, 168.9-174.3, 176.3-177.45.
//   mac_yiting_200im_panpac.mp4 prior use: yuzidi7 long film (10-325.8 in dense 3s/9.2s-step
//     chunks). Fresh window used here: 6.8-9.3 (the pre-race lane-list graphic, before the zone
//     the long film started from).
//
// Identity was confirmed per beat by pulling raw frames (not just the contact-sheet thumbnail):
//   A - the start-list graphic itself reads "YU Zidi" in lane 4.
//   B, C - her cap reads "...ZIDI" / "CHN YU ZIDI" directly, confirmed at multiple points in the
//     same continuous "at the wall" shot.
//   D1, D2, F - same continuous shot continues at the "BORNAN Sports Technology" backdrop, cap
//     reads "CHN YU ZIDI" clearly and repeatedly across this whole stretch.
//   E - the pre-race lane-list graphic reads "5 MCINTOSH" (Canada) directly; this file also
//     contains Yu Yiting (a different swimmer, lane 2, "YU") so no other timestamp from this file
//     was used without equally explicit name confirmation.
//
// fly_full crop: s=0.90, cy=0.55 keeps the CCTV5 logo/banner (top ~10%) out of frame, matches the
// crop already established for this source in yuzidi5/yuzidi6/yuzidi7.
// A and E are lineup/start-list graphics - too wide to crop to 9:16 without losing the name text,
// so they use 'fill' mode (blurred pillarbox background + scaled foreground), same technique
// yuzidi5's bake.mjs used for its WION beat.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\swimming\\output\\yuzidi6\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const OUT = 'D:\\flick\\swimming\\output\\yuzidi8\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {
  FF: 'D:\\flick\\swimming\\output\\yuzidi5\\dl\\fly_full.mp4',
  SMY: 'D:\\flick\\swimming\\output\\yuzidi7\\dl\\mac_yiting_200im_panpac.mp4',
};

export const BEATS = [
  // S1 - "Yu Zidi may have just started swimming's next huge rivalry." (start-list graphic)
  ['A', 'FF', 2.2, 2.8, 0.5, 0.85, 0.5, 'fill', 0.42, 0.58],
  // S2 - "At the Asian Games, the 13-year-old Chinese star swam 2:06.10 in the 200 IM,"
  ['B', 'FF', 160.5, 3.0, 0.52, 0.9, 0.55],
  ['C', 'FF', 163.5, 2.9, 0.52, 0.9, 0.55],
  // S3 - "just 0.40 seconds behind Summer McIntosh's world record." (lane-list graphic)
  ['E', 'SMY', 8.4, 1.5, 0.5, 0.85, 0.5, 'fill', 0.56, 0.44],
  // S4 - "Yu also won three gold medals and set three Games records."
  ['D1', 'FF', 169.0, 3.0, 0.5, 0.9, 0.55],
  // S5 - "She's only 13, so how close can Yu get to Summer by LA 2028?"
  ['D2', 'FF', 172.3, 2.0, 0.5, 0.9, 0.55],
  ['F', 'FF', 176.3, 1.15, 0.5, 0.9, 0.55],
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
    // top 10% cropped off first - same CCTV5-banner dodge as the crop-mode beats below.
    const newH = Math.round((H * 0.90) / 2) * 2;
    const yOff = H - newH;
    const cw = Math.round((W * fw) / 2) * 2;
    const cx0 = Math.round(Math.max(0, Math.min(W - cw, fx * W)));
    const fg = `[0:v]crop=${cw}:${newH}:${cx0}:${yOff},split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,gblur=sigma=30,eq=brightness=-0.18[bg];[b]scale=720:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30,setsar=1`;
    execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', ...src, '-filter_complex', fg, ...enc]);
    console.log(name, k, start, `fill ${cw}x${newH}`);
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
