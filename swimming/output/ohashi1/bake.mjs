// Bakes every 9:16 bed (720x1280, 30fps) for the Shin Ohashi world-record short, with the crop window
// centred on HIM in each shot (cx = subject x as a fraction of the frame width, s = window height as a
// fraction of the frame, cy = subject y).
//
// Identity (swimming CLAUDE.md rule 6 - never show the wrong person). This final had TWO Japanese
// swimmers: lane 4 OHASHI and lane 5 WATANABE, so a Japan-flag cap alone proves nothing. The markers
// that do:
//   Ohashi   black *arena* cap + Japan flag roundel + pink/magenta mirrored goggles, lane 4
//   Watanabe black cap with a "JAPAN" wordmark, different goggles  <- excluded everywhere below
// Every range here is either (a) on screen while the broadcast ticker highlights "4 OHASHI 2:04.83 WR",
// or (b) a wall shot with the lane "4" board in frame. DT 8.3-9.9 (Watanabe waving) and DT 18-46
// (a different pool / a women's race in the same news cut) are deliberately unused.
//
//   OH  m69C8aYhbVg  WATERLIFE_MED - the clean Asian Games 2026 broadcast of the Men's 200m Breaststroke
//                    final at Aichi-Nagoya: the race, the finish, and the wall close-ups under the ticker
//   DT  vsDfRF3S5lw  Daily Top News - agency close-ups of the same celebration (lane 4 board in frame)
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\ohashi1\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\ohashi1\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {
  OH: 'm69C8aYhbVg.mp4',
  DT: 'vsDfRF3S5lw.mp4',
};

// name, src, start s, bed length s, cx, s, cy, mode
// mode 'fill' letterboxes the whole 16:9 frame over its own blur - used only for b4, where the
// broadcast's own ticker ("4 OHASHI 2:04.83 WR") IS the graphic and must stay readable
// (flick-info-without-cards: prefer the real broadcast graphic over a card).
// Where each source may be cut from, established frame by frame in qc/ (see qc/zoneA, zoneB, bnd):
//   OH  76.0- 79.1  the broadcast's head-on feature camera, mid-race
//   OH 128.3-133.4  Ohashi at the wall, ticker highlighting "4 OHASHI 2:04.83 WR"
//                   (<=128.2 is still the wide finish shot; >=133.5 cuts to Watanabe's JAPAN cap)
//   DT   3.4-  8.3  the wall celebration, lane "4" board in frame  (>=8.4 is Watanabe waving)
//   DT  15.6- 18.0  fist pump, lane "4" board
//   DT  46.5- 48.4  fist pump, lane "4" board  (<=46.3 and >=48.5 are a women's race in the same news cut)
//   DT  50.0- 61.8  the long celebration hold, lane "4" board
export const BEATS = [
  // S1 - "Shin Ohashi JUST broke the 200 breaststroke world record, and he's only 17!"
  ['b1', 'DT', 49.95, 2.7, 0.55, 0.94, 0.46],
  ['b2', 'DT', 3.45, 2.65, 0.58, 0.92, 0.45],
  // S2 - "The Japanese teenager destroyed the old mark with a stunning 2:04.83, becoming the first man ever under 2:05."
  ['b3', 'OH', 76.0, 3.05, 0.5, 1.0, 0.5],
  // b4 carries the 2:04.83 stamp: he is at the wall with the goggles pushed up, and the ticker just
  // outside this crop is what proves the shot is lane 4 OHASHI.
  ['b4', 'OH', 128.3, 2.25, 0.42, 0.94, 0.38],
  ['b5', 'DT', 46.45, 1.95, 0.55, 0.94, 0.45],
  // S3 - "But here's the crazy part: this is only his first world record."
  ['b6', 'DT', 52.75, 2.15, 0.56, 0.94, 0.46],
  ['b7', 'DT', 55.0, 2.15, 0.55, 0.94, 0.45],
  // S4 - "Ohashi is still just 17, meaning he has years to improve."
  ['b8', 'DT', 57.25, 2.3, 0.53, 0.94, 0.45],
  ['b9', 'DT', 15.6, 2.3, 0.56, 0.94, 0.46],
  // S5 - "So the biggest question now is simple."
  ['b10', 'OH', 130.55, 1.15, 0.55, 0.94, 0.42],
  ['b13', 'OH', 132.45, 1.25, 0.53, 0.94, 0.42],
  // S6 - "How fast can Shin Ohashi REALLY go?" - ends on his face coming up through his own splash.
  ['b11', 'DT', 59.6, 2.15, 0.55, 0.94, 0.45],
  ['b12', 'DT', 6.2, 1.5, 0.62, 0.92, 0.44],
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
  if (mode === 'fill') {
    vf =
      'split[a][b];' +
      '[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,gblur=sigma=26[bg];' +
      '[b]scale=720:-2[fg];' +
      '[bg][fg]overlay=(W-w)/2:(H-h)/2,fps=30,setsar=1';
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
