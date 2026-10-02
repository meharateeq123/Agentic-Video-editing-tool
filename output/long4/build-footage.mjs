// Generates remotion/src/footage.ts for long4 (Hocevar punches Blaney twice; NASCAR's no-penalty call).
// Same rules as every prior film: no link over ~7s, no two links sharing an overlapping range of the
// same source, every clip matched to its line. Several sources (GI/FC/HL/ND/NF/FS/AT/BT/GR) were
// already used in output/long3 (same Bristol race) - every range below was checked against long3's
// final remotion/src/footage.ts and picked from what that film left free, so no footage range is
// reused across the two films.
import {readFileSync, writeFileSync} from 'node:fs';

const FPS = 30;
const MAX_LINK = 200;
const OVERLAP = 16;

const CUTS = JSON.parse(readFileSync('cuts.json', 'utf8'));
const startFrame = (n) => Math.round(CUTS[n - 1].start * FPS);
const endFrame = (n) => Math.round(CUTS[n - 1].end * FPS);
const sceneFrames = (n) => endFrame(n) - startFrame(n);
const mountedFrames = (n) => sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

const GI = 'gi.mp4'; //  NASCAR official, "Carson Hocevar, Ryan Blaney Get Into It at Bristol" (MsJuBKfoTrs) - same
                      //  source as long3's GI. That film used 0-150 (incl. its hook) and 199-345; this film's
                      //  hook uses 150.5-160.5 and everything else below sits in the 150-199/160.5-199 gap it left.
const FC = 'fc.mp4'; //  NASCAR on FOX (zucbKmYLL4Y), same source as long3's FC. That film used ~240-341 and a
                      //  couple of small slivers; this film's hook + scenes use 130-240 (its own interview cut
                      //  and analyst call), which long3 never touched.
const HL = 'hl.mp4'; //  NASCAR official Bristol highlights (1iatULgMcRU), same source as long3's HL. Long3's
                      //  ranges cluster around 0-135, 560-920, 1000-1350 and 1480-1620; this film stays inside
                      //  135-560 and 620-1000, fresh territory.
const ND = 'nd.mp4'; //  NASCAR official, "What Drivers Said After Bristol" (YEXOSSOhm9o), same source as long3's
                      //  ND. Long3 used 0-38, 90-121 and 279-482; this film uses Hocevar's own segment outside
                      //  that (121-147) and Larson/Hamlin's untouched stretches.
const FS = 'fs.mp4'; //  Frontstretch, Blaney after the wreck (PlPoyosi_g4), same source as long3's FS. Long3
                      //  used 6-40 and 77-88; this film uses the free 40-77 window, which has the "I just felt
                      //  like he didn't lift... protected the bottom... wrecked me" quote almost verbatim.
const HP = 'hp.mp4'; //  Kevin Harvick's Happy Hour, "EXCLUSIVE: Steve O'Donnell on Carson Hocevar vs. Ryan
                      //  Blaney" (pMWF2AJftyk) - fresh source, never used in any earlier film. O'Donnell's real
                      //  quotes: the "weapon/right hook" line at 121-144s, the "handle their own business /
                      //  passion" line at 145-166s (also repeats near 0-15s).
const KH = 'kh.mp4'; //  NASCAR official, "NASCAR Cup Series Highlights | 2026 Kansas Speedway" (M_N_08SXrzg) -
                      //  fresh source, this weekend's actual venue for the story's final beat.
const ED = 'ed.mp4'; //  "Carl Edwards WRECKS Brad Keselowski - 2010 Kobalt Tools 500... at Atlanta" (Defined
                      //  Fate, G7lfK7IOmk4) - fresh source, real archival footage of the 2010 incident
                      //  O'Donnell references. Stays inside 0-75s (a green-screen/ad break follows after that).
const CQ = 'cq.mp4'; //  NASCAR official, Ross Chastain's real quote on the 2023 Gragson incident, "we have a
                      //  no push policy here at Trackhouse" (6WvBN1gI504) - fresh source.
const HP2 = 'hp2.mp4'; // Denny Hamlin, "Actions Detrimental," Blaney's real appearance two days after (vaYfQVuJ-2A).

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
  // 1 recap tease: punched twice, water bottle, security, NASCAR's decision two days later
  // GI's free window (long3 used 0-150 incl. its hook, then 202+) runs 150.00-202.00; every GI link
  // below (scenes 1,5,6,7,8,11) is a contiguous, non-overlapping walk forward through that window.
  1: scene(1,
    [GI, 150.0, 4.0],    // real crowd/scramble, GI 150.00-154.00
    [FC, 333.5, 8.0],    // FOX's "boil over" tail, fresh of long3's 321-330.5 use
    [HP, 3.0, 13.0],     // Happy Hour set - O'Donnell about to explain the decision
    [GI, 154.0, 'end'],  // continuous with link 1, GI 154.00-158.83
  ),
  // 2 43 to go, race of his night, led 202, won stage 2, Hocevar dives to the bottom, contact, wall
  2: scene(2,
    [HL, 700.0, 6.0],    // Bristol under the lights, mid-race running
    [FC, 16.7, 'end'],   // one continuous real analyst call, FC 16.70-37.27: "HOCEVAR SIDEWAYS... HERE
  ),                     // COMES BLANEY... gave the 12 the bottom... HOCEVAR HAS TURNED BLANEY... sends him off"
  // 3 Blaney's anger: care-center F-bomb, "something's going to happen", the real quote, "getting old"
  // FC's second free window (long3 only touched a 52.0-56.8 sliver here) runs 56.8-240.0; scenes
  // 3,7,8,11 below walk forward through it, each starting where the previous one left off.
  3: scene(3,
    [FC, 58.0, 11.0],    // FOX's own care-center interview, FC 58.00-69.00: "I don't [bleep] know. I got crashed."
    [FS, 63.36, 'end'],  // free FS window: "I just felt like he didn't lift... protected the bottom... wrecked
  ),                     // me" - runs to the scene's end, plain footage under the trailing "getting old" line
                         // (no quote bar there - that exact line's only footage is already used in long3)
  // 4 Blaney 33rd, Hocevar third (short stat beat)
  4: scene(4,
    [HL, 730.0, 'end'],
  ),
  // 5 Hocevar climbs out, Blaney already waiting, walks up, grabs the firesuit
  5: scene(5,
    [GI, 159.0, 3.5],
    [GI, 162.5, 'end'],  // continuous, GI 159.00-167.10
  ),
  // 6 Hocevar doesn't back down, punch, hat knocked off, second punch
  6: scene(6,
    [GI, 167.3, 2.3],
    [GI, 169.6, 'end'],  // continuous, GI 167.30-174.11: "Ryan Blaney is hot... not happy with Carson Hocevar"
  ),
  // 7 chaos: security holds Blaney, trip, crew pile, back up, fights through, separated again, third try
  7: scene(7,
    [GI, 175.0, 6.7],
    [FC, 69.0, 'end'],   // FC 69.00-88.84
  ),
  // 8 Ty Gibbs throws a water bottle into the scrum, narrowly misses, hits a camera rig
  8: scene(8,
    [GI, 182.0, 5.0],
    [FC, 88.84, 'end'],  // FC 88.84-98.81
  ),
  // 9 reactions differ: middle finger to the grandstand, golf cart out, boos, cheers for Hocevar
  9: scene(9,
    [HL, 760.0, 6.0],
    [ND, 121.44, 18.0],  // free window on ND (long3 stopped at 121.43) - real pit-road/crowd b-roll
    [HL, 780.0, 'end'],
  ),
  // 10 Blaney's black eye
  10: scene(10,
    [HL, 800.0, 'end'],
  ),
  // 11 Hocevar's own words after the fight - real interview, plain footage (these exact lines aren't
  // in any sourced clip's captions, so no quote bar - flick-quote-scene-style/quote-integrity)
  11: scene(11,
    [GI, 188.0, 10.0],
    [FC, 98.81, 'end'],  // FC 98.81-111.20
  ),
  // 12 Blaney on Hamlin's podcast: "I wasn't planning on throwing anything..." - real quote, timed
  // via whisper (source 1566.24s, found after yt-dlp's caption endpoint kept 429ing for this video).
  // Per the user's call, this podcast clip appears only once in the whole film and only for 3s - the
  // rest of the scene is Bristol B-roll bookending it.
  12: scene(12,
    [HL, 890.0, 7.0],
    [HP2, 1566.24, 10.0],  // exactly 3s (7.0 -> 10.0 local)
    [HL, 900.0, 'end'],
  ),
  // 13 Monday regret, new father - same podcast appearance, but per the "one clip only" call this
  // scene carries the line as narration over plain Bristol footage instead of a second podcast clip.
  13: scene(13,
    [HL, 910.0, 'end'],
  ),
  // 14 the story's biggest turn
  14: scene(14,
    [HL, 820.0, 'end'],
  ),
  // 15 NASCAR will not penalize either driver - no exact quote here (paraphrase only), so this plays
  // real racing footage from FC's still-free 111.2-240 window (scenes 7/8/11 stopped at 111.21)
  // rather than the Happy Hour podcast set.
  15: scene(15,
    [FC, 111.3, 'end'],  // FC 111.30-120.17
  ),
  // 16 O'Donnell explains the reasoning on Happy Hour - per the user's call, the podcast set shows for
  // only 3s (sandwiched between racing footage from the same free FC window), matching how scenes
  // 12/13 handle Hamlin's podcast.
  16: scene(16,
    [FC, 120.17, 10.0],   // racing B-roll, FC 120.17-130.17
    [HP, 145.2, 13.0],    // exactly 3s: the real "handle their own business... passion" quote
    [FC, 130.17, 'end'],  // racing B-roll continues, FC 130.17-142.90
  ),
  // 17 the 2010 Keselowski/Edwards line, "don't use your car as a weapon... or a right hook"
  17: scene(17,
    [ED, 0.0, 10.0],
    [HP, 121.44, 'end'], // "don't use your car as a weapon... Edwards... right hook... handle business outside the car"
  ),
  // 18 2023 Kansas precedent: Gragson/Chastain, no penalty then either
  18: scene(18,
    [KH, 0.0, 8.0],
    [CQ, 19.0, 'end'],   // "he took a swipe... a very big man once told me we have a no push policy"
  ),
  // 19 crew-member review still unresolved
  19: scene(19,
    [HL, 840.0, 'end'],
  ),
  // 20 Blaney sixth, 52 behind Larson, heading into Kansas this weekend
  20: scene(20,
    [KH, 10.0, 10.0],
    [KH, 40.0, 'end'],
  ),
  // 21 wrap: message is clear, Hocevar walks away ahead, Blaney with the black eye and the gap
  21: scene(21,
    [KH, 80.0, 12.0],
    [HL, 870.0, 'end'],
  ),
};

const names = {GI, FC, HL, ND, FS, HP, KH, ED, CQ, HP2: 'hp2.mp4'};
const rev = Object.fromEntries(Object.entries(names).map(([k, v]) => [v, k]));

const out = `/**
 * Scene -> chain of bed clips. Generated by build-footage.mjs (regenerate if scene durations change).
 * Rules: no link over ~7s, no overlapping ranges of one source, every clip matched to its line.
 *
 * Sources (720p h264):
 *   GI  NASCAR official, "Carson Hocevar, Ryan Blaney Get Into It at Bristol" (MsJuBKfoTrs) - same
 *       source long3 used as GI. That film used 0-150 (incl. its hook) and 199-345; this film keeps
 *       inside the 150-199 gap it left, plus its own 150.5-160.5 hook range.
 *   FC  NASCAR on FOX (zucbKmYLL4Y) - same source long3 used as FC. That film used ~240-341 and small
 *       slivers; this film uses 16-107 (the analyst's real call of the contact) and 130-240 (FOX's own
 *       cut of the care-center interview and pit-road chaos), untouched there.
 *   HL  NASCAR official Bristol highlights (1iatULgMcRU) - same source long3 used as HL. This film's
 *       ranges (700-880) sit in the mid-race stretch long3 never used.
 *   ND  NASCAR official, "What Drivers Said After Bristol" (YEXOSSOhm9o) - same source long3 used as
 *       ND. This film's range (121-147) is Hocevar's segment past where long3 stopped.
 *   FS  Frontstretch, Blaney after the wreck (PlPoyosi_g4) - same source long3 used as FS. This film's
 *       range (40-77) is the free window between long3's two uses; it carries the real quote almost
 *       verbatim: "I just felt like he didn't lift... I protected the bottom... he decided he wanted
 *       to be there and didn't lift and wrecked me."
 *   HP  Kevin Harvick's Happy Hour, "EXCLUSIVE: Steve O'Donnell on Carson Hocevar vs. Ryan Blaney"
 *       (pMWF2AJftyk) - fresh source. Real quotes: "don't use your car as a weapon... or a right
 *       hook" (121-144s) and "if drivers are going to handle their own business... nothing in terms
 *       of post-race penalties" (145-166s).
 *   KH  NASCAR official, "NASCAR Cup Series Highlights | 2026 Kansas Speedway" (M_N_08SXrzg) - fresh
 *       source, this weekend's real venue.
 *   ED  "Carl Edwards WRECKS Brad Keselowski - 2010 Kobalt Tools 500 ... Atlanta" (Defined Fate,
 *       G7lfK7IOmk4) - fresh source, real 2010 archival footage. Kept inside 0-75s only - a green
 *       screen/ad segment follows after that in the source and is never used.
 *   CQ  NASCAR official, Ross Chastain's real quote on the 2023 Gragson incident, "we have a no push
 *       policy here at Trackhouse" (6WvBN1gI504) - fresh source.
 *   HP2 Denny Hamlin, "Actions Detrimental," "What Actually Set Ryan Blaney Off At Bristol?"
 *       (vaYfQVuJ-2A) - fresh source, Blaney's own two-days-later appearance.
 *
 * Honesty note: scene 11 (Hocevar's post-fight reflection - "I understand why he's upset...") plays
 * real, on-topic Hocevar interview footage, but none of the sourced captions match this script's
 * exact wording closely enough to caption as a synced quote - so it carries the line as narration
 * over plain real footage rather than a quote bar (flick-quote-scene-style / quote-integrity).
 * Scenes 12/13 (Blaney on Hamlin's podcast) DO have exact real quotes now - yt-dlp's caption endpoint
 * kept 429-ing for that video, so they were found by running whisper on the raw audio directly.
 * Same rule applied to HP (Kevin Harvick's Happy Hour) after the fact: scene 16's O'Donnell quote
 * plays the podcast set for only 3s, sandwiched in real Bristol racing B-roll on both sides; scene 15
 * (no exact quote) dropped the podcast set entirely in favor of racing footage.
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
