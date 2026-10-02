/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. This short cuts between two athletes, so each beat is
 * pinned to whichever of them the line is about.
 *
 * Identity. Ohashi's final had TWO Japanese swimmers (lane 4 OHASHI, lane 5 WATANABE), so the markers
 * from ohashi1 still apply - black arena cap + Japan flag + pink goggles, and the broadcast ticker
 * highlighting "4 OHASHI 2:04.83 WR". Marchand's two feeds name him on their own boards ("WR MARCHAND 1"
 * in Singapore, "1 MARCHAND FRA OR" in Paris) and he is alone in every close-up used here. Every Ohashi
 * range is disjoint from the ones ohashi1 used.
 *
 *   a1 a2 d1 h1  Marchand - World Aquatics, his 200m IM world record (Singapore 2025)
 *   f1           Marchand - Paris 2024 200m BREASTSTROKE gold, which is Ohashi's own event
 *   b1 b2 c1 h2  Ohashi - the host broadcast of his 200m breaststroke final
 *   d2 e1 e2 g1  Ohashi - the Reuters mixed zone afterwards
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

// "But Leon Marchand has already noticed swimming's newest rising star."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1)];

// "After Shin Ohashi broke the 200m breaststroke world record"
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.08)];

// "in 2:04.83,"
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.08)];

// "Marchand called the 17-year-old Japanese swimmer a 'scary' competitor."
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1)];

// "Ohashi is now looking toward LA 2028,"
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.1), bed('e2', -0.1)];

// "where Marchand could become one of his biggest rivals."
export const SCENE6_CUTS: Bed[] = [bed('f1', 0.1)];

// "And Ohashi says he's ready for the challenge."
export const SCENE7_CUTS: Bed[] = [bed('g1', 0.1)];

// "Could this become a HUGE Olympic battle?"
export const SCENE8_CUTS: Bed[] = [bed('h1', 0.08), bed('h2', -0.1)];
