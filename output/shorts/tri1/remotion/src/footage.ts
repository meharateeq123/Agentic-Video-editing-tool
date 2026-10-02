/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. All real footage:
 *   d1 d2 d3 e1 e2   Drone Snap, "Venice Beach & Venice Canals in 4K" (0irnwM7VhIk) - Venice Beach and the LA coastline
 *   f1 f2 k1         Gwen Jorgensen, "Olympic Triathlon LA 2028 Swim Course Preview" (IODb4LERD78) - the swim, filmed on the Venice Beach course
 *   g1               World Triathlon, "HIGHLIGHTS - WOMEN'S 2026 WTCS WEIHAI" (eI8xXcfvg_o) - the bike pack
 *   r1 m1 m2 m3      Olympic Games, "Cassandre Beaugrand ... Paris 2024" (65e-cV2S1Ko) - the women's Olympic triathlon: run, finish, victory ceremony
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

// "The 2028 Olympic triathlon is coming to Venice Beach, and the course looks incredible."
export const SCENE1_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1), bed('d3', 0.1)];

// "Athletes will swim 1.5 kilometers,"
export const SCENE2_CUTS: Bed[] = [bed('f1', 0.1), bed('f2', -0.1)];

// "bike 40 kilometers,"
export const SCENE3_CUTS: Bed[] = [bed('g1', 0.1)];

// "then finish with a 10-kilometer run along the iconic Los Angeles coastline."
export const SCENE4_CUTS: Bed[] = [bed('r1', 0.1), bed('e1', -0.1), bed('e2', 0.1)];

// "And here's the crazy part:"
export const SCENE5_CUTS: Bed[] = [bed('k1', 0.1)];

// "the women's race will award the first Olympic medal of LA 2028!"
export const SCENE6_CUTS: Bed[] = [bed('m1', 0.1), bed('m2', -0.1), bed('m3', 0.1)];
