// Bakes every 9:16 bed (720x1280, 30fps) for the Sha'Carri "2026 season statement" short.
// Row: name, source, start s, bed length s, cx, s (window height fraction), cy, mode.
//   mode 'cover' (default) = a tight 9:16 crop, subject centred.
//   mode 'fill'            = the whole 16:9 frame laid over its own blurred copy. Used only where a
//                            full-width results board has to stay readable - a tight crop would cut it.
//
// Sources are the ones already downloaded for richardson2. Every range below is disjoint from the
// ranges that short used (flick-no-repeat-clips-across-shorts):
//   usa-athlos100  107-109.4, 170-172.2, 189.5-191.9, 195-197.4, 197.6-203, 214-216.4, 228-230.4, 255-257.6
//   rog-mjw        0-2.2, 33.3-35.1, 50-52.4
//   citius-int     unused by richardson2 - free
//
//   U  usa-athlos100  USA Sports, "100m Highlights Athlos London" (E_majT_oUKQ), 2026-09-18.
//                     Her name is on screen twice: the 100M STARTLIST and the 100M RESULTS board
//                     ("1 SHA'CARRI RICHARDSON 10.80"), plus her bib reads RICHARDSON.
//   R  rog-mjw        Republic of Games, Budapest women's 100m final (-tqyKdNAY0w). The result list
//                     reads JEFFERSON-WOODEN / ALFRED / RICHARDSON - the proof she took third.
//   C  citius-int     CITIUS MAG mixed zone after the Athlos race (sxjdib6SWJI). Clean ATHLOS LDN26
//                     backdrop, no burned-in subtitles, her face in frame throughout.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\richardson2\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\richardson3\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {U: 'usa-athlos100.mp4', R: 'rog-mjw.mp4', C: 'citius-int.mp4'};

export const BEATS = [
  // S1 - "After taking third in Budapest,"
  ['a1', 'R', 16.5, 2.35, 0.5, 1.0, 0.5, 'fill'], // the Budapest result list, RICHARDSON third
  // S2 - "she came back at Athlos London and won the 100 meters in 10.80 seconds."
  ['b1', 'U', 9.0, 1.7, 0.5, 1.0, 0.5, 'fill'], // the Athlos 100M startlist
  ['b2', 'U', 111.5, 1.7, 0.5, 1.0, 0.5, 'fill'],
  ['b3', 'U', 126.3, 2.0, 0.5, 1.0, 0.5, 'fill'], // the finish under the running clock - 10.80 stamp here
  // S3 - "She pulled away in the second half and set a new Athlos meeting record."
  ['c1', 'U', 176.0, 1.8, 0.42, 1.0, 0.5],
  ['c2', 'U', 252.0, 2.15, 0.5, 1.0, 0.5, 'fill'], // 100M RESULTS: 1 SHA'CARRI RICHARDSON 10.80
  // S4 - "But Sha'Carri said she wished this performance had happened at the beginning of her season."
  ['d1', 'C', 41.0, 1.45, 0.42, 1.0, 0.5],
  ['d2', 'C', 95.0, 1.45, 0.48, 1.0, 0.5],
  ['d3', 'C', 150.0, 1.75, 0.52, 1.0, 0.5],
  // S5 - "So what will she look like in 2027?"
  ['e1', 'U', 36.5, 1.25, 0.5, 1.0, 0.5],
  ['e2', 'U', 139.5, 1.55, 0.55, 1.0, 0.5],
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
for (const [name, k, start, len, cx, s, cy, mode] of BEATS) {
  if (only.length && !only.includes(name)) continue;
  const [W, H] = dims[k];
  const args = ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len), '-i', DL + FILES[k]];
  if (mode === 'fill') {
    const fc =
      '[0:v]split[a][b];' +
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
