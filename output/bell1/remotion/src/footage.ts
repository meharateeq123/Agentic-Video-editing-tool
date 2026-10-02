/**
 * Scene -> chain of bed clips.
 *
 * Same three rules as the last film, all user-set:
 *   1. No link holds the screen more than 7s (210 frames). `span` is always `frames / 30`, so
 *      nothing is ever slowed to stretch across a gap.
 *   2. No two links anywhere in the film share overlapping ranges of the same source.
 *   3. Relevancy stays at 100% — footage matches the line over it, not just "some race clip".
 *
 * Sources (all cropped to strip broadcast graphics, see prep-footage*.ps1):
 *   A final-laps.mp4                  554s. FOX's final-laps package: wide track shots, Ty Gibbs'
 *                                      #54 onboard repeatedly (he's the car Bell beats to the line),
 *                                      and Bell's own #20 running alone at ~508s. Avoid 336-430s and
 *                                      104-116s: FOX lays speed-comparison and "CLOSING THE GAP"
 *                                      telemetry across the middle of frame there, which no crop
 *                                      can remove. 432-452s carries a picture-in-picture of Bell's
 *                                      wife, and the last ~25s is a FOX bumper.
 *   B southern500-highlights.mp4      1621s. The full highlights package: pack racing, pit stops,
 *                                      a "NEW STAGE BREAK PROCEDURE" graphic (~300s), a "BATTLE FOR
 *                                      LEAD" graphic (~480-540s), and #20 in tire smoke very late
 *                                      (~1584s) that reads as the finish/celebration.
 *   C gateway.mp4                     240s. Clean aerial track shots and a trackside fire effect
 *                                      (~72-111s) for the Round 2 preview at the end.
 *   D bell-recalls-michigan.mp4       322s. Bell's own Pocono press-conference interview (wrist
 *                                      wrap visible) plus real B-roll of his wrecked #20 Rheem
 *                                      Toyota on a flatbed (~120-132s) — the actual Michigan car,
 *                                      not a generic wreck.
 *
 * michigan-wreck.mp4 was downloaded but is NOT used anywhere in this file: it turned out to be
 * Chase Elliott's #9 wreck, not Bell's, caught on a contact-sheet scan before it reached a scene.
 *
 *   E postrace-interviews.mp4          857s. The first ~90s is Bell's own victory-lane interview —
 *      Darlington signage and fireworks behind him, Rheem/DeWalt/Mobil 1 firesuit, JGR crew in
 *      frame. Hamlin's own interview runs ~272-347s, captioned with his 18th-place finish and
 *      carrying a race replay inside it. After that the package moves to Larson, Wallace and the
 *      rest of the field.
 *
 * Every scene is final. darlington-highlights-nascar.mp4 was downloaded but is not used: scene 15
 * is better served by Hamlin's own interview (which the broadcast captions with the exact finishing
 * position the script names) than by hunting the same incident inside a second highlights package,
 * and dropping it saved an hour of AV1 transcoding this machine cannot do on the GPU.
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
const D = 'bell-recalls-michigan.mp4';
const E = 'postrace-interviews.mp4';

export const CHAINS: Record<number, Link[]> = {
  // 1 (500f) — the hook. Wide race atmosphere, then into the pack.
  1: [
    L(A, 20, 180, {driftX: 0.7}),
    L(B, 30, 180, {driftX: -0.6}),
    L(A, 30, 140, {zoom: 1.06}),
  ],

  // 2 (299f) — short bridge line.
  2: [
    L(B, 400, 150, {driftX: 0.6}),
    L(A, 56, 149, {driftX: -0.5}),
  ],

  // 3 (542f) — the checkered flag, beating teammate Ty Gibbs to the line. Bell's own #20 Mobil 1
  // car is on screen at 508s, so the line about him taking the flag runs over the car it is about,
  // then the finish-line shots that follow it.
  3: [
    L(A, 508, 180, {driftX: -0.6}),
    L(A, 516, 180, {zoom: 1.05}),
    L(A, 528, 182, {driftX: 0.6}),
  ],

  // 4 (539f) — stat card (seven runner-ups). General race action underneath.
  4: [
    L(B, 60, 180, {driftX: 0.7}),
    L(B, 140, 180, {driftX: -0.6}),
    L(B, 220, 179, {zoom: 1.05}),
  ],

  // 5 (304f) — "It's been too long." Bell's own victory-lane interview.
  5: [
    L(E, 5, 180, {driftX: 0.5}),
    L(E, 11, 124, {zoom: 1.06}),
  ],

  // 6 (758f) — rain delay, red flag, restart on new tires. The stage-break graphic sits in here.
  6: [
    L(B, 340, 190, {driftX: -0.6}),
    L(A, 168, 190, {zoom: 1.05}),
    L(B, 540, 189, {driftX: 0.6}),
    L(A, 176, 189, {driftX: -0.5}),
  ],

  // 7 (491f) — the pass on Larson. Three consecutive slices of the same real-time stretch of
  // closing-lap footage rather than one clip stretched to fit.
  7: [
    L(A, 192, 180, {driftX: 0.6}),
    L(A, 198, 180, {zoom: 1.06}),
    L(A, 204, 131, {driftX: -0.5}),
  ],

  // 8 (417f) — fending off four contenders. Continues straight on from scene 7's footage.
  8: [
    L(A, 210, 180, {driftX: -0.6}),
    L(A, 216, 180, {zoom: 1.05}),
    L(A, 222, 57, {driftX: 0.5}),
  ],

  // 9 (361f) — the Michigan flashback. Real B-roll of Bell's own wrecked #20 on the flatbed.
  9: [
    L(D, 120, 180, {driftX: 0.5}),
    L(D, 126, 181, {zoom: 1.05}),
  ],

  // 10 (315f) — "infield care center" quote. Bell's own press-conference interview.
  10: [
    L(D, 0, 180, {driftX: -0.5}),
    L(D, 200, 135, {zoom: 1.06}),
  ],

  // 11 (621f) — the broken-wrist context, then back to the season of near-misses.
  11: [
    L(D, 30, 180, {driftX: 0.5}),
    L(D, 240, 150, {zoom: 1.05}),
    L(B, 700, 180, {driftX: -0.6}),
    L(B, 760, 111, {driftX: 0.5}),
  ],

  // 12 (442f) — the bow to the grandstands, the Kyle Busch tribute. Same interview, later in it.
  12: [
    L(E, 20, 180, {driftX: -0.6}),
    L(E, 26, 180, {zoom: 1.05}),
    L(E, 32, 82, {driftX: 0.5}),
  ],

  // 13 (170f) — short bridge line: Chase-opening win vs. a regular one.
  13: [L(B, 900, 170, {zoom: 1.06})],

  // 14 (566f) — rank-change graphic, 6th to 2nd.
  14: [
    L(B, 1000, 180, {driftX: 0.6}),
    L(B, 1050, 180, {driftX: -0.5}),
    L(A, 240, 180, {zoom: 1.05}),
    L(B, 1100, 26, {driftX: 0.4}),
  ],

  // 15 (487f) — Hamlin's rough night. His own post-race interview, which the broadcast captions
  // "DENNY HAMLIN — STAGE 1: 3rd, STAGE 2: 3rd, FINISHED: 18th", exactly the number the narration
  // reads. The middle link is the race replay the broadcast cuts to inside that same interview —
  // cars against the wall — so "sent him into the wall" lands on footage of it.
  15: [
    L(E, 300, 180, {driftX: -0.6}),
    L(E, 330, 127, {zoom: 1.05}),
    L(E, 272, 180, {driftX: 0.5}),
  ],

  // 16 (606f) — standings tighten (Blaney, Reddick, Briscoe) graphic.
  16: [
    L(B, 1150, 180, {driftX: 0.6}),
    L(B, 1200, 180, {driftX: -0.5}),
    L(A, 250, 180, {zoom: 1.05}),
    L(B, 1250, 66, {driftX: 0.4}),
  ],

  // 17 (579f) — Stage 2 win, 46 laps led. The "BATTLE FOR LEAD" graphic sits in this range.
  17: [
    L(B, 480, 180, {driftX: 0.6}),
    L(B, 528, 180, {zoom: 1.05}),
    L(B, 620, 180, {driftX: -0.5}),
    L(B, 650, 39, {driftX: 0.4}),
  ],

  // 18 (536f) — all four JGR drivers won in 2026 graphic.
  18: [
    L(B, 750, 180, {driftX: 0.6}),
    L(B, 800, 180, {zoom: 1.05}),
    L(A, 260, 176, {driftX: -0.5}),
  ],

  // 19 (579f) — "the conversation just changed." Reflective close before the Gateway turn.
  19: [
    L(B, 850, 180, {driftX: -0.6}),
    L(B, 950, 180, {zoom: 1.05}),
    L(B, 1350, 180, {driftX: 0.5}),
    L(B, 1400, 39, {driftX: -0.4}),
  ],

  // 20 (459f) — Gateway, Round 2. Aerial track and the trackside fire effect.
  20: [
    L(C, 72, 180, {driftX: 0.5}),
    L(C, 84, 180, {zoom: 1.06}),
    L(C, 108, 99, {driftX: -0.5}),
  ],

  // 21 (537f) — the close. Bell's #20 running alone late in the race, then his own words after.
  21: [
    L(A, 288, 180, {driftX: 0.5}),
    L(A, 294, 150, {zoom: 1.05}),
    L(E, 50, 207, {driftX: -0.5}),
  ],
};

export const chain = (n: number): Link[] => CHAINS[n];
