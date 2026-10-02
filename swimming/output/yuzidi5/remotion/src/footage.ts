/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Every range is used once; playbackRate is pinned to 1 and each bed
 * is baked just long enough for its cut. See bake.mjs for source verification notes.
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

// "At only 13 years old, the Chinese star won the 200 fly, 200 IM, and 400 IM, and she didn't just win."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1), bed('a3', 0.1), bed('a4', -0.1)];

// "She set games records in all three events, including an incredible 4:28.56 in the 400 IM,"
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1), bed('b3', 0.1)];

// "making her the fifth-fastest performer in history."
export const SCENE3_CUTS: Bed[] = [bed('c1', -0.1), bed('c2', 0.1)];

// "Three races. Three golds. And Yu Zidi is only 13!"
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1)];