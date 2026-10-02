/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Every range is used once; playbackRate is pinned to 1 and each bed
 * is baked just long enough for its cut.
 *   2026 European Championships (Paris) men's 100 free final - host feed via Eurovision/RTVE/TVR: a1 a2 c1 c2 c3 d1
 *   Singapore 2025 World Championships - WA feed via World Aquatics / TVR: a3 b1 b2 b3 b4 b5 d2 d3 e1 e2
 *   LA night skyline timelapse: e3
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

// "David Popovici remains one of the biggest names in sprint freestyle."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1), bed('a3', 0.1)];

// "His European record of 46.51 in the 100 freestyle came at the 2025 World Championships,"
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', 0), bed('b3', 0.1), bed('b4', -0.1), bed('b5', 0.1)];

// "and he has continued competing at the highest level in 2026."
export const SCENE3_CUTS: Bed[] = [bed('c1', -0.1), bed('c2', 0.1), bed('c3', 0)];

// "With the next Olympic cycle already underway, the question is simple."
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1), bed('d3', 0.1)];

// "How fast can Popovici go before LA 2028?"
export const SCENE5_CUTS: Bed[] = [bed('e1', -0.1), bed('e2', 0.1), bed('e3', 0.1)];