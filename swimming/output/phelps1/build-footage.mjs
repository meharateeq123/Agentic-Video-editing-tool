// Writes remotion/src/footage.ts: for each scene, a chain of short bed links.
//
// Hard rules carried from every earlier film:
//   1. No link holds the screen for more than ~6.3s (190 frames, under BedChain's 210 cap).
//   2. No two links anywhere in the file draw on overlapping ranges of the same source clip.
//   3. A scene's footage is about the line it plays under - 100% relevancy. Every range below was
//      read off a timestamped contact sheet, and sources are split into per-scene keys wherever a
//      line names several things in order (the five sponsors, the three post-retirement projects),
//      so the allocator walks through them in the order the narrator says them.
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

const RIO = 'rio-medley-last-race.mp4';
const WAY = 'olympics-way-of-water.mp4';
const BEIJ = 'beijing2008-eight-golds.mp4';

// Usable ranges in seconds, each read off a contact sheet.
const SOURCES = {
  // Olympic Games, Rio 2016 men's 4x100 medley final - Phelps' last race. 8-24s is the start-list
  // graphic and is never used.
  RIOPOD1: {file: RIO, note: 'Phelps on the podium with the gold, smiling', usable: [[412, 424]]},
  RIOPOD3: {file: RIO, note: 'the relay team lined up for the ceremony', usable: [[384, 392]]},
  RIOCEL: {file: RIO, note: 'Phelps on deck after the race, waving to the crowd', usable: [[340, 360]]},
  RIOFLY3: {file: RIO, note: 'the race, Rio pool', usable: [[224, 228]]},
  RIOFLY: {file: RIO, note: 'the race, Rio pool', usable: [[240, 296]]},

  // Olympic Games, 15-year-old Phelps' first Olympic race, Sydney 2000 200m butterfly heat.
  SYD3: {file: 'sydney2000-first-race.mp4', note: 'Sydney 2000 blocks and race', usable: [[100, 104], [120, 150]]},

  // Olympic Games documentary "The Way of the Water": archival Phelps across every Games.
  WAYSYD: {file: WAY, note: 'teenage Phelps poolside at Sydney 2000', usable: [[40, 50]]},
  WAYARC6: {file: WAY, note: 'Phelps on the Athens 2004 podium, then smiling with medal', usable: [[128, 140], [236, 250]]},
  WAYRIO: {file: WAY, note: 'Phelps celebrating in the Rio pool, then his face at the wall', usable: [[654, 666], [712, 724]]},
  WAYBF: {file: WAY, note: 'Phelps swimming butterfly', usable: [[730, 770]]},

  // Olympic Games, all eight Beijing 2008 gold-medal races.
  BEIJR7: {file: BEIJ, note: 'Beijing 2008 race', usable: [[140, 150]]},
  BEIJF7: {file: BEIJ, note: 'Phelps roaring after the 4x100 free relay', usable: [[525, 537]]},
  BEIJR: {file: BEIJ, note: 'Beijing 2008 races', usable: [[330, 400]]},
  BEIJF: {file: BEIJ, note: 'Phelps on the podium / with medal', usable: [[300, 318], [750, 765], [1925, 1953]]},
  SPEEDO8: {file: BEIJ, note: 'Phelps racing in his Speedo cap, Beijing', usable: [[600, 610]]},

  // Paradise Valley, Arizona: Ants Drone 4K aerial. 0-33s carries burned-in place titles.
  PVD4: {file: 'paradise-valley-drone.mp4', note: 'Paradise Valley homes under the mountains', usable: [[45, 55]]},
  // "Current home ... mountain views" - the valley under Camelback, not the old house's photos.
  PVD2: {file: 'paradise-valley-drone.mp4', note: 'Camelback / Mummy Mountain over Paradise Valley', usable: [[96, 106]]},

  // The first Paradise Valley house - the listing photos from the 2016 purchase and 2018 sale.
  JUST4: {file: 'justsport-25m-mansion.mp4', note: 'the house exterior', usable: [[8, 14]]},
  JUST: {file: 'justsport-25m-mansion.mp4', note: 'rooms, pool, exterior of the house', usable: [[14, 88]]},
  // Only for "Phelps later sold that property" (~5s). The rest of scene 5 is about the CURRENT home,
  // so the old house's photos must not run under it. Cropped copy: the 12news.com bug is gone.
  NEWS5: {file: '12news-sells-pv-home-crop.mp4', note: '12 News: Phelps sells the old Paradise Valley home', usable: [[8, 13]]},

  // Bob Bowman hired at Arizona State (Sports360AZ).
  BOW: {file: 'bowman-asu-hire.mp4', note: 'Phelps and Bowman together; Bowman at ASU', usable: [[10, 13.5], [22, 26]]},
  BOW14: {file: 'bowman-asu-hire.mp4', note: 'Phelps and Bowman together', usable: [[56, 60]]},

  // Arizona State University: "Michael Phelps on his future with ASU" (ASU bug cropped off).
  ASUP5: {file: 'asu-phelps-future.mp4', note: 'the ASU pool in Tempe - "Arizona is simply home"', usable: [[6, 12.5]]},
  ASUP: {file: 'asu-phelps-future.mp4', note: 'ASU swimmers training', usable: [[12.5, 17], [63, 70], [84, 90]]},
  ASUI: {file: 'asu-phelps-future.mp4', note: 'Phelps and Bowman at the ASU pool', usable: [[18, 33], [57, 63], [78, 83]]},

  // Sponsors, in the order the narrator names them.
  UA8: {file: 'ua-rule-yourself-phelps.mp4', note: 'Under Armour "Rule Yourself" - Phelps training', usable: [[3, 9]]},
  UACOLD: {file: 'ua-rule-yourself-phelps.mp4', note: 'Phelps in the cold tub and cryo chamber', usable: [[27, 35]]},
  UA19: {file: 'ua-rule-yourself-phelps.mp4', note: 'Phelps training in the dark', usable: [[36, 50]]},
  OMEGA8: {file: 'omega-legends.mp4', note: 'OMEGA "Legends Inspire Legends"', usable: [[4, 12]]},
  VISA: {file: 'visa-8-medals.mp4', note: 'Visa Go World - Phelps', usable: [[2, 8]]},
  SUB: {file: 'subway-phelps.mp4', note: 'Subway ad with Phelps', usable: [[12, 18]]},

  // Mental health.
  TALK1a: {file: 'talkspace-therapy-saved.mp4', note: 'Talkspace x Phelps ad', usable: [[0, 10]]},
  TALK1b: {file: 'talkspace-therapy-saved.mp4', note: 'Talkspace x Phelps ad', usable: [[18, 30]]},
  TALK2: {file: 'talkspace-black-line.mp4', note: 'Talkspace x Phelps "The Black Line"', usable: [[0, 27]]},
  NBCDEP2: {file: 'nbc-depression.mp4', note: 'Phelps today, NBC interview', usable: [[6, 19]]},
  NBCDEP10: {file: 'nbc-depression.mp4', note: 'Phelps on his depression, NBC', usable: [[50, 60]]},
  NBCDEP20: {file: 'nbc-depression.mp4', note: 'Phelps today, NBC interview', usable: [[20, 30]]},
  TODAY9: {file: 'today-depression.mp4', note: 'Phelps on TODAY, 2017', usable: [[279, 290]]},
  TODAY10: {file: 'today-depression.mp4', note: 'Phelps on TODAY, 2017', usable: [[295, 310]]},
  TODAY13: {file: 'today-depression.mp4', note: 'Phelps on TODAY, 2017', usable: [[110, 125]]},
  HIMSS11: {file: 'himss22-keynote.mp4', note: 'Phelps on stage at HIMSS22', usable: [[153, 161], [204, 212]]},
  HIMSS18: {file: 'himss22-keynote.mp4', note: 'Phelps on stage at HIMSS22', usable: [[306, 314], [408, 416]]},
  HIMSS19: {file: 'himss22-keynote.mp4', note: 'Phelps on stage at HIMSS22', usable: [[612, 620], [714, 722]]},
  FOUND11: {file: 'foundation-water-safety.mp4', note: 'Phelps for the Michael Phelps Foundation: water safety', usable: [[0, 12]]},
  FOUND18: {file: 'foundation-water-safety.mp4', note: 'Phelps for the Michael Phelps Foundation', usable: [[12, 24]]},

  // Business.
  MPG: {file: 'mp-xceed-goggles.mp4', note: 'MP Michael Phelps XCEED goggles - swim, goggles, Phelps', usable: [[10, 37], [52, 58]]},

  // Broadcasts: NBC Nightly News, Paris 2024 (bottom banner cropped off).
  NBCNEXT2: {file: 'nbc-next-generation.mp4', note: 'Phelps in Paris, 2024', usable: [[50, 56]]},
  NBCNEXT: {file: 'nbc-next-generation.mp4', note: 'Phelps in Paris, 2024', usable: [[10, 21], [28, 36]]},
  NBCKIDS: {file: 'nbc-next-generation.mp4', note: 'young fans with Phelps, Paris 2024', usable: [[22, 28]]},

  // Family.
  BRIDE: {file: 'brides-wedding.mp4', note: 'Brides: Phelps and Nicole Johnson wedding film', usable: [[0, 14]]},
  ETB: {file: 'et-baby-announcement.mp4', note: 'ET: Nicole and Michael, baby Boomer photos (ET bug cropped)', usable: [[8, 15], [20, 27]]},
  KCS15: {file: 'family-kids-choice-2018.mp4', note: 'Phelps, Nicole and Boomer, Kids Choice Sports 2018', usable: [[2, 22]]},
  KCS16: {file: 'family-kids-choice-2018.mp4', note: 'Phelps, Nicole and Boomer', usable: [[28, 46]]},
  SONS16: {file: 'paris2024-four-sons.mp4', note: 'family photos: Phelps with his sons', usable: [[6, 30]]},
  SONS18: {file: 'paris2024-four-sons.mp4', note: 'family photos: Phelps with his sons', usable: [[33, 45]]},
  SONS19: {file: 'paris2024-four-sons.mp4', note: 'family photos', usable: [[45, 56]]},

  // Cars and recovery.
  CAD: {file: 'cadillac-escalade.mp4', note: 'Cadillac Escalade', usable: [[0, 5], [12, 18]]},
  BMW: {file: 'bmw-7-series.mp4', note: 'BMW 7 Series', usable: [[44, 50], [79, 90]]},
  COLD: {file: 'masterspas-cold-tub.mp4', note: 'cold plunge tub', usable: [[8, 11.5], [36, 47]]},
};

// Per scene: which sources may carry it, in the order the line names things.
const PLAN = {
  1: ['RIOPOD1', 'RIOCEL'], // 28 medals, 23 gold ... walked out of the pool for the last time
  2: ['NBCNEXT2', 'NBCDEP2'], // what life looks like, nearly a decade on
  3: ['RIOFLY3', 'SYD3', 'WAYSYD', 'RIOPOD3'], // retired after Rio; 15 in Sydney, 31 in Rio
  4: ['PVD4', 'JUST4', 'BOW', 'JUST'], // Paradise Valley; the 2015 house; Bowman at ASU; the rooms
  5: ['NEWS5', 'PVD2', 'ASUP5'], // sold it; the current home, mountain views; Arizona is home
  6: ['WAYARC6', 'BEIJF'], // net worth; medal bonuses are a small fraction
  7: ['BEIJR7', 'BEIJF7', 'BEIJR'], // eight golds in Beijing, the bonuses
  8: ['UA8', 'OMEGA8', 'VISA', 'SUB', 'SPEEDO8'], // Under Armour, Omega, Visa, Subway, Speedo
  9: ['TODAY9'], // the most interesting part is not the money
  10: ['TALK1a', 'NBCDEP10', 'TODAY10', 'TALK2'], // Talkspace 2018; depression; advocacy
  11: ['HIMSS11', 'FOUND11', 'TALK1b'], // HIMSS 2022; the Foundation; 2024 Talkspace deal
  12: ['MPG', 'ASUP'], // MP by Michael Phelps
  13: ['NBCKIDS', 'NBCNEXT', 'TODAY13'], // commentator; a new generation of fans
  14: ['ASUP', 'ASUI', 'BOW14'], // volunteer coach at ASU with Bowman
  15: ['BRIDE', 'ETB', 'KCS15'], // Nicole Johnson; four sons
  16: ['SONS16', 'KCS16'], // parenting as a training block
  17: ['CAD', 'BMW', 'UACOLD', 'COLD'], // Escalade, 7 Series, cold plunge
  18: ['SONS18', 'FOUND18', 'HIMSS18'], // sons, foundation, asking for help
  19: ['UA19', 'SONS19', 'HIMSS19'], // 5 a.m. discipline; family, business, advocacy
  20: ['WAYRIO', 'NBCDEP20'], // the question to viewers
  21: ['WAYBF', 'RIOFLY'], // greatness in the pool; what comes after
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
  if (got < need) shortfall.push({n, need, got, prefs: PLAN[n].join('/')});
  const body = links
    .map((l, i) => {
      const kv = Object.entries(MOVES[i % MOVES.length]).map(([a, b]) => `${a}: ${b}`).join(', ');
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
