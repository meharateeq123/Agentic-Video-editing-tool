/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs from the host broadcast of the women's 50m butterfly
 * final at Aichi-Nagoya 2026 (sections already downloaded for zhang1). Every range is disjoint from
 * the ranges zhang1 used, and no two beats share a camera setup back to back.
 *
 * Identity: her white cap is printed "ZHANG YUFEI"; the start-list and results cards name every
 * swimmer; c1 is Wu Qingfeng's own walk-out bar ("WU Qingfeng CHN 26.00"), not a guess; c2 is the
 * podium itself, with the CHN gold, CHN silver and JPN bronze all standing on it.
 *
 *   a1 start-list card   a2 her walk-out   a3 the race   b1 the results card (25.41)
 *   c1 Wu Qingfeng       c2 the podium     c3 her celebration at the wall
 *   d1 her ZHANG YUFEI cap   d2 her smiling   d3 her at the wall
 *   e1 receiving the gold    e2 her smiling with the bronze medallist
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

// "At the 2026 Asian Games, the Chinese star defended her 50-meter butterfly title, touching in 25.41."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.08), bed('a2', -0.1), bed('a3', 0.1), bed('b1', -0.08)];

// "she beat teammate Wu Qingfeng and Japan's Rikako Ikee to take another Asian Games gold."
export const SCENE2_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.08), bed('c3', 0.1)];

// "After everything she's already achieved, Zhang is still winning on the biggest stages,"
export const SCENE3_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1), bed('d3', 0.1)];

// "and the next chapter could be VERY interesting!"
export const SCENE4_CUTS: Bed[] = [bed('e1', 0.1), bed('e2', -0.1)];
