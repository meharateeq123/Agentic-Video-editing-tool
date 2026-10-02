// Writes remotion/src/footage.ts: for each scene, a chain of short bed links.
//
// Hard rules carried from every earlier film:
//   1. No link holds the screen for more than ~6.3s (190 frames, under BedChain's 210 cap).
//   2. No two links anywhere in the file draw on overlapping ranges of the same source clip.
//   3. A scene's footage is about the line it plays under. Every range below was read off a
//      timestamped contact sheet (sheets/), and each key is sized to the sentence it covers, so the
//      allocator - which drains keys in PLAN order - lands each shot on the words it illustrates.
//   4. Nothing here was used in phelps1 or yuzidi1.
//
//   node build-footage.mjs          strict: short scenes are reported, never padded

import {readFileSync, writeFileSync} from 'node:fs';

const FPS = 30;
const OVERLAP = 16;
const MAX_LINK = 190;
const MIN_LINK = 45;

const tl = readFileSync('remotion/src/timeline.ts', 'utf8');
const CUTS = [...tl.matchAll(/\{n: (\d+), start: ([\d.]+), end: ([\d.]+)\}/g)].map((m) => ({
  n: +m[1],
  start: +m[2],
  end: +m[3],
}));
const sceneFrames = (n) =>
  Math.round(CUTS[n - 1].end * FPS) - Math.round(CUTS[n - 1].start * FPS);
const mountedFrames = (n) => sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

const D50 = 'douglass-50free-wr-indy.mp4'; // USA Swimming, Douglass 50 free WR, Indianapolis 2026
const W50R = 'walsh-50free-wr-rome.mp4'; // RAI broadcast, Walsh 50 free WR, Sette Colli 2026
const W100 = 'walsh-100fly-wr-5433.mp4'; // SwimSwam, Walsh 100 fly WR 54.33, Fort Lauderdale 2026
const W50F = 'walsh-50fly-2451-rome.mp4'; // RAI broadcast, Walsh 50 fly 24.51, Sette Colli 2026
const WSC = 'walsh-sc-9-wrs-wa.mp4'; // World Aquatics, Walsh's short course WRs, Budapest 2024 (25m)
const DSC = 'douglass-sc-200breast-wr.mp4'; // World Aquatics, Douglass SC 200 breast WR (25m)
const P6 = 'paris-day6-highlights.mp4'; // Olympics, Paris day 6 - Douglass 200 breast final
const P5 = 'paris-day5-highlights.mp4'; // Olympics, Paris day 5 - Marchand 200 fly final
const SJ50 = 'sjostrom-50free-wr-wa.mp4'; // World Aquatics, Sjostrom 50 free WR 23.61, Fukuoka 2023
const MCB = 'mcintosh-bowman-cbc.mp4'; // CBC Sports, McIntosh settles in with Bob Bowman (2026)
const MC400F = 'mcintosh-400free-wr-cbc.mp4'; // CBC, 400 free WR, 2025 Canadian trials
const MC200IM = 'mcintosh-200im-wr-cbc.mp4'; // CBC, 200 IM WR, 2025 Canadian trials
const MC400IM = 'mcintosh-400im-wr-cbc.mp4'; // CBC, 400 IM WR, 2025 Canadian trials
const MC200W = 'mcintosh-200fly-wr-wa.mp4'; // World Aquatics, 200 fly WR 2:01.65, Canadian trials 2026
const MC200C = 'mcintosh-200fly-wr-cbc.mp4'; // CBC Ready Room, day 1 of 2026 trials
const MARWR = 'marchand-200im-wr-wa.mp4'; // World Aquatics, Marchand 200 IM WR 1:52.69
const MARPAR = 'marchand-paris-all-races.mp4'; // Olympics Aquatics, every Marchand race at Paris
const PAN = 'pan-100free-wr-paris.mp4'; // Olympics, men's 100 free final Paris - Pan WR 46.40
const POP = 'popovici-wa-again.mp4'; // World Aquatics, Popovici 100 free gold, Singapore 2025
const PHL100 = 'phelps-london-100fly.mp4'; // Olympics, Phelps 100 fly gold, London 2012
const PHL200 = 'phelps-london-200im.mp4'; // Olympics, Phelps 200 IM gold, London 2012
const PP400 = 'mcintosh-400im-panpacs.mp4'; // USA Swimming, 400 IM final, Pan Pacs 2026
const MISS = 'mcintosh-400free-miss-cbc.mp4'; // CBC News, McIntosh misses the 400 free final
const MCT = 'mcintosh-trains-cbc.mp4'; // CBC Sports, how McIntosh trains
const D200IM = 'douglass-200im-indy.mp4'; // USA Swimming, Douglass 200 IM, Indianapolis 2026
const D50FLY = 'douglass-50fly-indy.mp4'; // USA Swimming, Douglass 50 fly, Indianapolis 2026
const DBR = 'douglass-200breast-indy.mp4'; // USA Swimming, Douglass 200 breast, Indianapolis 2026
const DINT = 'douglass-50free-wr-interview.mp4'; // SwimSwam, Douglass after the 50 free WR
const SJ100 = 'sjostrom-100free-wr-2017-wa.mp4'; // World Aquatics, Sjostrom 100 free WR 2017
const SJFLY = 'sjostrom-50fly-wr-2014.mp4'; // Sjostrom 50 fly WR 24.43, 2014 (stands footage)

// CBC News carries a two-line ticker along the bottom; push it off the frame.
const TICKER = {zoom: 1.2, offY: -7};

// Usable ranges in seconds, each read off a contact sheet. `x` overrides the camera move.
const SOURCES = {
  // 1 - "A scoreboard flashes red. Then again. And again. ... the same swimmer twice"
  WSC1: {file: WSC, note: 'Walsh world record finishes, one after another (SC worlds 2024)', usable: [[40, 46], [86, 90], [228, 236]]},
  MCC1: {file: MC200C, note: 'the pool and the crowd on its feet for a world record (Canadian trials 2026)', usable: [[234, 244]]},
  // 2 - "the fastest swimmers on the planet"
  PAN2: {file: PAN, note: "men's 100 free Olympic final, Paris - the start", usable: [[0, 8]]},
  // 3 - Douglass 50 free WR
  D50RACE: {file: D50, note: 'Douglass 50 free final, Indianapolis - to the board, DOUGLASS 1', usable: [[17, 30]]},
  SJ50: {file: SJ50, note: "Sarah Sjostrom walks out, name card - the 23.61 she held", usable: [[93.5, 98.5]]},
  D50CEL: {file: D50, note: 'Douglass at the wall after the world record', usable: [[31, 35]]},
  P6D: {file: P6, note: 'Douglass wins the 200 breast Olympic final, Paris - board and name', usable: [[482, 488]]},
  DBR3: {file: DBR, note: 'Douglass at the wall, 200 breast, the same Indianapolis meet', usable: [[160, 165]]},
  D50CEL2: {file: D50, note: 'Douglass smiling at the wall - world record anyway', usable: [[66, 70]]},
  // 4 - Walsh takes it back in Rome
  W50R0: {file: W50R, note: 'cap reads WALSH, Rome', usable: [[0, 3]]},
  W50RFIN: {file: W50R, note: 'Walsh 50 free final Rome, finish and 23.55 on the graphic', usable: [[38, 50]]},
  D50HUG: {file: D50, note: 'Douglass and Walsh embrace across the lane rope, Indianapolis', usable: [[48, 56]]},
  // 5 - Walsh 100 fly 54.33
  W100FIN: {file: W100, note: 'Walsh 100 fly, Fort Lauderdale - closing length and finish', usable: [[52, 66]]},
  W100CROWD: {file: W100, note: 'the crowd reacts to 54.33', usable: [[66, 74]]},
  W100BOARD: {file: W100, note: 'the scoreboard', usable: [[74, 80]]},
  W100RACE: {file: W100, note: 'Walsh 100 fly, the first length', usable: [[8, 17]]},
  // 6 - Walsh 50 fly 24.51 in Rome; Sjostrom 24.43
  W50F: {file: W50F, note: 'Walsh 50 fly final Rome, finish and 24.51', usable: [[36, 46]]},
  SJFLY: {file: SJFLY, note: "Sjostrom's 24.43 50 fly swim, 2014", usable: [[50, 56]]},
  W50RCEL: {file: W50R, note: 'Walsh celebrating in Rome, winner graphic', usable: [[54, 64]]},
  // 7 - McIntosh
  MCB7: {file: MCB, note: 'McIntosh in training, 2026', usable: [[4, 10]]},
  MC400F7: {file: MC400F, note: 'McIntosh 400 free world record finish', usable: [[250, 256]]},
  MC200IM7: {file: MC200IM, note: 'McIntosh at the wall, 200 IM world record', usable: [[150, 153]]},
  MC400IM7: {file: MC400IM, note: 'McIntosh 400 IM world record finish', usable: [[266, 272]]},
  MCC7: {file: MC200C, note: 'the 200 fly at the 2026 Canadian trials', usable: [[166, 172]]},
  MC200W7: {file: MC200W, note: 'McIntosh 200 fly - closing length to the world record', usable: [[164, 179.5]]},
  // 8 - "the record she thought she would never break"; four at once; Sjostrom's four
  MCC8: {file: MC200C, note: 'McIntosh interviewed after the 200 fly world record', usable: [[150, 158]]},
  SJ100: {file: SJ100, note: 'Sjostrom 100 free world record, 2017 - name graphic', usable: [[0, 6]]},
  MC200W8: {file: MC200W, note: 'McIntosh under the WORLD RECORD banner', usable: [[186, 196]]},
  // 9 - Marchand, Pan, Popovici
  MARWR0: {file: MARWR, note: "men's 200 IM start list, MARCHAND", usable: [[0, 4]]},
  MARWR: {file: MARWR, note: 'Marchand 200 IM world record - freestyle leg to the finish', usable: [[106, 118]]},
  MARPAR9: {file: MARPAR, note: 'Marchand celebrating an Olympic win, Paris', usable: [[1737, 1741]]},
  PAN9: {file: PAN, note: "Pan Zhanle's 46.40 - finish and board PAN 1", usable: [[42, 51]]},
  POP9: {file: POP, note: 'Popovici wins the 100 free, board and his face', usable: [[46, 53]]},
  MARWRCEL: {file: MARWR, note: 'Marchand reacts to the 1:52.69', usable: [[124, 129]]},
  WSC9: {file: WSC, note: "Walsh world record - the women's side", usable: [[440, 446]]},
  // 10 - deliberate choices; Bowman; Douglass versatility
  MCB10: {file: MCB, note: 'McIntosh training under Bowman', usable: [[72, 79]]},
  MCBBOW: {file: MCB, note: 'Bob Bowman, name graphic', usable: [[50, 55]]},
  PHL10: {file: PHL100, note: 'Phelps at the wall after a London 2012 gold', usable: [[260, 263]]},
  MCBMAR: {file: MCB, note: 'Marchand and McIntosh - the training partner', usable: [[193, 195.5]]},
  P6D10: {file: P6, note: 'Douglass in the 200 breast Olympic final, Paris', usable: [[424, 436]]},
  DSC10: {file: DSC, note: 'Douglass celebrating a breaststroke world record', usable: [[148, 156]]},
  // 11 - Pan Pacs 400 free miss
  MCT11: {file: MCT, note: 'McIntosh swimming in training', usable: [[32, 36]]},
  // The CBC News clip's pool footage turned out to be the 400 IM (its own lower third says so), not
  // the 400 free heat, so it is not used. "An event she still holds the world record in" gets her
  // actual 400 free world record swim instead.
  MC400F11: {file: MC400F, note: 'her 400 free world record swim', usable: [[56, 72]]},
  MCB11: {file: MCB, note: 'McIntosh reflecting, interview', usable: [[212, 232]]},
  // 12 - Douglass's three events; Phelps's scratches
  D200IM12: {file: D200IM, note: 'Douglass 200 IM, Indianapolis', usable: [[20, 26.3]]},
  D50FLY12: {file: D50FLY, note: 'Douglass after the 50 fly, name graphic', usable: [[36, 42.3]]},
  PHL200A: {file: PHL200, note: 'Phelps behind the blocks, London 2012', usable: [[160, 167]]},
  // 13 - 400 IM gold at Pan Pacs; Bowman; Phelps
  PP400A: {file: PP400, note: "Pan Pacs 400 IM start list", usable: [[0, 4]]},
  PP400FIN: {file: PP400, note: 'McIntosh wins the 400 IM, Pan Pacs', usable: [[286, 300]]},
  MCB13: {file: MCB, note: 'Bob Bowman interview', usable: [[110, 116]]},
  PHL200B: {file: PHL200, note: 'Phelps wins the 200 IM, London 2012 - board PHELPS 1', usable: [[330, 335]]},
  // 14 - short course
  WSC14A: {file: WSC, note: 'short course worlds, 25m pool, blocks', usable: [[96, 102]]},
  DSC14: {file: DSC, note: 'short course 200 breast - a turn at the wall', usable: [[60, 68]]},
  WSC14B: {file: WSC, note: 'short course race', usable: [[60, 66]]},
  D50BOARD: {file: D50, note: '50 free results board, DOUGLASS 23.59', usable: [[192, 196]]},
  MC200WB: {file: MC200W, note: '200 fly results board', usable: [[210, 216]]},
  // 15 - underwater speed and turns
  WSC15A: {file: WSC, note: 'short course racing and underwaters', usable: [[240, 252]]},
  DSC15: {file: DSC, note: 'underwater breaststroke, short course', usable: [[124, 130]]},
  WSC15B: {file: WSC, note: 'underwater butterfly, short course', usable: [[320, 328]]},
  WSC15C: {file: WSC, note: 'Walsh celebrating another short course record', usable: [[496, 504]]},
  // 16 - versatility across the three of them
  P5MAR: {file: P5, note: 'Marchand at the wall after the 200 fly, Paris', usable: [[288, 293]]},
  D50_16: {file: D50, note: 'Douglass, the 50 free', usable: [[74, 76.5]]},
  P6D16: {file: P6, note: 'Douglass with the 200 breast gold', usable: [[489, 491.5]]},
  W50F16: {file: W50F, note: 'Walsh celebrating the 50 fly, Rome', usable: [[50, 53.2]]},
  MC200IM16: {file: MC200IM, note: 'McIntosh in the 200 IM', usable: [[16, 21]]},
  MARPAR16: {file: MARPAR, note: 'Marchand with arms up, Paris crowd', usable: [[1742, 1750]]},
  // 17 - a year under assault
  WSC17: {file: WSC, note: 'Walsh celebrating a world record', usable: [[540, 548]]},
  MC400IM17: {file: MC400IM, note: 'McIntosh after the 400 IM world record', usable: [[272, 280]]},
  W50R17: {file: W50R, note: 'Walsh sprinting, Rome', usable: [[22, 28]]},
  // 18 - which record lasts; will Douglass try all three
  MC200WB2: {file: MC200W, note: 'the 200 fly world record on the board', usable: [[216, 222]]},
  DINT18: {file: DINT, note: 'Douglass interviewed after the world record', usable: [[6, 14]]},
  // 19 - the next record
  MARWR19: {file: MARWR, note: 'Marchand, world record pace', usable: [[60, 68]]},
};

const PLAN = {
  1: ['WSC1', 'MCC1'],
  2: ['PAN2'],
  3: ['D50RACE', 'SJ50', 'D50CEL', 'P6D', 'DBR3', 'D50CEL2'],
  4: ['W50R0', 'W50RFIN', 'D50HUG'],
  5: ['W100FIN', 'W100CROWD', 'W100BOARD', 'W100RACE'],
  6: ['W50F', 'SJFLY', 'W50RCEL'],
  7: ['MCB7', 'MC400F7', 'MC200IM7', 'MC400IM7', 'MCC7', 'MC200W7'],
  8: ['MCC8', 'SJ100', 'MC200W8'],
  9: ['MARWR0', 'MARWR', 'MARPAR9', 'PAN9', 'POP9', 'MARWRCEL', 'WSC9'],
  10: ['MCB10', 'MCBBOW', 'PHL10', 'MCBMAR', 'P6D10', 'DSC10'],
  11: ['MCT11', 'MC400F11', 'MCB11'],
  12: ['D200IM12', 'D50FLY12', 'PHL200A'],
  13: ['PP400A', 'PP400FIN', 'MCB13', 'PHL200B'],
  14: ['WSC14A', 'DSC14', 'WSC14B', 'D50BOARD', 'MC200WB'],
  15: ['WSC15A', 'DSC15', 'WSC15B', 'WSC15C'],
  16: ['P5MAR', 'D50_16', 'P6D16', 'W50F16', 'MC200IM16', 'MARPAR16'],
  17: ['WSC17', 'MC400IM17', 'W50R17'],
  18: ['MC200WB2', 'DINT18'],
  19: ['MARWR19'],
};

const cursor = {};
for (const k of Object.keys(SOURCES)) cursor[k] = SOURCES[k].usable.map(([a, b]) => ({a, b}));

// Overlap guard across keys that share a file.
{
  const byFile = {};
  for (const [k, s] of Object.entries(SOURCES)) {
    for (const [a, b] of s.usable) (byFile[s.file] ??= []).push({k, a, b});
  }
  for (const [f, rs] of Object.entries(byFile)) {
    rs.sort((x, y) => x.a - y.a);
    for (let i = 1; i < rs.length; i++) {
      if (rs[i].a < rs[i - 1].b) throw new Error(`overlap in ${f}: ${rs[i - 1].k} ${rs[i - 1].a}-${rs[i - 1].b} vs ${rs[i].k} ${rs[i].a}-${rs[i].b}`);
    }
  }
}
for (const [n, keys] of Object.entries(PLAN)) {
  for (const k of keys) if (!SOURCES[k]) throw new Error(`scene ${n}: unknown key ${k}`);
}

function take(k, frames) {
  const want = frames / FPS;
  for (const r of cursor[k]) {
    const have = r.b - r.a;
    if (have < MIN_LINK / FPS) continue;
    const use = Math.min(want, have);
    const startFrom = +r.a.toFixed(2);
    r.a = +(r.a + use).toFixed(2);
    return {k, startFrom, frames: Math.round(use * FPS)};
  }
  return null;
}

const MOVES = [{driftX: 0.5}, {zoom: 1.05}, {driftX: -0.5}, {zoom: 1.04, driftX: 0.4}];
const out = [];
const shortfall = [];

for (const {n} of CUTS) {
  const need = mountedFrames(n);
  const links = [];
  let got = 0;
  let guard = 0;
  while (got < need && guard++ < 40) {
    const want = Math.min(MAX_LINK, need - got);
    let piece = null;
    for (const k of PLAN[n]) {
      piece = take(k, want);
      if (piece) break;
    }
    if (!piece) break;
    links.push(piece);
    got += piece.frames;
  }
  // A tail shorter than MIN_LINK would flash on screen for a few frames; fold it into the link
  // before it instead (every tail here continues the same range, so the picture is unchanged).
  if (links.length > 1 && links[links.length - 1].frames < MIN_LINK) {
    const tail = links.pop();
    links[links.length - 1].frames += tail.frames;
  }
  if (got < need) shortfall.push({n, need, got, prefs: PLAN[n].join('/')});
  const body = links
    .map((l, i) => {
      const move = SOURCES[l.k].x ?? MOVES[i % MOVES.length];
      const kv = Object.entries(move).map(([a, b]) => `${a}: ${b}`).join(', ');
      return `    L(${l.k}, ${l.startFrom}, ${l.frames}, {${kv}}), // ${SOURCES[l.k].note}`;
    })
    .join('\n');
  out.push(`  // ${n} (${need}f) - ${CUTS[n - 1].start.toFixed(2)}s\n  ${n}: [\n${body}\n  ],`);
}

const usedKeys = new Set(out.join('\n').match(/L\((\w+),/g)?.map((m) => m.slice(2, -1)) ?? []);
const decls = Object.entries(SOURCES)
  .filter(([k]) => usedKeys.has(k))
  .map(([k, s]) => `const ${k} = '${s.file}';`)
  .join('\n');

const src = `/**
 * Scene -> chain of bed clips. Generated by build-footage.mjs - regenerate, don't hand-edit, so the
 * no-overlap guarantee holds. Every range is from a timestamped contact sheet; see build-footage.mjs
 * for what each one shows.
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

const P = (name: string) => \`bed-pool/\${name}\`;

const L = (
  file: string,
  startFrom: number,
  frames: number,
  extra: Omit<Bed, 'src' | 'startFrom' | 'span'> = {},
): Link => ({src: P(file), startFrom, frames, span: frames / 30, ...extra});

${decls}

export const CHAINS: Record<number, Link[]> = {
${out.join('\n\n')}
};

export const chain = (n: number): Link[] => CHAINS[n];
`;

writeFileSync('remotion/src/footage.ts', src);
console.log(`Wrote footage.ts - ${CUTS.length} scenes`);
if (shortfall.length) {
  console.log('\nSHORT - these scenes ran out of verified footage:');
  for (const s of shortfall) console.log(`  scene ${s.n}: need ${s.need}f, got ${s.got}f  (${s.prefs})`);
} else {
  console.log('no shortfall');
}
