/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Every range is used once; playbackRate is pinned to 1 and each bed
 * is baked just long enough for its cut. See bake.mjs for source verification notes (NASCAR official Bristol footage + Blaney Kansas media session).
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

// "But Ryan Blaney is still carrying a black eye from his Bristol fight with Carson Hocevar."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1), bed('a3', 0.1)];

// "But now Blaney has revealed the fight was the result of weeks of frustration, not just one wreck."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1), bed('b3', 0.1), bed('b4', 0)];

// "He also says NASCAR made the right call by giving neither driver a penalty."
export const SCENE3_CUTS: Bed[] = [bed('c1', -0.1), bed('c2', 0.1), bed('c3', 0)];

// "But is this rivalry really over?"
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1)];