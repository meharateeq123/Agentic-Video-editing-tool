// Generates remotion/src/footage.ts for long2 (Blaney: Gateway brake failure -> Bristol). Rules as
// every prior film: no link over 7s (190f cap), no two links sharing an overlapping range of the
// same source, every clip picked to match the line spoken over it (flick-shot-relevance).
import {readFileSync, writeFileSync} from 'node:fs';

const FPS = 30;
const MAX_LINK = 190;
const OVERLAP = 16;

const CUTS = JSON.parse(readFileSync('cuts.json', 'utf8'));
const startFrame = (n) => Math.round(CUTS[n - 1].start * FPS);
const endFrame = (n) => Math.round(CUTS[n - 1].end * FPS);
const sceneFrames = (n) => endFrame(n) - startFrame(n);
const mountedFrames = (n) => sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

const N = 'nbc-gw.mp4'; //        Motorsports on NBC, Gateway extended highlights (ZMwqXq8N8fY, 2026-09-14)
const M = 'bristol-apr.mp4'; //   NASCAR official, Bristol Cup highlights (MQHry_BnlzY, 2026-04-12), 674s onward
const F = 'finals-apr.mp4'; //    NASCAR official, Bristol final laps (zI4fkzk1gIs, 2026-04-12)
const X = 'fox-post.mp4'; //      NASCAR on FOX, post-race interviews after the Food City 500 (vXsRkQMVaWM)
const D = 'blaney-dnf.mp4'; //    Frontstretch, Blaney reacts to Gateway DNF (nLLJbPc6RU8)
const H = 'hassler.mp4'; //       Frontstretch, Hassler/Nelson press conference (PECbi9PoOjw)
const Bb = 'bristol-best.mp4'; // NASCAR official, Best of Bristol Night Race (j4dcT5ibfAk)

/** Contiguous chunks (each <= MAX_LINK) starting at startSec, no gap - one continuous piece of a source. */
function run(src, startSec, frames) {
  const n = Math.ceil(frames / MAX_LINK);
  const base = Math.floor(frames / n);
  const out = [];
  let cursor = startSec;
  let left = frames;
  for (let i = 0; i < n; i++) {
    const f = i === n - 1 ? left : base;
    out.push({src, start: Number(cursor.toFixed(2)), frames: f});
    cursor += f / FPS;
    left -= f;
  }
  return out;
}

/** Specs: [src, startSec, frames | 'rest'] - 'rest' fills the scene's remaining frames. */
function scene(n, ...specs) {
  const total = mountedFrames(n);
  let used = specs.reduce((t, s) => t + (s[2] === 'rest' ? 0 : s[2]), 0);
  const links = [];
  for (const [src, start, fr] of specs) {
    const frames = fr === 'rest' ? total - used : fr;
    links.push(...run(src, start, frames));
  }
  return links;
}

const CHAINS = {
  // 1 "A piece of metal ended Blaney's championship momentum at Gateway. Now he's headed to the one track..."
  1: scene(1, [N, 665, 150], [N, 671.3, 150], [Bb, 24, 'rest']),
  // 2 steady, sixth, closing on Hamlin, rotor through the hood, wall, 35th
  2: scene(2, [N, 120, 120], [N, 350, 150], [N, 1290, 150], [N, 680, 'rest']),
  // 3 points damage: lost 17 to Hamlin, 33 back; a mechanical failure that had nothing to do with his driving
  3: scene(3, [N, 1274, 190], [N, 686, 190], [D, 1, 'rest']),
  // 4 two real Blaney quotes from the same clip, shown in the order the narration says them
  // (he actually said "keep going" first at 28.9s, then "it's a shame" at 33.2s - the script
  // states them in the opposite order, so the two ranges are cut back-to-back out of sequence):
  // "it's a shame...end of the race" 33.2-41.6s, then "just got to keep going...good day" 28.9-30.6s.
  4: scene(4, [D, 31.2, 361], [D, 26.8, 'rest']),
  // 5 "That next week is Bristol."
  5: scene(5, [Bb, 31, 'rest']),
  // 6 "Blaney has real, specific history at Bristol Motor Speedway"
  6: scene(6, [M, 1160, 140], [Bb, 45, 'rest']),
  // 7 April: pole, 190 laps, three-way with Larson/Gibbs, 0.055s behind, then the real quote
  7: scene(7, [F, 8, 118], [M, 1036, 118], [M, 1244, 118], [M, 1452, 118], [X, 205.4, 118], [X, 213.4, 176], [X, 219.27, 'rest']),
  // 8 career numbers
  8: scene(8, [F, 185, 190], [M, 1260, 190], [F, 215, 'rest']),
  // 9 dominant recent form
  9: scene(9, [M, 1046.5, 190], [M, 1053, 'rest']),
  // 10 Gateway took it, Bristol gives a track where he led the most laps
  10: scene(10, [D, 45, 120], [M, 1064, 'rest']),
  // 11 no verified footage of Blaney saying this exact quote - real April Bristol interview
  // footage of him, no quote caption (see Scene11.tsx)
  11: scene(11, [X, 226, 750]),
  // 12 not panicking - weekly target
  12: scene(12, [M, 880, 190], [M, 700, 'rest']),
  // 13 championship picture
  13: scene(13, [X, 299, 190], [M, 1140, 190], [M, 940, 'rest']),
  // 14 Hassler on camera - no verified footage of him saying this exact quote, no caption
  14: scene(14, [H, 21, 492]),
  // 15 mindset: the car has already shown it can lead
  15: scene(15, [X, 286.5, 190], [M, 1074, 'rest']),
  // 16 April form: win / top five with stage points
  16: scene(16, [F, 70, 155], [F, 230, 155], [F, 150, 155], [F, 110, 'rest']),
  // 17 Gateway: nothing mattered once the brakes failed; Bristol: set up to succeed
  17: scene(17, [N, 693, 150], [M, 1290, 190], [M, 1330, 'rest']),
  // 18 already shown he can lead the most laps and be within a tenth
  18: scene(18, [M, 1084, 190], [X, 256.5, 190], [M, 1350, 'rest']),
  // 19 Saturday night: finish the job or another close call
  19: scene(19, [Bb, 59, 160], [F, 250, 160], [M, 1436, 'rest']),
};

// ---- checks -------------------------------------------------------------------------------
let bad = 0;
const bySrc = {};
for (const [n, links] of Object.entries(CHAINS)) {
  const total = links.reduce((t, l) => t + l.frames, 0);
  if (total !== mountedFrames(Number(n))) { console.log(`scene ${n}: total ${total} != ${mountedFrames(Number(n))}`); bad++; }
  for (const l of links) {
    if (l.frames > MAX_LINK) { console.log(`scene ${n}: link ${l.frames}f over cap`); bad++; }
    (bySrc[l.src] ??= []).push({n, a: l.start, b: l.start + l.frames / FPS});
  }
}
for (const [src, rs] of Object.entries(bySrc)) {
  rs.sort((x, y) => x.a - y.a);
  for (let i = 1; i < rs.length; i++)
    if (rs[i].a < rs[i - 1].b - 0.01) {
      console.log(`OVERLAP ${src}: scene ${rs[i - 1].n} [${rs[i - 1].a}-${rs[i - 1].b.toFixed(2)}] vs scene ${rs[i].n} [${rs[i].a}-${rs[i].b.toFixed(2)}]`);
      bad++;
    }
}

const SHORT = {[N]: 'N', [M]: 'M', [F]: 'F', [X]: 'X', [D]: 'D', [H]: 'H', [Bb]: 'Bb'};
const renderLinks = (links) => {
  const calls = links.map((l) => `L(${SHORT[l.src]}, ${l.start}, ${l.frames})`);
  return calls.length <= 1 ? calls.join(', ') : '\n    ' + calls.join(',\n    ') + ',\n  ';
};
const chainsSrc = Object.entries(CHAINS).map(([n, links]) => `  ${n}: [${renderLinks(links)}],`).join('\n');

const out = `/**
 * Scene -> chain of bed clips. Generated by build-footage.mjs (regenerate if scene durations change).
 * Rules: no link over 7s, no overlapping ranges of one source, every clip matched to its line.
 *
 * Sources (none used in an earlier film at these ranges):
 *   N   Motorsports on NBC, "NASCAR Cup Series 2026: Chase continues at WWTR | EXTENDED HIGHLIGHTS"
 *       (ZMwqXq8N8fY) - the real Blaney No. 12 brake failure, 11:05-11:40 in source (his on-board,
 *       the wall, "Yep. I'm fine. Brakes."), plus green-flag Gateway racing. Ranges clear of every
 *       earlier use (rainrule1 38-60/155-180/725-745/1098-1125, bell3/gibbs3 1090-1208).
 *   M   NASCAR official, "NASCAR Cup Series Highlights | 2026 Bristol Motor Speedway" (MQHry_BnlzY,
 *       April 12) - source 674s onward only (rainrule1 stayed inside 0-600s): Blaney's lead, the
 *       three-wide finish with Larson and Gibbs.
 *   F   NASCAR official, Bristol final laps (zI4fkzk1gIs, April 12) - the No. 12 pit stop, race recap.
 *   X   NASCAR on FOX, "Ty Gibbs, Ryan Blaney and more after the Food City 500" (vXsRkQMVaWM) -
 *       Blaney on camera, "FINISHED 2ND", the real April quote at 3:34; Larson's "Blaney had by
 *       far the best car".
 *   D   Frontstretch, "Ryan Blaney Reacts to DNF at Gateway" (nLLJbPc6RU8) - Blaney's real Gateway
 *       quotes, 28.9s "keep going" and 33.2s "it's a shame". NOTE: blaney1 (a long film) used this
 *       same interview around offsets 8/27/87; the quote scene has to show him saying it, so the
 *       28.5-44.8s window overlaps blaney1's offset-27 use. Everything else here avoids it.
 *   H   Frontstretch, Hassler/Nelson press conference (PECbi9PoOjw) - Jonathan Hassler answering
 *       (20.9s onward, left seat, confirmed by the transcript).
 *   Bb  NASCAR official, "Best of: Bristol Night Race Highlights" (j4dcT5ibfAk) - archival Bristol
 *       night racing for the "Bristol" lines (not Blaney, not this season).
 */

export type Bed = {
  src: string;
  startFrom: number;
  span: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
};

export type Link = Bed & {frames: number};

const P_ = (name: string) => \`bed-pool/\${name}\`;

const L = (
  file: string,
  startFrom: number,
  frames: number,
  extra: Omit<Bed, 'src' | 'startFrom' | 'span'> = {},
): Link => ({src: P_(file), startFrom, frames, span: frames / 30, ...extra});

const N = '${N}';
const M = '${M}';
const F = '${F}';
const X = '${X}';
const D = '${D}';
const H = '${H}';
const Bb = '${Bb}';

export const CHAINS: Record<number, Link[]> = {
${chainsSrc}
};

export const chain = (n: number): Link[] => CHAINS[n];
`;
writeFileSync('remotion/src/footage.ts', out);
console.log(bad ? `PROBLEMS: ${bad}` : 'ok - no overlaps, all totals match');
for (const [n, links] of Object.entries(CHAINS)) console.log(`  scene ${n}: ${links.length} link(s), ${links.reduce((t, l) => t + l.frames, 0)}f`);
