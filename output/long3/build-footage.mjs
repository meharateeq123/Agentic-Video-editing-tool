// Generates remotion/src/footage.ts for long3 (Blaney's Bristol disaster: crash, fight, points).
// Rules as every prior film: no link over ~7s, no two links sharing an overlapping range of the
// same source, every clip picked to match the line spoken over it (flick-shot-relevance).
//
// Each scene is a list of [src, sourceStartSec, localEndSec]: a link runs from the previous link's
// end to localEndSec (scene-local seconds, read off vo/words.json via sent.mjs). Links play at
// rate 1 (span = frames + bleed) so a quote's footage stays lip-synced to the narration.
import {readFileSync, writeFileSync} from 'node:fs';

const FPS = 30;
const MAX_LINK = 200;
const OVERLAP = 16;

const CUTS = JSON.parse(readFileSync('cuts.json', 'utf8'));
const startFrame = (n) => Math.round(CUTS[n - 1].start * FPS);
const endFrame = (n) => Math.round(CUTS[n - 1].end * FPS);
const sceneFrames = (n) => endFrame(n) - startFrame(n);
const mountedFrames = (n) => sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

const GI = 'gi.mp4'; //  NASCAR official, "Carson Hocevar, Ryan Blaney Get Into It at Bristol" (MsJuBKfoTrs)
const FC = 'fc.mp4'; //  NASCAR on FOX, Bristol chaos, Blaney/Hocevar clash after Logano wins (zucbKmYLL4Y)
const HL = 'hl.mp4'; //  NASCAR official, Bristol Cup highlights (1iatULgMcRU)
const ND = 'nd.mp4'; //  NASCAR official, What Drivers Said After Bristol (YEXOSSOhm9o)
const NF = 'nf.mp4'; //  NASCAR official, Bristol's wild final laps (B57DkzQPHSw)
const FS = 'fs.mp4'; //  Frontstretch, Blaney furious with Hocevar (PlPoyosi_g4)
const SF = 'sf.mp4'; //  Peter Stratta, Hocevar/Blaney fight and aftermath (5ofnoK3W8XY)
const AT = 'at.mp4'; //  NASCAR official, Atlanta Feb 2025, Blaney slides after Hocevar push (kteROVOO4nU)
const BT = 'bt.mp4'; //  NASCAR official, Blaney's 2023 championship day at Phoenix (Xgzp70_jVRA)
const GR = 'gwr.mp4'; // NASCAR Radioactive, Gateway (St. Louis) brake failure (y0G1eNxtxFE)

/** [src, start, localEndSec | 'end'] -> chunks of <= MAX_LINK frames covering the mounted scene. */
function scene(n, ...specs) {
  const total = mountedFrames(n);
  const links = [];
  let cur = 0;
  specs.forEach(([src, start, endSec], i) => {
    const last = i === specs.length - 1;
    const endF = last ? total : Math.min(total, Math.round(endSec * FPS));
    let frames = endF - cur;
    if (frames <= 0) throw new Error(`scene ${n} link ${i} has no frames (end ${endSec})`);
    let s = start;
    const parts = Math.ceil(frames / MAX_LINK);
    const base = Math.floor(frames / parts);
    for (let p = 0; p < parts; p++) {
      const f = p === parts - 1 ? frames - base * (parts - 1) : base;
      links.push({src, start: Number(s.toFixed(2)), frames: f});
      s += f / FPS;
    }
    cur = endF;
  });
  return links;
}

const CHAINS = {
  // 1 cold recap of the whole story; the hook (GI 137-150) already played before it
  1: scene(1,
    [HL, 833.0, 3.5],    // #12 Wabash Ford on the lead, night
    [HL, 845.0, 7.8],    // started deep, charged, led more laps
    [HL, 875.0, 11.7],   // <50 to go, right where he needed to be
    [GI, 21.4, 14.4],    // in a single corner everything fell apart
    [HL, 1264.0, 18.1],  // contact with Hocevar sends the 12 spinning
    [GI, 90.0, 19.8],    // the crash was only the beginning
    [FC, 336.0, 24.2],   // tempers explode on pit road
    [FS, 6.0, 28.2],     // so what happened / why so furious - Blaney on camera
    [BT, 120.0, 31.3],   // championship fight
    [HL, 129.0, 'end'],  // night aerial: go back to the moment it changed
  ),
  // 2 starting 29th, the 12 fast, leads, wins stage 2, doing everything right
  2: scene(2,
    [HL, 19.8, 2.6],     // green-flag start, deep in the field
    [HL, 27.0, 4.4],     // buried in traffic
    [HL, 850.0, 8.9],    // 12 fast from the green
    [HL, 893.5, 14.9],   // drove up, took control, led a race high
    [HL, 568.0, 19.2],   // won the second stage (stage results)
    [HL, 908.0, 'end'],  // doing everything right at Bristol
  ),
  // 3 43 to go running second; that is the moment it came apart
  3: scene(3,
    [HL, 855.0, 3.8],
    [HL, 1240.5, 'end'],
  ),
  // 4 the sequence: pass, protect, throttle, contact
  4: scene(4,
    [GI, 4.0, 6.4],      // lap 457 pass into turn 1
    [GI, 12.0, 11.5],    // slides down to protect the inside
    [GI, 17.5, 15.2],    // 77 stays in the throttle
    [GI, 34.5, 'end'],   // front of the 77 catches the Ford, spin into the wall
  ),
  // 5 the hit ended his race
  5: scene(5,
    [GI, 42.0, 1.8],
    [GI, 78.0, 5.9],
    [HL, 1330.0, 8.1],   // damaged 12 (33rd)
    [GI, 85.5, 'end'],
  ),
  // 6 so was it on purpose
  6: scene(6,
    [HL, 1305.0, 'end'],
  ),
  // 7 Blaney's real words, footage timed so the speech lands under the narration
  7: scene(7,
    [HL, 1251.0, 3.6],   // climbing out of the wrecked car
    [GI, 106.3, 6.5],    // "he crossed and never lifted..." (source 106.4-109.5)
    [FS, 16.5, 12.2],    // "I protected pretty early..." (source 18.3-22.7 lands at local 8.3s)
    [FS, 23.9, 'end'],   // "something's going to happen" (source 27.2 lands at local 15.5s)
  ),
  // 8 the history: Atlanta 2025, then the care-center line
  8: scene(8,
    [AT, 1.0, 5.1],
    [AT, 12.0, 8.9],     // Hocevar's run, Blaney stalls, spins
    [AT, 34.0, 12.3],    // second angle of the spin
    [AT, 51.0, 14.7],
    [FS, 77.2, 'end'],   // "I haven't had a problem with him..." (source 79.8-84.6 lands at 17.3s)
  ),
  // 9 ten minutes before he went looking for Hocevar
  9: scene(9,
    [FS, 85.0, 2.9],
    [GI, 254.0, 'end'],  // approach, second camera
  ),
  // 10 the fight starts: hand on the shoulder, two punches
  10: scene(10,
    [FC, 321.2, 7.0],    // checkered flag, Blaney walks up, hand on the shoulder (source 325.5 = local 4.3s)
    [GI, 258.5, 13.3],   // replay from the other camera: the punches
    [FC, 329.0, 'end'],
  ),
  // 11 back up, swings, pulled apart, held back, in front of the grandstands
  11: scene(11,
    [GI, 287.5, 4.5],
    [GI, 300.0, 7.7],
    [GI, 308.0, 11.2],
    [GI, 313.0, 14.0],
    [SF, 125.0, 'end'],
  ),
  // 12 the crowd (no quote overlay: the on-camera speaker of this line is Hocevar, not Blaney)
  12: scene(12,
    [NF, 88.0, 3.7],
    [HL, 1039.0, 6.2],
    [NF, 138.0, 'end'],
  ),
  // 13 Blaney's side, then Hocevar
  13: scene(13,
    [GI, 208.5, 1.6],
    [GI, 217.0, 'end'],
  ),
  // 14 "I wasn't trying to wreck him" (ND 92.4-94.7 lands at local 2.6s)
  14: scene(14,
    [ND, 90.0, 'end'],
  ),
  // 15 Hocevar, in his own words
  15: scene(15,
    [ND, 96.7, 6.3],
    [ND, 103.0, 10.5],
    [GI, 231.0, 13.9],
    [ND, 111.6, 17.7],
    [ND, 119.0, 'end'],
  ),
  // 16 who was right: the replays
  16: scene(16,
    [GI, 66.0, 3.5],
    [GI, 244.0, 6.4],
    [GI, 246.9, 8.7],
    [GI, 69.5, 10.3],
    [GI, 72.0, 14.5],
    [HL, 1018.0, 18.2],
    [GI, 119.0, 'end'],
  ),
  // 17 the real damage was in the points
  17: scene(17,
    [FC, 283.0, 3.6],
    [ND, 34.5, 'end'],
  ),
  // 18 the format twist
  18: scene(18,
    [HL, 30.0, 4.1],
    [GI, 237.0, 7.7],
    [HL, 40.0, 10.1],
    [HL, 54.0, 15.0],
    [HL, 66.0, 20.9],
    [HL, 1009.0, 'end'],
  ),
  // 19
  19: scene(19,
    [GI, 61.5, 'end'],
  ),
  // 20 the points hit, then the leaders speaking
  20: scene(20,
    [HL, 1345.0, 4.5],
    [HL, 1036.0, 5.9],
    [HL, 1022.0, 16.2],
    [ND, 279.0, 19.5],
    [ND, 476.6, 'end'],
  ),
  // 21 Hocevar third
  21: scene(21,
    [GI, 275.0, 2.7],
    [HL, 1486.0, 6.7],
    [HL, 1500.0, 9.7],
    [HL, 1290.0, 11.5],
    [GI, 224.0, 'end'],
  ),
  // 22 the week before: Gateway (St. Louis) brake failure
  22: scene(22,
    [GR, 15.0, 2.9],
    [GR, 287.0, 6.9],
    [GR, 291.5, 10.2],
    [HL, 1343.0, 12.1],
    [HL, 1134.0, 'end'],
  ),
  // 23 Logano wins while Blaney sits in the fence
  23: scene(23,
    [NF, 225.0, 1.9],
    [FC, 240.0, 6.0],
    [HL, 1318.0, 9.0],
    [FC, 246.0, 11.3],
    [GI, 184.0, 13.3],
    [HL, 899.5, 14.7],
    [HL, 1311.5, 16.0],
    [GI, 199.0, 17.2],
    [FC, 289.0, 'end'],
  ),
  // 24 where this leaves him
  24: scene(24,
    [BT, 66.0, 3.5],
    [BT, 108.0, 8.0],
    [GI, 279.0, 12.6],
    [GI, 318.0, 14.6],
    [HL, 1058.0, 'end'],
  ),
  // 25 the math
  25: scene(25,
    [BT, 174.0, 3.3],
    [HL, 1273.0, 5.6],
    [HL, 1128.0, 'end'],
  ),
  // 26 recap
  26: scene(26,
    [NF, 0.0, 1.7],
    [HL, 1013.6, 5.0],
    [GI, 45.0, 9.0],
    [FC, 331.0, 13.9],
    [HL, 1139.0, 'end'],
  ),
  // 27 your take
  27: scene(27,
    [FC, 266.0, 1.4],
    [FC, 52.0, 6.2],
    [GI, 202.0, 11.7],
    [GI, 139.0, 'end'],  // the hook's own scrum, reused as the recap exception
  ),
  // 28 outro
  28: scene(28,
    [BT, 198.0, 4.7],
    [HL, 1200.0, 9.5],
    [NF, 30.0, 'end'],
  ),
};

const names = {GI: GI, FC: FC, HL: HL, ND: ND, NF: NF, FS: FS, SF: SF, AT: AT, BT: BT, GR: GR};
const rev = Object.fromEntries(Object.entries(names).map(([k, v]) => [v, k]));

const out = `/**
 * Scene -> chain of bed clips. Generated by build-footage.mjs (regenerate if scene durations change).
 * Rules: no link over ~7s, no overlapping ranges of one source, every clip matched to its line.
 * Every clip plays at rate 1 (span = frames + bleed) so the real speech in the quote scenes stays
 * in sync with the narration.
 *
 * Sources (720p h264, all Bristol night race 2026-09-19 unless stated):
 *   GI  NASCAR official, "Carson Hocevar, Ryan Blaney Get Into It at Bristol" (MsJuBKfoTrs) -
 *       the lap-457 contact + replays (0-95s), Blaney's care-center interview (96-122s), the pit
 *       road fight from three cameras (137-166, 195-215, 254-320), Hocevar's interview (215-345).
 *       The hook plays 137-150 in HookOpen.tsx; the film never returns to that range except
 *       the recap tail of scene 27 (139-141), the deliberate hook-reuse exception.
 *   FC  NASCAR on FOX (zucbKmYLL4Y) - the same broadcast: crash replays with the analyst (50-165s),
 *       Logano's win burnouts (240-252s) and the fight from the overhead camera (323-352s).
 *   HL  NASCAR official race highlights (1iatULgMcRU) - #12 Wabash Ford running/leading (833-917s),
 *       the lap-457 contact and aftermath (1240-1335s), the finish (1480-1600s).
 *   ND  NASCAR official, "What Drivers Said After Bristol" (YEXOSSOhm9o) - Hocevar (83-147s),
 *       Logano (0-75s), Larson (217-300s), Hamlin (476-510s).
 *   NF  NASCAR official, "Bristol's WILD Final Laps" (B57DkzQPHSw). Logano's pit crew, closing laps.
 *   FS  Frontstretch, Blaney after the wreck (PlPoyosi_g4) - "I protected pretty early..." at 18.3s,
 *       "something's going to happen" at 27.2s, "I haven't had a problem with him for probably a
 *       year and a half, but it's getting old" at 79.8s.
 *   SF  Peter Stratta, fight aftermath from the grandstand side (5ofnoK3W8XY).
 *   AT  NASCAR official, Atlanta 2025-02-23, "Blaney goes for long slide after a big push from
 *       Carson Hocevar" (kteROVOO4nU).
 *   BT  NASCAR, Blaney's 2023 title day at Phoenix (Xgzp70_jVRA), 640x360.
 *   GR  NASCAR Radioactive, Gateway 2026 (y0G1eNxtxFE) - the "12 Ryan Blaney: Yep, I'm fine. Brakes"
 *       caption over the wall hit, and the WWT Raceway sign.
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
): Link => ({src: P_(file), startFrom, frames, span: (frames + 22) / 30, ...extra});

${Object.entries(names).map(([k, v]) => `const ${k} = '${v}';`).join('\n')}

export const CHAINS: Record<number, Link[]> = {
${Object.entries(CHAINS).map(([n, links]) => `  ${n}: [\n${links.map((l) => `    L(${rev[l.src]}, ${l.start}, ${l.frames}),`).join('\n')}\n  ],`).join('\n')}
};

export const chain = (n: number): Link[] => CHAINS[n];
`;
writeFileSync('remotion/src/footage.ts', out);

// overlap check: same source, overlapping [start, start+frames/30]
const byNames = {};
for (const [n, links] of Object.entries(CHAINS)) for (const l of links) (byNames[l.src] ||= []).push({n: +n, a: l.start, b: l.start + l.frames / FPS});
let bad = 0;
for (const [src, arr] of Object.entries(byNames)) {
  arr.sort((x, y) => x.a - y.a);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].a < arr[i - 1].b - 0.05) {
      bad++;
      console.log(`OVERLAP ${src}: scene ${arr[i - 1].n} [${arr[i - 1].a.toFixed(1)}-${arr[i - 1].b.toFixed(1)}] vs scene ${arr[i].n} [${arr[i].a.toFixed(1)}-${arr[i].b.toFixed(1)}]`);
    }
  }
}
let maxL = 0;
for (const links of Object.values(CHAINS)) for (const l of links) maxL = Math.max(maxL, l.frames);
console.log(`wrote footage.ts, ${Object.values(CHAINS).reduce((t, l) => t + l.length, 0)} links, longest ${maxL}f, overlaps ${bad}`);






