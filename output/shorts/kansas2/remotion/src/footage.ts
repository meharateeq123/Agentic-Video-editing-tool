/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. All NASCAR-official / NBC Kansas footage, none of it used in the
 * earlier Kansas or Chase shorts:
 *   a1 a2 b2 c2 c3 d2 d4 e1   NASCAR 2024 Kansas extended highlights (57BJ8QugJXc), mid-race only - incl. #11 Hamlin vs #5 Larson (c2 c3)
 *   b1 d1                     NASCAR 2025 Kansas extended highlights (x0KT12x40CY) - restarts
 *   b3 b4 e3                  NASCAR 2026 Kansas highlights (M_N_08SXrzg) - the overtime restart, the winner's burnout
 *   c1 d3 e2                  NBC 2026 Kansas extended highlights (wzbRzXYXPP8) - the #5 pane, a restart pack, the winner in his car
 * Every range is used once. playbackRate is pinned to 1: each bed is baked just long enough for its cut.
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

// "Kansas has become one of NASCAR's wildest Chase tracks."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1)];

// "In five of the last seven races, the winning pass came in the final two laps, and four went to overtime."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1), bed('b3', 0.1), bed('b4', -0.1)];

// "Now Kyle Larson leads Denny Hamlin by just one point."
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.0), bed('c2', -0.1), bed('c3', 0.1)];

// "With the championship this close, one late caution or restart could completely flip the standings,"
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1), bed('d3', 0.1), bed('d4', -0.1)];

// "and at Kansas, the final lap can change everything."
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.1), bed('e2', 0.0), bed('e3', 0.1)];
