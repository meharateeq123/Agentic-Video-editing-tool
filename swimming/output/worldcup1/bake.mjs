// Bakes every 9:16 bed (720x1280, 30fps) for the "World Cup starts this week" preview short.
// Row: name, source, start s, bed length s, cx, s (window height fraction), cy.
//
// This one has no hero athlete - it is a schedule preview - so the pictures are carried by the two
// OFFICIAL World Aquatics promos, whose own title cards name the exact meets, cities and dates. That
// also solves the honesty problem: the 2026 World Cup starts tomorrow (1 Oct), so no Baku footage of
// it exists yet. Nothing here pretends otherwise; the city beats are the promo's own map graphics.
//
//   SR  FoHSNV8VdEo  World Aquatics, "The Silk Road Tour brings the Swimming World Cup 2026".
//                    Its cards: "WELCOME TO THE SWIMMING WORLD CUP 2026" (3-5s), "BAKU AZERBAIJAN"
//                    map pin (16-17s), "TASHKENT" (21-24s), "ASTANA" (28-31s), and a globe listing
//                    all three stops with dates (32-35s).
//   BJ  4nB6hRq63v0  World Aquatics, "Swimming Championships (25m) - Beijing 2026".
//                    Its cards: the "WORLD RECORD" board (24s), "AT THE WORLD SWIMMING CHAMPIONSHIPS
//                    2026" (36-38s), "BEIJING 2026 - WORLD AQUATICS SWIMMING CHAMPIONSHIPS (25M)" (58s).
//   WC  OFbxcD5DuqE  World Aquatics, Josh Liendo's 100m butterfly world record at the Swimming World
//                    Cup 2025 - real World Cup racing for the "chance to race again" line.
//   AG  zhang1/race  the Asian Games host broadcast (Aichi-Nagoya 2026), for "after the Asian Games".
//                    Range disjoint from the ones zhang1 and zhang4 used.
import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const ff = 'D:\\flick\\output\\shorts\\gibbs1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const DL = 'D:\\flick\\swimming\\output\\worldcup1\\dl\\';
const OUT = 'D:\\flick\\swimming\\output\\worldcup1\\remotion\\public\\bed-pool\\';
mkdirSync(OUT, {recursive: true});

const FILES = {
  SR: DL + 'FoHSNV8VdEo.mp4',
  BJ: DL + '4nB6hRq63v0.mp4',
  WC: DL + 'OFbxcD5DuqE.mp4',
  AG: 'D:\\flick\\swimming\\output\\zhang1\\dl\\race.mp4',
};

// Mode 'fill' lays the whole 16:9 frame over its own blurred copy. Every beat whose point IS the text
// uses it: these promo cards are designed for 16:9 and a tight 9:16 crop slices the words in half
// ("WELCOME TO THE ...NG WOR..."). The racing beats stay tight crops.
export const BEATS = [
  // S1 - "But the 2026 Swimming World Cup begins October 1 in Baku, Azerbaijan,"
  ['a1', 'SR', 7.4, 1.65, 0.5, 1.0, 0.5], // WELCOME TO THE SWIMMING WORLD CUP 2026
  ['a2', 'SR', 9.6, 1.65, 0.5, 1.0, 0.5],
  ['a3', 'SR', 17.9, 1.95, 0.5, 1.0, 0.5], // the BAKU AZERBAIJAN map pin
  // S2 - "before moving to Tashkent and Astana."
  ['b1', 'SR', 32.9, 2.45, 0.65, 1.0, 0.5], // the globe listing all three stops and their dates
  // S3 - "It's the first major chance for many swimmers to race again after the Asian Games."
  ['c1', 'WC', 22.0, 1.65, 0.55, 1.0, 0.5],
  ['c2', 'WC', 45.0, 1.65, 0.55, 1.0, 0.5],
  ['c3', 'AG', 418.0, 1.95, 0.5, 1.0, 0.5], // the Aichi-Nagoya venue
  // S4 - "And with the World Short Course Championships in Beijing coming in December,"
  ['d1', 'BJ', 44.6, 2.05, 0.5, 1.0, 0.5], // AT THE WORLD SWIMMING CHAMPIONSHIPS 2026
  ['d2', 'BJ', 52.3, 2.35, 0.5, 1.0, 0.5], // BEIJING 2026
  // S5 - "more records could be coming."
  ['e1', 'BJ', 24.1, 2.15, 0.35, 1.0, 0.5], // the WORLD RECORD board
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
  args.push('-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-threads', '3', OUT + name + '.mp4');
  execFileSync(ff, args);
  console.log(name, k, start, mode || 'cover');
}
