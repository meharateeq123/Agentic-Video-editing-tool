/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Every range is used once; playbackRate is pinned to 1 and each bed
 * is baked just long enough for its cut. See bake.mjs for source verification notes (fresh Kansas 2025 / Texas 2026 / Las Vegas 2026 footage).
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

// "Kansas is about to start a critical three-race stretch in the Chase."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1), bed('a3', 0.1)];

// "And Toyota has been extremely strong on 1.5-mile tracks this season,"
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1), bed('b3', 0.1), bed('b4', -0.1)];

// "while Chevrolet has won four of the last five Kansas races."
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.1), bed('c3', 0.1)];

// "With the championship fight so tight, one late restart could change everything."
export const SCENE4_CUTS: Bed[] = [bed('d1', -0.1), bed('d2', 0.1), bed('d3', -0.1), bed('d4', 0.1)];

// "Kansas could be chaos."
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.1)];