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
const SOURCES = {
  IM: {
    file: 'wa-200im-final.mp4',
    // World Aquatics, women's 200m IM final, Singapore 2025 — the race Yu finished fourth in. Race
    // and the names board only; 48-53s is McIntosh alone celebrating and 54s is the end card.
    usable: [[0.5, 47]],
  },
  AR: {
    file: 'cgtn-asianrecord.mp4',
    // CGTN, Yu's 2:07.41 Asian record at the 2025 National Games: walkout under the
    // "4 于子迪 河北" lower-third, race, the two swimmers at the wall, results board (43-47s).
    usable: [[0.5, 47.5]],
  },
  NG: {
    file: 'cgtn-nationalgames.mp4',
    // CGTN, Yu's golds at the same meet. Opens on the 于子迪 400m IM 4:34.33 gold graphic, race to
    // 49s, wall to 55s, results board to 61s.
    usable: [[0.5, 61]],
  },
  LB: {
    file: 'li-bingjie.mp4',
    // CGTN news package, re-baked with the bottom news ticker and the CGTN bug cropped off. Only
    // 0-29s is Li Bingjie; from 32s it is a different swimmer's 100 free.
    usable: [[0.5, 29.5]],
  },
  KL: {
    file: 'ledecky-800-sg.mp4',
    // World Aquatics, Ledecky's 800 free title in Singapore: race, names board, her celebration.
    // 58s is the end card.
    usable: [[0.5, 57]],
  },
  YS: {
    file: 'ye-shiwen-london.mp4',
    // Olympic Games channel, London 2012 200m IM. Starts at 10s on purpose: 4-10s is Ariana Kukors
    // (USA) walking out under her own name graphic. 10-15s is Ye's walkout ("Shiwen Ye CHN"), then
    // the race, Ye at the wall under "YE SHIWEN 2:07.57" (58-59s), the medal and the podium. From
    // 72s it is Coutts' and Leverenz's interviews, not Ye.
    usable: [[10, 72]],
  },

  // World Aquatics' compilation of every Summer McIntosh medal at Singapore, split one source per
  // race so a line about one final can never pull footage from another.
  MF4: {
    file: 'wa-mcintosh-medals.mp4',
    // Women's 400m freestyle final: McIntosh 1st, Li Bingjie 2nd, Ledecky 3rd. Start list at 20s,
    // race to the finish board at 263s. Yu did not swim it.
    usable: [[15, 263]],
  },
  MIM: {
    file: 'wa-mcintosh-medals.mp4',
    // Women's 200m IM final — Yu's race. Start list at 284-294s reads YU lane 1, then the race to
    // the result board at 422s.
    usable: [[284, 422]],
  },
  MFL: {
    file: 'wa-mcintosh-medals.mp4',
    // Women's 200m butterfly final — Yu's race. Start list at 510s reads YU lane 8. The download
    // ends at 598s, mid-race; the rest is in wa-mcintosh-medals-2.mp4.
    usable: [[505, 598]],
  },
  MCC: {
    file: 'wa-mcintosh-medals.mp4',
    // McIntosh herself: walkout and close-ups (0-12s), then after the 200 IM on the lane rope,
    // under "SUMMER McINTOSH 2:06.69", and with the Canadian flag (433-503s). The coach reaction at
    // 430s and 275s is left out.
    usable: [
      [0.5, 12],
      [433, 503],
    ],
  },
  M4IM: {
    file: 'wa-mcintosh-medals-2.mp4',
    // Women's 400m IM final — Yu's third fourth place. Not in the first 600s of the compilation;
    // ranges go in once the second part has been downloaded and mapped.
    usable: [],
  },

  SG: {
    file: 'wa-singapore-highlights.mp4',
    // World Aquatics' Singapore wrap. The opening 0-24s is a promo montage cutting every second
    // with split screens and footage from earlier championships (Fukuoka 2023), and most of the
    // rest is a studio desk — so only the Singapore pool, podium and relay stretches are listed.
    usable: [
      [238, 253],
      [256, 262],
      [300, 318],
      [350, 371],
      [392, 398],
    ],
  },
  HP: {
    file: 'cgtn-heat-pool.mp4',
    // CGTN, a packed Chinese pool in a heatwave — the water-park summer the story starts in.
    // CGTN burns captions into most shots; these windows were read off a half-second map, because
    // a two-second map let "This isn't a bowl of Fruit Loops" through.
    usable: [
      [4.6, 6.4],
      [22.5, 25.3],
      [29.6, 31.2],
      [43, 51.5],
    ],
  },
  CT: {
    file: 'china-swim-training.mp4',
    // China Daily, Chinese swimmers in training. Re-baked with its decorative frame and the
    // CHINADAILY bug cropped off (crop=414:233:36:65 at source), which leaves it soft — kept to the
    // training beats only. Replaces a Beijing swim-school clip whose promoter badge moves between
    // shots and could not be cropped out.
    usable: [
      [9, 42],
      [44, 62],
    ],
  },
  IT: {
    file: 'itv-sports-schools.mp4',
    // ITV News inside a Chinese sports school. Mostly gymnastics and interviews; only the swimming
    // stretch is listed.
    usable: [
      [28, 35],
      [39, 43.5],
    ],
  },
};

// Per scene: which sources may carry it, best first.
const PLAN = {
  1: ['IM', 'MIM'], // the photo from Singapore, the girl behind the blocks
  2: ['IM', 'MIM'], // "She is twelve years old."
  3: ['AR', 'NG'], // the record still to come
  4: ['NG', 'AR'], // her name, Baoding
  5: ['HP', 'IT', 'CT'], // the heatwave, the water park
  6: ['IT', 'CT'], // "That question changed everything."
  7: ['IT', 'CT'], // swim class, the Hebei club
  8: ['MF4', 'MIM'], // the age rule for Worlds
  9: ['MF4', 'SG'], // beating the qualifying standard
  10: ['NG', 'AR'], // nationals, 2:10.63
  11: ['MF4'], // the Paris attempt, two seconds at eleven
  12: ['IM', 'MIM'], // "She earned her lane."
  13: ['LB', 'MF4', 'MCC'], // Li Bingjie (the 400 free she took silver in); McIntosh the role model
  14: ['MF4', 'SG'], // "Now, Singapore."
  15: ['MCC', 'KL', 'MF4'], // McIntosh breaking records, Ledecky
  16: ['MIM', 'IM'], // youngest ever into a final
  17: ['MIM', 'IM'], // here to fight for a medal
  18: ['IM', 'MIM'], // fourth, by six hundredths
  19: ['MFL'], // the 200 butterfly
  20: ['M4IM', 'NG'], // the 400 medley — falls back to Yu's own 400 IM (National Games) until M4IM is mapped
  21: ['MIM', 'MFL', 'M4IM'], // three finals, three fourths
  22: ['SG', 'MF4'], // not a heartbreak story
  23: ['SG', 'MF4'], // the relay
  24: ['SG', 'MF4'], // youngest medallist in 89 years
  25: ['KL', 'MF4', 'SG'], // leaving Singapore, no signature swim yet
  26: ['AR'], // "Remember I promised you a number."
  27: ['AR', 'NG'], // National Games, Shenzhen
  28: ['AR'], // 2:07.41
  29: ['YS'], // Ye Shiwen's record, London 2012
  30: ['MCC', 'YS', 'MF4'], // behind only McIntosh; ninth of all time
  31: ['AR', 'NG'], // say the number again
  32: ['NG', 'AR'], // best junior in the world
  33: ['MF4', 'NG'], // what happens next
  34: ['MF4', 'KL', 'SG'], // Los Angeles 2028
  35: ['NG', 'MF4'], // barely a beginning
  36: ['MF4', 'NG', 'AR'], // the close
  37: ['AR', 'NG', 'MF4'], // ceiling or warning shot
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
 * Sources, all downloaded fresh for this film:
 *   IM   wa-200im-final.mp4        World Aquatics, women's 200m IM final, Singapore (Yu 4th)
 *   AR   cgtn-asianrecord.mp4      CGTN, Yu's 2:07.41 Asian record, 2025 National Games
 *   NG   cgtn-nationalgames.mp4    CGTN, Yu's golds at the same meet
 *   LB   li-bingjie.mp4            CGTN, Li Bingjie (ticker cropped off; first 29s only)
 *   KL   ledecky-800-sg.mp4        World Aquatics, Ledecky's 800 free title, Singapore
 *   YS   ye-shiwen-london.mp4      Olympic Games, Ye Shiwen's 200m IM gold, London 2012 (10-72s)
 *   MF4  wa-mcintosh-medals.mp4    400m free final (McIntosh, Li Bingjie, Ledecky)
 *   MIM  wa-mcintosh-medals.mp4    200m IM final (Yu lane 1)
 *   MFL  wa-mcintosh-medals.mp4    200m butterfly final (Yu lane 8)
 *   MCC  wa-mcintosh-medals.mp4    McIntosh's walkout, close-ups and flag celebrations
 *   M4IM wa-mcintosh-medals-2.mp4  400m IM final (Yu 4th) - pending download
 *   SG   wa-singapore-highlights   Singapore pool, podium and relay stretches only
 *   HP   cgtn-heat-pool.mp4        CGTN, packed Chinese pool in a heatwave (caption-free windows)
 *   CT   china-swim-training.mp4   China Daily, Chinese swimmers training (frame and bug cropped off)
 *   IT   itv-sports-schools.mp4    ITV, Chinese sports school - swimming stretch only
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
