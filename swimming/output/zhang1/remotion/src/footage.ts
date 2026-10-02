/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Every range is used once; playbackRate is pinned to 1 and each bed
 * is baked just long enough for its cut. All from the host broadcast of Aichi-Nagoya 2026 swimming day 6 (see bake.mjs).
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

// "The Chinese swimming star defended her Asian Games title in the 50-meter butterfly,"
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1), bed('a3', 0.1), bed('a4', 0)];

// "touching in 25.41 to take another gold medal."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0), bed('b2', -0.1), bed('b3', 0.1)];

// "She led a Chinese one-two finish with Wu Qingfeng taking silver,"
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.1), bed('c3', 0.1), bed('c4', -0.1)];

// "while Japan's Rikako Ikee grabbed bronze."
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1), bed('d3', 0.1)];

// "At the end of the Games, Zhang Yufei had added two more medals to her incredible career,"
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.1), bed('e2', -0.1), bed('e3', 0.1), bed('e4', -0.1), bed('e5', 0.1)];

// "and she's still one of swimming's biggest stars."
export const SCENE6_CUTS: Bed[] = [bed('f1', 0.1), bed('f2', -0.1), bed('f3', 0.1)];