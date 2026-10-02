// Writes remotion/src/footage.ts: for each scene, a chain of short bed links.
//
// Two hard rules from every earlier film:
//   1. No link holds the screen for more than ~6.3s (190 frames, under BedChain's 210 cap).
//   2. No two links anywhere in the file draw on overlapping ranges of the same source clip.
//
// And the rule that matters most: a scene's footage has to be about the line it plays under. Each
// scene names the sources it may draw from, best first, and every source lists only seconds that
// were checked on a timestamped contact sheet. Two earlier passes of this file got that wrong in
// ways only the sheets exposed — a studio desk under Singapore lines, Ariana Kukors under a Ye
// Shiwen line, and the 400m freestyle under "then came the 200 butterfly" — so a range goes in
// here only after it has been seen, and a compilation is split into one source per race.
//
//   node build-footage.mjs          strict: short scenes are reported, never padded
//   node build-footage.mjs --fill   preview only: pads short scenes with re-used ranges, marked
//                                   PLACEHOLDER, which must be gone before a render

import {readFileSync, writeFileSync} from 'node:fs';

const FPS = 30;
const OVERLAP = 16;
const MAX_LINK = 190;
const MIN_LINK = 45; // shorter than ~1.5s reads as a glitch rather than a cut

const tl = readFileSync('remotion/src/timeline.ts', 'utf8');
const CUTS = [...tl.matchAll(/\{n: (\d+), start: ([\d.]+), end: ([\d.]+)\}/g)].map((m) => ({
  n: +m[1],
  start: +m[2],
  end: +m[3],
}));
const sceneFrames = (n) =>
  Math.round(CUTS[n - 1].end * FPS) - Math.round(CUTS[n - 1].start * FPS);
const mountedFrames = (n) => sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

// Usable ranges in seconds, each one read off a timestamped contact sheet. `extra` is a per-source
// bed setting that always wins over the cycled camera move.
//
// This film reuses three files straight from yuzidi1 (yu-relay-medal.mp4, which yuzidi1 never
// actually referenced in its PLAN; a ~2.5s sliver of li-bingjie.mp4 past what it used; and two
// untouched seconds of china-swim-training.mp4) — copied into remotion/public/bed-pool/ alongside
// this film's own fresh downloads by copy-footage.ps1. Every `file` below is a bare filename that
// must exist directly under bed-pool/, same as the rest of this pipeline.
const SOURCES = {
  // --- Fresh: Yu Zidi at the June 2026 Chinese National Championships (寿仙谷·2026年全国游泳冠军赛),
  // all from the same broadcast/channel (体育心知晓), each confirmed by the meet's own on-screen
  // watermark and Yu's lane board ("于子迪 河北泰华"). ---
  N4F: {
    file: 'gcfvVVhW4Gs.mp4',
    // Women's 400m freestyle final. Reaction PiP badge sits top-right only; race fills the rest.
    usable: [[8, 130]],
  },
  N4IM: {
    file: 'Rf-nNlD3pDs.mp4',
    // Women's 400m IM final, her 4:30.79. Badge top-right only.
    usable: [[8, 140]],
  },
  N2FLY: {
    file: 'jFOJZBx2uKI.mp4',
    // Women's 200m butterfly final, her 2:06.12. Badge top-right only.
    usable: [[8, 120]],
  },

  // --- Fresh: the 2026 Asian Games, Aichi-Nagoya. ---
  AGP: {
    file: 'ySR_MIHMgyk.mp4',
    // The Games' own "Welcome to Aichi-Nagoya" promo: a lap pool at 18-22s, the stadium and city
    // beyond that. 0-8s is a sponsor card / glitch-transition intro, skipped.
    usable: [[8, 60]],
  },
  AGK: {
    file: '3QJGhFRzNfs.mp4',
    // KBS News on South Korea's swim team training for these Games (Kim Woo-min, Hwang Sun-woo):
    // pool training, dryland, sit-down interviews under their name supers. Skips 0-8s (anchor
    // intro) and the closing app-download card (200s+).
    usable: [[8, 200]],
  },
  AGN: {
    file: 'YMHX7f2OsCE.mp4',
    // Arirang's "2026 Asian Games D-1" segment: the flag-bearing team walkout (70-95s), a
    // "Hwang Sun-woo, Swimmer, Team Korea" interview (200-215s), and Nagoya/Korea House exteriors
    // (255-300s). The anchor desk and the full-screen schedule graphic (105-195s) are skipped.
    usable: [
      [68, 98],
      [198, 218],
      [255, 300],
    ],
  },

  // --- Reused from yuzidi1's downloads, on ranges it never touched. ---
  RELAY: {
    file: 'yu-relay-medal.mp4',
    // The 4x200 free relay Yu swam the heats of — ready room and poolside under the OMEGA graphic
    // (Yu is the swimmer circled at 0:24/0:54/1:24/1:48), then her own 200 free leg from 2:12.
    // yuzidi1 never referenced this file at all, so the whole thing is fair game.
    usable: [[0, 140]],
  },
  // CT (china-swim-training.mp4) and LB (li-bingjie.mp4) were dropped: both carry a CHINADAILY/
  // CGTN bug that yuzidi1's notes claimed was cropped off, but a fresh still at 0:03 and 0:30.5
  // showed it's still burned into the frame — so neither is clean footage, and NG26/RELAY cover
  // the same beats instead.
  // NG26: recap footage of Yu's Nov 2025 National Games golds, from a channel other than yuzidi1's
  // CGTN sources — used only as general "her results kept climbing" B-roll, never under a line
  // naming a specific number from that meet (the specific 200 IM Asian record has no fresh footage
  // available, so that line runs over this general footage rather than over a mislabeled race).
  NG26: {
    file: 'ho_TV85m72A.mp4',
    // A wall-to-wall pool/podium/results recap of Nov 2025 National Games swimming — verified clean
    // (real broadcast footage, small corner logo only) across several spot-checks. Used generically
    // ("her results kept climbing"), never under a line naming a specific number from that meet.
    usable: [[15, 540]],
  },
};

// Per scene: which sources may carry it, best first.
const PLAN = {
  1: ['NG26', 'RELAY'], // a year ago, finished fourth three times; now 13, biggest test yet
  2: ['RELAY', 'NG26'], // the youngest medalist in WAC history
  3: ['NG26'], // the water park accident, Li Bingjie the mentor
  4: ['NG26'], // signs she was different, a name to watch in China
  5: ['NG26'], // Singapore debut, 200 IM, 12yo, into the final 7th
  6: ['RELAY'], // the relay heats, the bronze, youngest medalist
  7: ['NG26'], // fourth in the 400 IM and 200 fly, fractions of a second
  8: ['NG26'], // the age-14 rule and her exception
  9: ['NG26'], // 2:11.90, faster than the boys' record
  10: ['NG26', 'N4IM', 'N2FLY', 'N4F'], // Nov 2025 Asian record; June 2026 Nationals treble
  11: ['N4F', 'N4IM'], // domestic competition vs. what's next
  12: ['N4IM', 'N2FLY', 'N4F'], // eighth all-time context, lifetime bests across the board
  13: ['AGP'], // the 2026 Asian Games begin in Aichi
  14: ['AGN', 'AGP'], // stakes are different, a known quantity now
  15: ['NG26', 'AGN'], // the pressure question, her own words on perseverance
  16: ['AGK', 'AGN'], // underdog to favorite, the real dividing line
  17: ['AGP', 'AGN'], // the path to Los Angeles 2028
  18: ['AGK', 'AGN'], // the field: Japan, South Korea, Olympic experience
  19: ['AGN', 'AGP'], // genuinely uncertain
  20: ['N4F', 'AGP'], // drop your prediction
  21: ['N4IM', 'N2FLY', 'AGP'], // subscribe, what comes next
};

// Remaining unused seconds per source, consumed left to right. Sources that share a file never
// share a range, so they cannot collide.
const cursor = {};
for (const k of Object.keys(SOURCES)) cursor[k] = SOURCES[k].usable.map(([a, b]) => ({a, b}));

/** Take up to `frames` from source `k`, or null if it has nothing left. */
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

const FILL = process.argv.includes('--fill');

const MOVES = [{driftX: 0.5}, {zoom: 1.05}, {driftX: -0.5}, {zoom: 1.04, driftX: 0.4}];

const out = [];
const shortfall = [];
const usedFiles = new Set();

for (const {n} of CUTS) {
  const need = mountedFrames(n);
  const prefs = PLAN[n];
  const links = [];
  let got = 0;
  let guard = 0;

  while (got < need && guard++ < 40) {
    const want = Math.min(MAX_LINK, need - got);
    let piece = null;
    for (const k of prefs) {
      piece = take(k, want);
      if (piece) break;
    }
    if (!piece) break;
    links.push(piece);
    got += piece.frames;
  }

  // --fill: pad from the first preferred source that has any range, so a preview plays end to end.
  // Knowingly re-uses footage another scene already took, so every padded link is PLACEHOLDER.
  if (got < need && FILL) {
    const k = prefs.find((p) => SOURCES[p].usable.length);
    if (k) {
      links.push({k, startFrom: SOURCES[k].usable[0][0], frames: need - got, fill: true});
      got = need;
    }
  }

  if (got < need) shortfall.push({n, need, got, prefs: prefs.join('/')});
  for (const l of links) usedFiles.add(SOURCES[l.k].file);

  const body = links
    .map((l, i) => {
      const extra = {...MOVES[i % MOVES.length], ...(SOURCES[l.k].extra ?? {})};
      const kv = Object.entries(extra)
        .map(([a, b]) => `${a}: ${b}`)
        .join(', ');
      const mark = l.fill ? ' // PLACEHOLDER - re-used range, replace before render' : '';
      return `    L(${l.k}, ${l.startFrom}, ${l.frames}, {${kv}}),${mark}`;
    })
    .join('\n');

  out.push(`  // ${n} (${need}f) - ${CUTS[n - 1].start.toFixed(2)}s\n  ${n}: [\n${body}\n  ],`);
}

// Only declare sources a chain actually uses, so TypeScript never sees an unused constant and a
// source with no ranges yet (M4IM) does not reference a file that isn't in bed-pool.
const usedKeys = new Set(out.join('\n').match(/L\((\w+),/g)?.map((m) => m.slice(2, -1)) ?? []);
const decls = Object.entries(SOURCES)
  .filter(([k]) => usedKeys.has(k))
  .map(([k, s]) => `const ${k} = '${s.file}';`)
  .join('\n');

const src = `/**
 * Scene -> chain of bed clips. Generated by build-footage.mjs - regenerate, don't hand-edit, so the
 * no-overlap guarantee holds.
 *
 * Rules:
 *   1. No link holds the screen for more than ~6.3s (190 frames, under BedChain's 210 cap).
 *   2. No two links draw on overlapping ranges of the same source.
 *   3. A scene's footage is about the line it plays under. Every source lists only seconds that
 *      were checked on a timestamped contact sheet, and the McIntosh compilation is split one
 *      source per race. See build-footage.mjs for what each range is and what was left out.
 *
 * Sources — fresh downloads unless noted, see build-footage.mjs SOURCES for exactly which seconds
 * and why:
 *   N4F   gcfvVVhW4Gs.mp4      June 2026 China Nationals, Yu's 400m free final
 *   N4IM  Rf-nNlD3pDs.mp4      June 2026 China Nationals, Yu's 400m IM final (4:30.79)
 *   N2FLY jFOJZBx2uKI.mp4      June 2026 China Nationals, Yu's 200m fly final (2:06.12)
 *   AGP   ySR_MIHMgyk.mp4      Asian Games Aichi-Nagoya's own "Welcome" promo
 *   AGK   3QJGhFRzNfs.mp4      KBS News, South Korea's swim team training for the Games
 *   AGN   YMHX7f2OsCE.mp4      Arirang News, "2026 Asian Games D-1"
 *   RELAY yuzidi1/dl/yu-relay-medal.mp4   the 4x200 free relay heats — reused, yuzidi1 never used it
 *   LB    yuzidi1/dl/li-bingjie.mp4       Li Bingjie — reused, 2.5s past what yuzidi1 used
 *   CT    yuzidi1/dl/china-swim-training.mp4  general training B-roll — reused, outside its window
 *   NG26  ho_TV85m72A.mp4      Nov 2025 National Games recap — general B-roll only, never under a
 *                              line naming a specific number from that meet
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
console.log(`Wrote footage.ts - ${CUTS.length} scenes${FILL ? ' (--fill preview)' : ''}`);
for (const k of Object.keys(SOURCES)) {
  const left = cursor[k].reduce((t, r) => t + Math.max(0, r.b - r.a), 0);
  console.log(`  ${k.padEnd(4)} ${left.toFixed(1)}s unused`);
}
console.log(`\nfiles referenced: ${[...usedFiles].join(', ')}`);
if (shortfall.length) {
  console.log('\nSHORT - these scenes ran out of verified footage:');
  for (const s of shortfall) {
    console.log(`  scene ${s.n}: need ${s.need}f, got ${s.got}f  (${s.prefs})`);
  }
}
