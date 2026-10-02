/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs with the crop window centred on Shin Ohashi in every
 * shot (the user's ask: "face frame k andar ho").
 *
 * Identity. This final had two Japanese swimmers - lane 4 OHASHI and lane 5 WATANABE - so a Japan-flag
 * cap proves nothing on its own. Ohashi is the black *arena* cap + Japan flag roundel + pink mirrored
 * goggles in lane 4; Watanabe wears a "JAPAN" wordmark cap. Every bed below is either under the
 * broadcast ticker that highlights "4 OHASHI 2:04.83 WR", or a wall shot with the lane "4" board in
 * frame. Watanabe's shots and the women's race cut into the same news package are unused.
 *
 *   b3 b4 b10            OH  WATERLIFE_MED's clean broadcast of the Asian Games 2026 Men's 200m
 *                            Breaststroke final at Aichi-Nagoya: the race, and the wall under the ticker
 *   b1 b2 b5 b6 b7 b8 b9 b11 b12
 *                        DT  Daily Top News agency close-ups of the same celebration, lane "4" in frame
 *
 * Every range is used once and no two overlap. playbackRate is pinned to 1: each bed is baked just
 * long enough for its cut plus the overlap.
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

// "Shin Ohashi JUST broke the 200 breaststroke world record, and he's only 17!"
export const SCENE1_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1)];

// "The Japanese teenager destroyed the old mark with a stunning 2:04.83, becoming the first man ever under 2:05."
// b3 is the race itself; b4 is the wall, under the 2:04.83 stamp.
export const SCENE2_CUTS: Bed[] = [bed('b3', 0.08), bed('b4', -0.1), bed('b5', 0.1)];

// "But here's the crazy part: this is only his first world record."
export const SCENE3_CUTS: Bed[] = [bed('b6', 0.1), bed('b7', -0.1)];

// "Ohashi is still just 17, meaning he has years to improve."
export const SCENE4_CUTS: Bed[] = [bed('b8', 0.1), bed('b9', -0.1)];

// "So the biggest question now is simple."
// Two cuts, not one: a single bed across this scene would have to span his celebration splash at
// 131.6-132.4, which reads as a smear. These take the clean face either side of it.
export const SCENE5_CUTS: Bed[] = [bed('b10', 0.1), bed('b13', -0.1)];

// "How fast can Shin Ohashi REALLY go?"
export const SCENE6_CUTS: Bed[] = [bed('b11', 0.1), bed('b12', -0.1)];
