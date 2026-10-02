/**
 * Scene -> chain of bed clips.
 *
 * Rules, all user-set and all of them things an earlier cut got wrong:
 *   1. No link holds the screen more than 7s. Every link here is <= 200 frames (6.67s); `span` is
 *      always `frames / 30`, so nothing is ever slowed down to stretch across a gap.
 *   2. No two links anywhere in the film share overlapping ranges of the same source.
 *   3. Relevancy stays at 100%. Where the narration names a specific thing - the pit stop, the
 *      McDowell contact, Hamlin's own words, Bell's win, Gateway - the footage under it is that
 *      thing, not a generic race shot.
 *
 * Sources are the same pool cut for bell1: this is the same race from Hamlin's side, so nothing
 * needed re-downloading or re-transcoding.
 *
 *   A final-laps.mp4            554s. FOX's final-laps package, night racing.
 *                               Clean windows only: 16-100, 116-148, 168-236, 240-332, 480-534.
 *                               **Avoid 336-430s** (FOX lays speed-comparison telemetry across
 *                               mid-frame, which no crop removes), **432-452s** (picture-in-picture
 *                               of a driver's wife) and the last ~25s (FOX bumper).
 *                               Bell's #20 Mobil 1 runs alone at ~508s.
 *   B southern500-highlights.mp4 1621s. The full race package: pit stops (~360-480s, ~720-800s),
 *                               spins and wall contact (~216-232s, ~840-870s), night running late.
 *   C gateway.mp4               240s. Clean aerial track shots, 72-111s, for the Round 2 close.
 *   D postrace-interviews.mp4   857s. Two separate blocks that both matter here:
 *                                 - 0-90s: Bell's victory-lane interview (he is the teammate who
 *                                   took second place in the standings off Hamlin).
 *                                 - **272-347s: Hamlin's own post-race interview**, captioned by
 *                                   the broadcast "DENNY HAMLIN - STAGE 1: 3rd, STAGE 2: 3rd,
 *                                   FINISHED: 18th", and with a **race replay cut inside it at
 *                                   ~327-341s that holds Hamlin's #11 SportClips Toyota and
 *                                   McDowell's #71 in the same frame** - the actual contact the
 *                                   script is about. Scene 8 is built on those seconds.
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

const A = 'final-laps.mp4';
const B = 'southern500-highlights.mp4';
const C = 'gateway.mp4';
const D = 'postrace-interviews.mp4';

export const CHAINS: Record<number, Link[]> = {
  // 1 (480f) - the hook: biggest cushion in the field, cut in half in one night. Race, then the man
  // it happened to, then race again.
  1: [
    L(A, 20, 170, {driftX: 0.7}),
    L(D, 272, 160, {zoom: 1.05}),
    L(A, 50, 150, {driftX: -0.6}),
  ],

  // 2 (177f) - "Here's exactly what happened at Darlington." One short bridge line, one shot.
  2: [L(B, 30, 177, {zoom: 1.06})],

  // 3 (616f) - the regular-season championship, four wins, No. 1 seed, 25-point cushion.
  3: [
    L(B, 60, 160, {driftX: 0.6}),
    L(A, 168, 160, {zoom: 1.05}),
    L(B, 120, 150, {driftX: -0.6}),
    L(A, 176, 146, {driftX: 0.5}),
  ],

  // 4 (599f) - started fourth, led by lap 3, 15 stage points. Running at the front. This is under
  // the "how the night started" header, so all four links are final-laps.mp4 (confirmed all-night)
  // rather than the highlights package, which is daylight until roughly 1120s in.
  4: [
    L(A, 55, 155, {driftX: -0.5}),
    L(A, 192, 150, {zoom: 1.06}),
    L(A, 62, 150, {driftX: 0.6}),
    L(A, 200, 144, {driftX: -0.5}),
  ],

  // 5 (605f) - "The turning point wasn't a crash. It was a pit stop." Four pit-lane shots, because
  // the line is about pit road and nothing else.
  5: [
    L(B, 380, 155, {driftX: 0.5}),
    L(B, 400, 155, {zoom: 1.05}),
    L(B, 440, 150, {driftX: -0.6}),
    L(B, 470, 145, {driftX: 0.5}),
  ],

  // 6 (624f) - Hamlin's own words about the stop: "It's a professional sport. You can't have big
  // mistakes." His own interview, all four links.
  6: [
    L(D, 278, 160, {driftX: -0.5}),
    L(D, 284, 160, {zoom: 1.05}),
    L(D, 290, 155, {driftX: 0.5}),
    L(D, 296, 149, {zoom: 1.06}),
  ],

  // 7 (143f) - "a strong car buried in traffic." One shot of traffic.
  7: [L(B, 800, 143, {driftX: -0.6})],

  // 8 (745f) - THE CONTACT. The broadcast replay inside Hamlin's interview carries his #11 and
  // McDowell's #71 in the same frame, so the two links that describe the hit are the hit.
  8: [
    L(D, 327, 190, {zoom: 1.04}),
    L(D, 334, 190, {zoom: 1.06}),
    // The contact was in the race's final stage - night by then, like everything else this late -
    // so this stays on final-laps.mp4 rather than the highlights package's daylight footage.
    L(A, 70, 185, {driftX: 0.6}),
    L(A, 210, 180, {driftX: -0.5}),
  ],

  // 9 (858f) - "I certainly felt like I had some responsibility in it." Back to him talking, then
  // the race he is talking about.
  9: [
    L(D, 302, 180, {driftX: 0.5}),
    L(D, 308, 180, {zoom: 1.05}),
    // Same reasoning as scene 8: this is still the same night incident, so night footage.
    L(A, 118, 175, {driftX: -0.6}),
    L(A, 216, 175, {driftX: 0.5}),
    L(A, 125, 148, {zoom: 1.05}),
  ],

  // 10 (344f) - McDowell declined to comment, but called it avoidable.
  10: [
    L(B, 1050, 175, {driftX: -0.5}),
    L(A, 222, 169, {zoom: 1.06}),
  ],

  // 11 (373f) - broken toe link, damaged control arm, the radio call to Chris Gayle.
  11: [
    L(B, 1100, 190, {driftX: 0.6}),
    L(B, 1150, 183, {zoom: 1.05}),
  ],

  // 12 (781f) - forty laps nursing a broken car, a lap down, repaired under caution, 18th.
  12: [
    L(B, 1200, 195, {driftX: -0.6}),
    L(B, 1250, 195, {zoom: 1.05}),
    L(B, 1300, 195, {driftX: 0.5}),
    L(A, 240, 196, {driftX: -0.5}),
  ],

  // 13 (476f) - "Certainly not the finish we were hoping for."
  13: [
    L(D, 315, 160, {zoom: 1.05}),
    L(A, 250, 158, {driftX: 0.6}),
    L(B, 1350, 158, {driftX: -0.5}),
  ],

  // 14 (400f) - the number: 25 points became 12, and the man now second is his own teammate. So
  // this is the only scene cut to Bell - his car, then him.
  14: [
    L(A, 508, 200, {driftX: 0.5}),
    L(D, 5, 200, {zoom: 1.05}),
  ],

  // 15 (650f) - the standings tighten behind him: Blaney, Reddick, Briscoe.
  15: [
    L(B, 1400, 165, {driftX: -0.6}),
    L(A, 260, 165, {zoom: 1.05}),
    L(B, 1450, 160, {driftX: 0.6}),
    L(A, 288, 160, {driftX: -0.5}),
  ],

  // 16 (818f) - the wider Spire frustration: Hocevar spinning Keselowski into the wall for the
  // Stage 1 caution. Cut from the package's own spin and wall-contact footage.
  16: [
    L(B, 216, 175, {driftX: 0.5}),
    L(B, 224, 175, {zoom: 1.06}),
    L(B, 840, 175, {driftX: -0.6}),
    L(B, 860, 175, {driftX: 0.5}),
    L(A, 294, 118, {zoom: 1.05}),
  ],

  // 17 (606f) - no excuses: the slow stop was his own crew. Back to pit road.
  17: [
    L(B, 720, 155, {driftX: -0.5}),
    L(B, 760, 155, {zoom: 1.05}),
    L(B, 1500, 150, {driftX: 0.6}),
    L(A, 300, 146, {driftX: -0.5}),
  ],

  // 18 (636f) - still the leader, but with the smallest cushion of any Chase leader, and his own
  // teammate behind him. Ends on Bell, which is the point of the line.
  18: [
    L(A, 306, 160, {driftX: 0.5}),
    L(B, 1550, 160, {zoom: 1.05}),
    L(D, 40, 160, {driftX: -0.5}),
    L(A, 316, 156, {zoom: 1.06}),
  ],

  // 19 (404f) - "We're still leading." His own words to close his side of it.
  19: [
    L(D, 321, 180, {zoom: 1.05}),
    L(A, 322, 120, {driftX: 0.6}),
    L(B, 1600, 104, {driftX: -0.5}),
  ],

  // 20 (681f) - Gateway, where he is the defending winner, and nine races left.
  20: [
    L(C, 72, 180, {driftX: 0.5}),
    L(C, 84, 175, {zoom: 1.06}),
    L(C, 100, 170, {driftX: -0.5}),
    L(A, 480, 156, {driftX: 0.6}),
  ],
};

export const chain = (n: number): Link[] => CHAINS[n];
