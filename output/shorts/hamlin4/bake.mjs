// Bakes every 9:16 bed (720x1280, 30fps) for the "Denny Hamlin JUST Got a HUGE Kansas Warning!" short.
// Row: name, source, start s, bed length s, cx (subject x as a fraction of the frame width), s (window
// height as a fraction of the frame), cy (subject y).
//
// Sources are the Kansas downloads already vetted for kansas1 / kansas2 / chase2. Every range below is
// disjoint from the ranges those shorts use (flick-no-repeat-clips-across-shorts), and no two beats here
// overlap:
//   HM  hamlin23    NASCAR, "Hamlin overcomes Larson for win after last-lap pass at Kansas" (qRSUFLDXvRI)
//                   - the #11 FedEx and the #5 Hendrickcars.com; kansas1 used 28-30.7, 32-34.7, 86-88.7, 90-92.8
//   R   ot2nd       NASCAR, "Final Laps: Watch the wild second overtime | Kansas Speedway" (Lhda_Ro_poo)
//                   - kansas1 used 13-15.6, 25-27.5, 28.2-30.8
//   T   thriller25  NASCAR, "Final Laps: Edge-of-Your-Seat THRILLER in Kansas | 2025" (QzpujcBALvQ)
//                   - kansas1 used 19.5-22.2, 40-42.5, 125.5-128.5, 130-132.8
//   N   nose24      NASCAR, "Kansas overtime ends at the line with closest finish in Cup history" (zuhBr4ibh2c)
//                   - kansas1 used 21.5-24.5, 30-33
//   OT  ot26        NASCAR, "Kansas Final Laps ERUPT in Overtime | 2026" (VTBqA77xDE4)
//                   - chase2 used 8-10, 216-217.5, 250-251.8
//
// Left-edge furniture: thriller25 and ot26 print a running-order board over the left ~22% / ~16% of the
// frame, and hamlin23 shows the scoring pylon at the far left around 96s. Every cx below is high enough
// that the 9:16 window starts to the right of it.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\output\\shorts\\kansas1\\dl\\';
const OUT = 'D:\\flick\\output\\shorts\\hamlin4\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {
  HM: 'hamlin23.mp4',
  R: 'ot2nd.mp4',
  T: 'thriller25.mp4',
  OT: 'ot26.mp4',
  N: 'nose24.mp4',
};

// Mode. A static tight crop only works where the subject holds still - the pit box and the celebration.
// On the racing shots the cars travel a third of the frame width in under two seconds, so a fixed window
// loses them (b5/b6/b9 did exactly that on the first bake). Those beats use 'pan': a full-height 406x720
// window - exactly 9:16, so it fills the frame with no blur bars and the cars stay large - whose left
// edge slides from x0 to x1 across the beat, following the cars. x0/x1 are source pixels; both must clear
// the running-order board that thriller25 (left ~282px) and ot26 (left ~211px) print over the frame.
export const BEATS = [
  // S1 - "Denny Hamlin has dominated Kansas before, but there's a problem."
  ['b1', 'HM', 35.2, 1.8, 0.55, 0.9, 0.55], // #11 FedEx alongside the #5 - the Hamlin ID card lands here
  ['b2', 'HM', 51.5, 2.1, 0.42, 0.95, 0.5], // his own FedEx Racing pit box: "but there's a problem"
  // S2 - "He's lost the last two Kansas races after overtime restarts,"
  ['b3', 'T', 148.5, 1.9, 336, 384, 0, 'pan'], // 2025 Kansas, the final lap
  ['b4', 'OT', 118.2, 2.25, 515, 560, 0, 'pan'], // 2026 Kansas, 4 laps to go, HAMLIN P2 on the board
  // S3 - "despite leading 290 of the last 547 laps here."
  ['b5', 'HM', 96.6, 1.35, 352, 800, 0, 'pan'], // the #11 running ahead of the #5 - the 290 stamp lands here
  ['b6', 'HM', 38.8, 2.9, 0, 790, 0, 'pan'], // the #11 big in frame for the whole beat
  // S4 - "Now the championship fight is incredibly tight."
  ['b7', 'R', 44.0, 1.35, 300, 360, 0, 'pan'], // the overtime pack, nose to tail
  ['b8', 'R', 46.0, 1.65, 300, 360, 0, 'pan'], // the #2, #21 and #38 three wide
  // S5 - "Can Hamlin finally finish the job at Kansas, or will another late restart destroy his race?"
  ['b9', 'HM', 123.5, 1.8, 0.55, 0.95, 0.45], // his FedEx crew celebrating the 2023 Kansas win
  ['b10', 'R', 51.0, 1.8, 361, 400, 0, 'pan'], // "or will another late restart" - the overtime pack
  ['b11', 'R', 65.0, 2.1, 470, 560, 0, 'pan'], // "destroy his race?" - the closest finish in Cup history
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
  let vf;
  if (mode === 'pan') {
    const CW = 406;
    const x0 = Math.round(Math.max(0, Math.min(W - CW, cx)));
    const x1 = Math.round(Math.max(0, Math.min(W - CW, s)));
    vf = `crop=${CW}:${H}:'${x0}+(${x1}-${x0})*min(t/${len},1)':0,scale=720:1280:flags=lanczos,fps=30,setsar=1`;
  } else {
    const h = Math.round((H * s) / 2) * 2;
    const w = Math.round((h * 9) / 16 / 2) * 2;
    const x = Math.round(Math.max(0, Math.min(W - w, cx * W - w / 2)));
    const y = Math.round(Math.max(0, Math.min(H - h, cy * H - h / 2)));
    vf = `crop=${w}:${h}:${x}:${y},scale=720:1280:flags=lanczos,fps=30,setsar=1`;
  }
  execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(start), '-t', String(len),
    '-i', DL + FILES[k], '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16',
    '-pix_fmt', 'yuv420p', '-threads', '3', OUT + name + '.mp4']);
  console.log(name, k, start, mode || 'crop');
}
