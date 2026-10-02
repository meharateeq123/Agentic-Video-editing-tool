// Generates remotion/src/footage.ts. Same rules as every prior film: no link over 7s (190f cap,
// under the 210f/7s hard limit), no two links anywhere sharing overlapping ranges of the same
// source clip, and every clip picked to actually match the line spoken over it (flick-shot-relevance).
import {readFileSync, writeFileSync} from 'node:fs';

const FPS = 30;
const MAX_LINK = 190;
const OVERLAP = 16;

const CUTS = JSON.parse(readFileSync('cuts.json', 'utf8'));
const startFrame = (n) => Math.round(CUTS[n - 1].start * FPS);
const endFrame = (n) => Math.round(CUTS[n - 1].end * FPS);
const sceneFrames = (n) => endFrame(n) - startFrame(n);
const mountedFrames = (n) => sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

function chunks(total) {
  const n = Math.ceil(total / MAX_LINK);
  const base = Math.floor(total / n);
  const out = [];
  let left = total;
  for (let i = 0; i < n; i++) {
    const f = i === n - 1 ? left : base;
    out.push(f);
    left -= f;
  }
  return out;
}

/** Lays consecutive chunks from a fixed anchor, 0.3s gap between. */
function at(src, startSec, totalFrames, extra = {}) {
  let cursor = startSec;
  return chunks(totalFrames).map((f) => {
    const l = {src, start: Number(cursor.toFixed(2)), frames: f, extra};
    cursor += f / FPS + 0.3;
    return l;
  });
}

// Sources - all fresh, none used in any earlier short/film (checked against offlimits-ids.txt).
const H = 'nhms-official.mp4'; // NASCAR official, NHMS Cup highlights, 2026-08-23 (0-600s of source)
const F = 'nhms-fox.mp4'; // NASCAR on FOX, Dollar Tree 301 highlights, 2026-08-23 (source sec 150-300, local 0=150)
const W = 'wilkesboro23.mp4'; // FS1, North Wilkesboro All-Star heats, 2023-05-21 (0-720s of source)
const O = 'odonnell.mp4'; // NASCAR official, O'Donnell/Kennedy address, 2026-04-25 (0-420s of source)
const B = 'bristol-cup26.mp4'; // NASCAR official, Bristol Cup highlights, 2026-04-12 (0-600s of source)
const T = 'bristol-trucks.mp4'; // NASCAR official, Bristol Truck highlights, 2026-09-18 (0-480s of source)
const GH = 'gw-hamlin.mp4'; // NBC extended Gateway highlights (ZMwqXq8N8fY), "DENNY HAMLIN SAYS" ~12:10
const GL = 'gw-larson.mp4'; // same source, "Larson's coming on through...HUGE HIT" ~18:22-18:45
const GBl = 'gw-bell.mp4'; // same source, "Southern 500 winner Christopher Bell" ~2:40
const GBy = 'gw-blaney.mp4'; // same source, "Blaney in..." ~0:38

// F local seconds = source-absolute - 150 (yt-dlp --download-sections keeps its own local clock).
const CHAINS = {
  // 1 "NASCAR just handed teams a decision...quietly rewrote the rulebook on rain."
  1: [...at(H, 10, 190), ...at(H, 26, 190), ...at(H, 92, mountedFrames(1) - 380)],
  // 2 "Here's exactly what changed..."
  2: at(H, 122, mountedFrames(2)),
  // 3 "On Wednesday, NASCAR announced a new wet-weather tire procedure..."
  3: [...at(B, 10, 190), ...at(B, 45, mountedFrames(3) - 190)],
  // 4 "Here's how it works...every car must start the race on the same tire type."
  4: [...at(H, 60, 150), ...at(H, 82, 150), ...at(H, 96, mountedFrames(4) - 300)],
  // 5 "What's different...that call used to belong to NASCAR officials. Now the crew chief."
  5: [...at(H, 195, 185), ...at(H, 240, 185), ...at(H, 260, mountedFrames(5) - 370)],
  // 6 "Section 8.6.1.D...the crew chief is responsible..." - BigType stamp, generic pit-box footage.
  6: [...at(B, 90, 170), ...at(B, 120, mountedFrames(6) - 170)],
  // 7 "This isn't a random rule tweak...frustrated almost everyone in the garage."
  7: at(H, 285, mountedFrames(7)),
  // 8 HERO: the New Hampshire gamble, the caution, the forced switch.
  8: [
    ...at(H, 300, 190), // SVG blitzing the field, ~5:00-5:11
    ...at(F, 77, 150), // FOX: competition caution called (local = 227.2-150)
    ...at(H, 362, 150), // "time to make a switch...starting this race on the wets"
    ...at(H, 453, mountedFrames(8) - 490), // SVG in the field post-switch
  ],
  // 9 O'Donnell quote.
  9: at(O, 5, mountedFrames(9)),
  // 10 "In other words, NASCAR watched a driver get punished..."
  10: at(H, 530, mountedFrames(10)),
  // 11 "The new rule isn't a complete free-for-all..."
  11: at(B, 160, mountedFrames(11)),
  // 12 "NASCAR still has to officially declare the track wet..."
  12: [...at(H, 0, 180), ...at(H, 40, mountedFrames(12) - 180)],
  // 13 "wrinkle involving pit road...non-competitive." Real booth explanation, ~6:04-6:52.
  13: [...at(H, 365, 190), ...at(H, 395, 190), ...at(H, 415, mountedFrames(13) - 380)],
  // 14 "Bristol...one of just seven oval tracks...since the 2023 All-Star Race." Real wet-tire
  // debut. W's downloaded section is source seconds 55-160, so local 0 = absolute 55.
  14: [...at(W, 5, 190), ...at(W, 40, mountedFrames(14) - 190)],
  // 15 "Saturday night at Bristol becomes a much more complicated strategic puzzle..."
  15: [...at(B, 150, 175), ...at(T, 20, 175), ...at(B, 340, mountedFrames(15) - 350)],
  // 16 "no longer a single moment...some gamble on staying wet, others bolt slicks."
  16: [...at(B, 220, 210), ...at(T, 140, mountedFrames(16) - 210)],
  // 17 "turns into a genuine championship storyline."
  17: at(B, 280, mountedFrames(17)),
  // 18 STANDINGS: Hamlin / Larson / Bell / Blaney.
  18: [...at(GH, 0, 195), ...at(GL, 0, 195), ...at(GBl, 0, 195), ...at(GBy, 0, mountedFrames(18) - 585)],
  // 19 "Bristol only raises the stakes further...half-mile track."
  19: [...at(B, 350, 192), ...at(T, 180, mountedFrames(19) - 192)],
  // 20 "If Bristol stays dry...sixteen crew chiefs staring at a drying racetrack."
  20: [...at(T, 220, 162), ...at(B, 450, mountedFrames(20) - 162)],
  // 21 "teams that get it right...nine-point lead over Larson." Recap standings, smaller stamp.
  21: [...at(GH, 8, 224), ...at(GL, 8, mountedFrames(21) - 224)],
  // 22 "NASCAR just handed the garage more freedom...depends on what the sky does at Bristol."
  22: [...at(T, 300, 200), ...at(B, 500, mountedFrames(22) - 200)],
};

const SHORT = {[H]: 'H', [F]: 'F', [W]: 'W', [O]: 'O', [B]: 'B', [T]: 'T', [GH]: 'GH', [GL]: 'GL', [GBl]: 'GBl', [GBy]: 'GBy'};

function renderLinks(links) {
  const calls = links.map((l) => `L(${SHORT[l.src]}, ${l.start}, ${l.frames})`);
  if (calls.length <= 1) return calls.join(', ');
  return '\n    ' + calls.join(',\n    ') + ',\n  ';
}

const chainsSrc = Object.entries(CHAINS).map(([n, links]) => `  ${n}: [${renderLinks(links)}],`).join('\n');

const out = `/**
 * Scene -> chain of bed clips. Generated by build-footage.mjs - regenerate with
 * \`node build-footage.mjs\` if scene durations change.
 *
 * Rules: no link over 7s, no two links anywhere sharing overlapping ranges of the same source,
 * and every clip is picked to match the specific line spoken over it (flick-shot-relevance) -
 * never a near-miss "about the same topic" shot.
 *
 * Sources, all confirmed fresh against every earlier short/film's footage.ts (none reused):
 *   H   NASCAR official, "NASCAR Cup Series Highlights | 2026 New Hampshire Motor Speedway"
 *       (wlivkA5uxdo, 2026-08-23) - real wet-track racing, the real SVG blitz, and the real
 *       booth explanation of the switch-to-slicks and non-competitive pit-road procedure.
 *   F   NASCAR on FOX, "Dollar Tree 301 Highlights" (CIpJAMluGZk, 2026-08-23) - a second camera
 *       angle on the same race; carries the real "competition caution" call.
 *   W   FS1 broadcast, "Full Heat Races - 2023 NASCAR North Wilkesboro Speedway" (xa9B9hvtPmY,
 *       2023-05-21) - the actual Cup debut of Goodyear's wet-weather tire on an oval.
 *   O   NASCAR official, "Steve O'Donnell and Ben Kennedy Address NASCAR Leadership Changes"
 *       (VCxh21Htv1c, 2026-04-25) - real footage of both men named in the quote.
 *   B   NASCAR official, "NASCAR Cup Series Highlights | 2026 Bristol Motor Speedway"
 *       (MQHry_BnlzY, 2026-04-12) - the real track this year's Cup field raced on.
 *   T   NASCAR official, "Craftsman Truck Series Highlights | 2026 Bristol Motor Speedway"
 *       (Yvy2wHozPKI, 2026-09-18) - Bristol under the lights this same race weekend.
 *   GH/GL/GBl/GBy   Motorsports on NBC, "NASCAR Cup Series 2026: Chase continues at WWTR |
 *       EXTENDED HIGHLIGHTS" (ZMwqXq8N8fY, 2026-09-14) - fresh ranges of Hamlin/Larson/Bell/
 *       Blaney each on screen when the standings line names them (gibbs3 used only 19:36-20:08
 *       of this source; every range below is clear of that window).
 *
 * Facts on screen: Section 8.6.1.D, the real NHMS wet-tire gamble and forced switch, the seven
 * approved ovals, and the Chase standings (Hamlin leads, Larson -9, Bell -18, Blaney -33).
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

const H = '${H}';
const F = '${F}';
const W = '${W}';
const O = '${O}';
const B = '${B}';
const T = '${T}';
const GH = '${GH}';
const GL = '${GL}';
const GBl = '${GBl}';
const GBy = '${GBy}';

export const CHAINS: Record<number, Link[]> = {
${chainsSrc}
};

export const chain = (n: number): Link[] => CHAINS[n];
`;

writeFileSync('remotion/src/footage.ts', out);
console.log('Wrote footage.ts');
for (const [n, links] of Object.entries(CHAINS)) {
  const total = links.reduce((t, l) => t + l.frames, 0);
  const need = mountedFrames(Number(n));
  const flag = total < need ? '  <<< SHORT' : total > need + 20 ? '  <<< long' : '';
  console.log(`  scene ${n}: ${links.length} link(s), ${total}f need=${need}f${flag}`);
}
