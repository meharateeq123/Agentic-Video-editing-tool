/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs from the Kansas downloads already vetted for
 * kansas1 / kansas2 / chase2. Every range is disjoint from the ranges those shorts use
 * (flick-no-repeat-clips-across-shorts) and no two beats here overlap.
 *
 *   b1 b2 b5 b6 b9    hamlin23   "Hamlin overcomes Larson for win after last-lap pass at Kansas" -
 *                                the #11 FedEx against the #5 Hendrickcars.com, his own pit box, and his
 *                                crew celebrating. Identity is the car number, readable in every beat.
 *   b3                thriller25 2025 Kansas, the final lap
 *   b4                ot26       2026 Kansas, four laps to go
 *   b7 b8 b10 b11     ot2nd      the wild second overtime at Kansas - the restart pack
 *
 * Most beats are baked with a panning window that follows the cars (see bake.mjs); playbackRate is
 * pinned to 1 and each bed is baked just long enough for its cut plus the overlap.
 */

export type Bed = {
  src: string;
  startFrom: number;
  span?: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
  volume?: number;
  playbackRate?: number;
};

const P = (name: string) => `bed-pool/${name}.mp4`;

const bed = (name: string, driftX = 0.1): Bed => ({
  src: P(name),
  startFrom: 0,
  zoom: 1.0,
  driftX,
  playbackRate: 1,
});

// "Denny Hamlin has dominated Kansas before, but there's a problem."
export const SCENE1_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1)];

// "He's lost the last two Kansas races after overtime restarts,"
export const SCENE2_CUTS: Bed[] = [bed('b3', 0.1), bed('b4', -0.1)];

// "despite leading 290 of the last 547 laps here."
export const SCENE3_CUTS: Bed[] = [bed('b5', 0.1), bed('b6', -0.08)];

// "Now the championship fight is incredibly tight."
export const SCENE4_CUTS: Bed[] = [bed('b7', 0.1), bed('b8', -0.1)];

// "Can Hamlin finally finish the job at Kansas, or will another late restart destroy his race?"
export const SCENE5_CUTS: Bed[] = [bed('b9', 0.1), bed('b10', -0.1), bed('b11', 0.1)];
