// Bakes 9:16 beds for "Noah Lyles JUST Proved He's BACK at 9.79!" (lyles2). Reuses lyles1's three
// downloaded sources at fresh ranges, checked against lyles1's own crop.ps1 beat list - no new
// download.
//
//   B  usatf-100  USA Track & Field official, 2026 USATF men's 100m final (2UuSXzxR228). Lyles won
//      in 9.79 - his bib/name tag reads LYLES and the NBC results board reads "1 NOAH LYLES WL 9.79".
//      lyles1 used 328.0-330.6, 342.0-344.6, 348.0-350.6. Fresh here: 282 (blocks), 318 (start burst),
//      325 (sprint), 332 (finish), 337 (results board), 362 (board recall, same board still on screen).
//   A  usatf-200  USA Track & Field official, 2026 USATF men's 200m final (RdtCMkAvI90) - the race he
//      finished 9th in. lyles1 used 52.0-54.0, 100.0-102.0, 42.0-44.6, 118.0-120.6, 125.0-127.6,
//      25.3-27.1, 18.7-20.4, 122.0-124.4. Fresh here: 6 (wide track + "NOAH LYLES (2022) 19.31" record
//      graphic), 234/240 (post-race interview - the lower-third at 240 reads "NOAH LYLES / Xfinity
//      Men's 200m / 9th Place: 50.88", the actual setback the VO names).
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\lyles1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\lyles1\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\lyles2\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {B: DL + 'usatf-100.mp4', A: DL + 'usatf-200.mp4'};

// name, src, start s, len s, cx, s (height frac), cy, mode
export const BEATS = [
  // S1 - "Noah Lyles just reminded everyone why he's one of America's biggest sprint stars."
  ['b1', 'B', 282.0, 3.2, 0.547, 1.0, 0.5], // blocks, bowed in concentration, bib 5
  ['b2', 'B', 318.0, 2.6, 0.49, 1.0, 0.5], // start burst, Lyles mid-pack bib 5
  // S2 - "He blasted to 9.79 seconds in the 100 meters, matching his personal bests."
  ['c1', 'B', 325.0, 2.4, 0.48, 1.0, 0.5], // full sprint drive
  ['c2', 'B', 332.0, 2.2, 0.58, 1.0, 0.5], // finish, arms out, LYLES bib tag visible
  ['c3', 'B', 337.0, 3.2, 0.5, 1.0, 0.5, 'fill'], // NBC board: 1 NOAH LYLES WL 9.79
  // S3 - "After facing setbacks earlier in the season, Noah came back with serious speed, but"
  ['d1', 'A', 240.0, 3.1, 0.5, 1.0, 0.5, 'fill'], // lower-third: NOAH LYLES, 9th Place 50.88
  ['d2', 'B', 362.0, 2.9, 0.5, 1.0, 0.5, 'fill'], // the 9.79 board still up - the comeback recall
  // S4 - "the big question is, can Lyles carry this speed into his next major showdown?"
  ['e1', 'A', 6.0, 2.6, 0.5, 1.0, 0.5, 'fill'], // wide 200m track + "NOAH LYLES (2022) 19.31" record card
  ['e2', 'A', 234.0, 3.2, 0.65, 1.0, 0.5], // interview close-up, looking ahead
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
