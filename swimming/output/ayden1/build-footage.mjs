// Writes remotion/src/footage.ts: for each scene, a chain of short bed links.
//
// Hard rules carried from every earlier film:
//   1. No link holds the screen for more than ~6.3s (190 frames, under BedChain's 210 cap).
//   2. No two links anywhere in the file draw on overlapping ranges of the same source clip.
//   3. A scene's footage is about the line it plays under.
//   4. Nothing here was used in phelps1, yuzidi1 or records2026.
//
// The footage problem on this film: there is no public video of Ayden Tan's 2026 swims at all.
// His own channel holds four full races, all uploaded June 2022, and each opens with the family's
// own burned-in label ("Ayden Tan / 100 LCM back, May 2022") and a red circle around him on the
// blocks - which is also the only in-frame proof of which swimmer he is. The 400 free adds a
// scoreboard that reads "Tan, Ayden". Everything else available is his club (San Ramon Valley
// Aquatics) and its head coach. So: his races carry the swimming lines, the club footage carries
// the club lines, and every 2026 number lives in a card - no shot is ever captioned as a 2026 swim.
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

const BACK = 'sT8zCEMRgfY.mp4'; // Ayden Tan Swimming, his 100 LCM backstroke
const FLY = '6lkV09kL1Vw.mp4'; // Ayden Tan Swimming, his 100 LCM butterfly
const FREE2 = 'HnAUHW9INrs.mp4'; // Ayden Tan Swimming, his 200 SCY freestyle (championship venue)
const FREE4 = 'rsHPmNv3OJU.mp4'; // Ayden Tan Swimming, his 400 LCM freestyle
// SwimSwam's interview with SRVA head coach David Tambuwun (May 2026), baked as a tighter crop
// (crop=780:439:270:80) so the sponsor backdrop behind him is mostly out of frame.
const COACH = 'coach-tight.mp4';
const CLUB = 'icgfCFeqexk.mp4'; // Team SRVA Swimming's own club film, San Ramon's outdoor pool
const MEET = 'OyX0HoQyesI.mp4'; // an SRVA meet, a full heat of boys off the blocks
// Baked crop (crop=760:428:430:0) of the 400 free's results board at 61-67s and 183-190s, so the
// heat list is readable: "Heat 3 Mixed 400 Free ... 7 Tan, Ayden BC". This is the film's only
// in-frame proof of who the swimmer is, and it also fixes his lane at 7.
const BOARDZ = 'board-zoom.mp4';

// Usable ranges in seconds, each read off a timestamped contact sheet (sheets/).
const SOURCES = {
  BACK: {
    file: BACK,
    note: 'his backstroke race, start to finish',
    usable: [[3, 69]],
  },
  FLY: {
    file: FLY,
    note: 'his butterfly race',
    usable: [[3, 62]],
  },
  FREE2: {
    file: FREE2,
    note: 'his 200 freestyle at a championship pool, crowd in the foreground',
    usable: [[3, 108]],
  },
  FREE4: {
    file: FREE4,
    note: 'his 400 freestyle, the long grind',
    usable: [[14, 58], [70, 178], [196, 266]],
  },
  BOARD: {
    file: BOARDZ,
    note: 'the results board, zoomed - "7 Tan, Ayden" in the heat list',
    usable: [[0.3, 12.7]],
  },
  COACH: {
    file: COACH,
    note: 'San Ramon Valley Aquatics head coach David Tambuwun',
    usable: [[2, 47], [57, 88]],
  },
  CLUB: {
    file: CLUB,
    note: "San Ramon Valley Aquatics' own pool and swimmers",
    // Live action only, and only the windows with no burned-in cartoon caption. The club film keeps
    // cutting to sepia comic panels and speech bubbles ("SMASH", "HAPPY... COACH", "ASTONISHING!!!"),
    // so these eight windows are what is left, read off sheets/club-a.jpg and club-b.jpg at 1s steps.
    // Each window also stops ~1s before the next caption appears, because a link's last frames
    // bleed into the scene overlap.
    usable: [
      [39, 41.5],
      [45, 47.5],
      [51, 53.5],
      [85, 87],
      [90, 91.5],
      [96, 98],
      [101, 102.5],
    ],
  },
  MEET: {
    file: MEET,
    note: 'a heat of older boys off the blocks at an SRVA meet',
    usable: [[3, 15], [18, 29]],
  },
};

// Which footage each scene draws on, in order. FREE4 is the deep well, so it backs up most scenes.
const PLAN = {
  1: ['FREE2', 'BACK'], //            a 12-year-old broke seven national age group records
  2: ['BOARD', 'FLY'], //             Ayden Tan just answered that question
  3: ['BACK', 'FREE4'], //            twelve records across two brackets
  4: ['MEET', 'FREE2'], //            boys who are bigger, stronger, further into puberty
  5: ['BACK', 'FREE4'], //            Roseville, the 50 yard backstroke
  6: ['BACK', 'FREE2'], //            22.94 - he beat a final of high schoolers
  7: ['BACK', 'FLY'], //              49.25, 18th all-time
  8: ['FLY', 'FREE4'], //             51.11 a year earlier
  9: ['BACK', 'BOARD', 'FREE4'], //   49.40, fastest 13-year-old ever
  10: ['FREE4'], //                   records fall by tenths
  11: ['FREE2', 'FREE4'], //          100 free 53.90 from 54.91
  12: ['BACK', 'FREE4'], //           50 back 27.54 from 28.86
  13: ['FREE4', 'FLY'], //            technique and physical development together
  14: ['BOARD', 'FREE4'], //          six of seven consecutive weekends
  15: ['FREE2', 'FREE4'], //          meets stacked through the year
  16: ['FLY', 'FREE4'], //            beating kids his own age by wide margins
  17: ['MEET', 'FREE2', 'FREE4'], //  now racing swimmers up to two years older
  18: ['FREE4'], //                   he can compete against older swimmers
  19: ['MEET', 'FREE4'], //           a growth spurt can erase a second
  20: ['FREE4'], //                   opening distance on his own age group
  21: ['CLUB', 'COACH'], //           he trains with San Ramon Valley Aquatics
  22: ['CLUB', 'FREE4'], //           a swimming family
  23: ['COACH', 'CLUB'], //           swimmers change teams and coaches
  24: ['COACH', 'CLUB', 'FREE4'], //  he stayed with the same program
  25: ['FLY', 'FREE4'], //            range across strokes and distances
  26: ['FLY', 'FREE4'], //            backstroke, freestyle, butterfly, IM
  27: ['FREE4'], //                   puberty changes bodies unpredictably
  28: ['FREE4'], //                   improving technically as margins shrink
  29: ['FREE4', 'BACK'], //           times dropping by full seconds
  30: ['FREE2', 'FREE4'], //          the one-event specialist
  31: ['BOARD', 'FREE4'], //          top 20 all-time in his new age group
  32: ['FREE4'], //                   results keep climbing
  33: ['FREE2', 'FREE4'], //          does he keep climbing?
  34: ['FREE2', 'FREE4', 'BACK'], //  the fastest 13-year-old is just getting started
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
 * for what each one shows and why this film's footage pool is what it is.
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
