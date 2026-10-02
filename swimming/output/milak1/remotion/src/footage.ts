/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Every range is used once; playbackRate is pinned to 1 and each bed
 * is baked just long enough for its cut.
 *   Paris 2026 European Championships men's 100 fly final, three broadcasts of the same race:
 *     Eurovision Sport (a1 a3 b1 b2 b3 b4 b5 c1), RTVE (a2 e1), france.tv (d1 d2 e2)
 *     - "HUN Kristof MILAK 5" lower-thirds prove Milak (a1 a2 b5 c1 d1), lane 5, white EDF cap
 *   Tokyo 2020 men's 100 fly final (Dressel's 49.45 world record): c2 (cap "DRESSEL"), c3 (graphic "C. DRESSEL WR", "NEW WR 49.45"), d3
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

// "Kristof Milak is back, and he nearly did something incredible."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1), bed('a3', 0.1)];

// "At the 2026 European Championships, Milak won the 100-meter butterfly in 49.48, setting a European record."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1), bed('b3', 0.1), bed('b4', 0), bed('b5', 0.1)];

// "But the crazy part? Caeleb Dressel's world record is 49.45."
export const SCENE3_CUTS: Bed[] = [bed('c1', -0.1), bed('c2', 0.1), bed('c3', 0)];

// "That means Milak was just 0.03 seconds away from history."
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1), bed('d3', 0.1)];

// "Could the record finally fall?"
export const SCENE5_CUTS: Bed[] = [bed('e1', -0.1), bed('e2', 0.1)];
