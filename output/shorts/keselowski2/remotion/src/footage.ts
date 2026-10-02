/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Every range is used once; playbackRate is pinned to 1 and each bed
 * is baked just long enough for its cut. See bake.mjs for source verification notes (both real RFK Racing lower-thirds).
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

// "Brad Keselowski's team just went through a major change before Kansas."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', 0)];

// "RFK Racing split with longtime crew chief Jeremy Bullins and 35-year-old Mike Skarbowski has now taken over the No. 6."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', 0), bed('b3', 0), bed('b4', -0.1)];

// "His first real test comes Sunday."
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.1)];

// "Can Skarbowski immediately turn things around for Keselowski?"
export const SCENE4_CUTS: Bed[] = [bed('d1', -0.1), bed('d2', 0.1)];
