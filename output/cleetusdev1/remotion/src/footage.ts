/**
 * Scene -> chain of bed clips.
 *
 * Three rules, all set by the user, all of them things an earlier cut got wrong:
 *
 *   1. **No clip holds the screen for more than seven seconds.** The first cut had scene 11 on a
 *      single in-car shot for thirty-three seconds and scene 1 on one interview for nineteen —
 *      "aik hi itna lamba". Every link below is sized between roughly four and seven seconds, and
 *      each plays at its natural rate: `span` is always `frames / 30`, so nothing is ever slowed
 *      down to stretch across a gap.
 *
 *   2. **Different clips, not the same one twice.** No two links share a range. Where a source is
 *      used more than once the ranges are far apart and show different parts of the race, and
 *      wherever the narration names a specific event there is footage of that actual event.
 *
 *   3. **Relevancy stays at 100%.** A link is only different for the sake of being different if it
 *      still matches the line over it. Scene 11 walks through Talladega, Daytona and Rockingham,
 *      so it is cut from Talladega, Daytona and Rockingham footage in that order.
 *
 * Game footage is down to two links — 11.6 seconds of 341, about 3% — and both are the No. 30
 * reveal the whole script is about. Everything else is real broadcast footage.
 *
 * Sources, all official channels:
 *   A hook-forehead.mp4       "Cleetus McFarland trademarks the forehead autograph during
 *                             Talladega pre-race" (lJ4sVtE9O_k, NASCAR) — 86s. Him on camera.
 *   B talladega-mid.mp4       "Cleetus McFarland's In-Car Camera at Talladega | ARCA Menards"
 *                             (9BojLRSOa14, NASCAR), s2400-2560 — 160s. Green-flag pack.
 *   C talladega-finish.mp4    Same in-car feed, s7250-7500 — 250s. The closing laps.
 *   D talladega-reaction.mp4  "Cleetus McFarland Reacts After Finishing 2nd at Talladega"
 *                             (8nVxR1_NRUU, NASCAR) — 232s. His own words.
 *   E talladega-broadcast.mp4 "Talladega's Final Laps Ends in Chaotic Finish | 2026 ARCA Menards
 *                             Series" (dAPRKFaL7U8, NASCAR) — 359s. The finish from the TV cameras
 *                             rather than the roll cage, which is what breaks up the in-car look.
 *   F daytona-exit.mp4        "Cleetus McFarland reacts to early exit from first race at Daytona"
 *                             (KlOsuTtPJ3o, NASCAR) — 72s. The 2025 Daytona exit.
 *   G daytona-truck.mp4       "Cleetus McFarland's NASCAR Truck Debut Ends in Hard Crash at
 *                             Daytona" (HeCKBH9u_Q8, NASCAR) — 63s. The 2026 Truck debut.
 *   H rockingham-oreilly.mp4  "How Cleetus McFarland's 1st O'Reilly Series Race Unfolded"
 *                             (Bbn8vNHxVng, NASCAR) — 455s. The Rockingham debut.
 *   I rockingham-reaction.mp4 "Cleetus McFarland's Honest Reaction to His O'Reilly Series Debut"
 *                             (SnsxybLfros, NASCAR) — 167s.
 *   J dd3-cleetus30.mp4       Seconds 482.5-490 of "NASCAR 26 Dev Diary: Ep 03" (vSLHzRR-nrc) —
 *                             the No. 30 BaldEagle.com Mustang rendered in game. The one piece of
 *                             game footage in the film.
 *
 * Both in-car clips are cropped to the camera itself (crop=1024:576:0:0) because the broadcast
 * feed carries a merch/QR promo panel down the right side and a lower banner.
 *
 * E, G, H and I are full broadcast packages and are cropped to crop=1460:821:460:60 for the same
 * reason: a running-order leaderboard sits down the left of every shot, with driver lower-thirds
 * and caution banners along the bottom. Nothing may be taken from the last forty seconds of E —
 * that is the unofficial-results screen and the channel's own subscribe end card.
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

/** A bed plus how long it holds the screen. */
export type Link = Bed & {frames: number};

const P = (name: string) => `bed-pool/${name}`;

/**
 * Build one link. `span` is derived from `frames` rather than passed in, which is what guarantees
 * rule 1: a link can never be slowed down to cover more time than its footage actually holds.
 */
const L = (
  file: string,
  startFrom: number,
  frames: number,
  extra: Omit<Bed, 'src' | 'startFrom' | 'span'> = {},
): Link => ({src: P(file), startFrom, frames, span: frames / 30, ...extra});

const A = 'hook-forehead.mp4';
const B = 'talladega-mid.mp4';
const C = 'talladega-finish.mp4';
const D = 'talladega-reaction.mp4';
const E = 'talladega-broadcast.mp4';
const F = 'daytona-exit.mp4';
const G = 'daytona-truck.mp4';
const H = 'rockingham-oreilly.mp4';
const I = 'rockingham-reaction.mp4';
const J = 'dd3-cleetus30.mp4';

export const CHAINS: Record<number, Link[]> = {
  // 1 (586f) — the hook. Him on camera first, because the line is about him turning up somewhere
  // unexpected; the ID card sits on that first link.
  1: [
    L(A, 4, 147, {driftX: 0.8}),
    L(E, 20, 147, {driftX: -0.6}),
    L(A, 26, 146, {zoom: 1.06}),
    L(D, 8, 146, {driftX: 0.5}),
  ],

  // 2 (582f) — the reveal. Real car, real race, then the rendered one: the cut is the point, and
  // the card lands on the last link where the game shot is.
  2: [
    L(B, 52, 146, {driftX: -0.6}),
    L(E, 40, 146, {driftX: 0.7}),
    L(C, 30, 145, {zoom: 1.05}),
    L(J, 0.3, 145, {zoom: 1.04}),
  ],

  // 3 (440f) — "nothing guaranteed he'd carry over… He's in." His own words, not a menu screen.
  3: [
    L(D, 113, 147, {driftX: 0.5}),
    L(A, 36, 147, {zoom: 1.07}),
    L(D, 130, 146, {driftX: -0.5}),
  ],

  // 4 (663f) — the BaldEagle.com scheme, the race it debuted at.
  4: [
    L(B, 8, 166, {driftX: -0.7}),
    L(C, 20, 166, {driftX: 0.6}),
    L(E, 60, 166, {zoom: 1.05}),
    L(B, 20, 165, {driftX: 0.8}),
  ],

  // 5 (802f) — the runner-up finish. Alternates in-car and broadcast so the closing laps read as
  // a race rather than one long onboard.
  5: [
    L(C, 180, 161, {driftX: 0.9}),
    L(E, 200, 161, {driftX: -0.7}),
    L(C, 190, 160, {zoom: 1.06}),
    L(E, 250, 160, {driftX: 0.6}),
    L(D, 20, 160, {driftX: -0.5}),
  ],

  // 6 (457f) — "not a coincidence." The card carries the in-game still itself, so the beds under
  // it stay on the real race.
  6: [
    L(E, 70, 153, {zoom: 1.06}),
    L(C, 68, 152, {driftX: 0.7}),
    L(E, 90, 152, {driftX: -0.6}),
  ],

  // 7 (145f) — short bridge line.
  7: [L(A, 44, 145, {zoom: 1.08})],

  // 8 (1001f) — the longest scene: YouTube, then the Rette Jones deal. Six links, no stat cards.
  8: [
    L(A, 52, 167, {driftX: 0.6}),
    L(D, 96, 167, {driftX: -0.6}),
    L(B, 40, 167, {zoom: 1.05}),
    L(D, 150, 167, {driftX: 0.5}),
    L(E, 120, 167, {driftX: -0.7}),
    L(B, 66, 166, {driftX: 0.8}),
  ],

  // 9 (373f) — "racing against those same drivers in real ARCA events."
  9: [
    L(E, 140, 187, {driftX: 0.6}),
    L(C, 100, 186, {zoom: 1.05}),
  ],

  // 10 (398f) — the 2025 Daytona exit, under the globe.
  10: [
    L(F, 6, 133, {driftX: -0.8}),
    L(F, 30, 133, {zoom: 1.07}),
    L(F, 50, 132, {driftX: 0.6}),
  ],

  // 11 (1004f) — the season that made the film. The narration names Talladega, then Daytona, then
  // Rockingham, so the chain goes Talladega, Daytona, Rockingham in that order, with the actual
  // footage of each. This is the scene the extra downloads were for.
  // Link lengths here are uneven on purpose: each track's footage has to be on screen at the
  // moment the narration says its name, because that is when the map drops its pin. Talladega is
  // named about five seconds in, Daytona about ten, Rockingham about sixteen.
  11: [
    L(C, 35, 150, {driftX: 0.7}), // Talladega
    L(E, 300, 140, {driftX: -0.6}), // Talladega, from the broadcast side
    L(G, 5, 175, {zoom: 1.05}), // Daytona — the Truck debut
    L(H, 60, 180, {driftX: -0.5}), // Rockingham — the O'Reilly debut
    L(I, 20, 180, {zoom: 1.06}), // Rockingham, his own words
    L(E, 306, 179, {driftX: 0.6}), // "three different national touring series"
  ],

  // 12 (430f) — "on real racetracks and inside the games."
  12: [
    L(H, 120, 144, {driftX: 0.6}),
    L(C, 53, 143, {driftX: -0.6}),
    L(E, 160, 143, {zoom: 1.05}),
  ],

  // 13 (203f) — "the Dev Diary confirmed he's back in the ARCA lineup." The reveal, second and
  // last time it appears.
  13: [L(J, 0.6, 203, {zoom: 1.08})],

  // 14 (726f) — three series in 2026, so ARCA, Truck, O'Reilly, one per link, under the card.
  14: [
    L(B, 100, 182, {driftX: 0.8}),
    L(G, 40, 182, {driftX: -0.6}),
    L(H, 200, 181, {zoom: 1.05}),
    L(E, 220, 181, {driftX: 0.6}),
  ],

  // 15 (560f) — "his No. 30 ARCA Ford… a scheme tied to his best result of the year."
  15: [
    L(B, 140, 187, {zoom: 1.06}),
    L(C, 207, 187, {driftX: -0.7}),
    L(E, 232, 186, {driftX: 0.6}),
  ],

  // 16 (773f) — one event left, and the 2027 question. His own words, plus the Truck footage the
  // remaining race belongs to.
  16: [
    L(D, 40, 155, {driftX: -0.5}),
    L(I, 60, 155, {zoom: 1.06}),
    L(D, 60, 154, {driftX: 0.6}),
    L(G, 52, 154, {driftX: -0.6}),
    L(E, 180, 155, {zoom: 1.05}),
  ],

  // 17 (376f) — 2025 -> 2026 -> 2027, under the progression card.
  17: [
    L(C, 120, 188, {zoom: 1.06}),
    L(H, 300, 188, {driftX: 0.6}),
  ],

  // 18 (488f) — the career the game is following.
  18: [
    L(B, 124, 163, {driftX: 0.6}),
    L(H, 380, 163, {driftX: -0.6}),
    L(C, 140, 162, {zoom: 1.05}),
  ],

  // 19 (518f) — the close, under the end card.
  19: [
    L(A, 64, 173, {driftX: -0.7}),
    // 110s, not the 260s-280s stretch: that part of the broadcast is the chaotic finish, all
    // smoke and wrecked cars, and this scene closes on "already a milestone".
    L(E, 110, 173, {zoom: 1.05}),
    L(A, 70, 172, {driftX: 0.6}),
  ],
};

export const chain = (n: number): Link[] => CHAINS[n];
