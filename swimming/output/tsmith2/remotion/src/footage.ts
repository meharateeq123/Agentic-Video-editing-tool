/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs with the crop window centred on Tatjana Smith in every shot.
 * Sources (all already vetted for the long film, but every range here is disjoint from that film's):
 *   b1 b2            Paris 2024 women's 100 br final, the walk-out - broadcast bar reads "RSA TATJANA SMITH", graphic "T. SMITH"
 *   b3 b4 b5 b8 b9 b10 b22 b24 c1   Aquapark's 2026 film about her: interview, medals, pool, Fukuoka 2023
 *                    (lane board "T. SCHOENMAKER RSA 1" and the RSA cap prove the racing shots)
 *   b21              Tokyo 2020 200 br, the green-cap close-up
 *   b11 b12          Los Angeles from the air (LA 2028)
 *   c2 c3 c4         Paris 2024 mixed zone after her last final, in her own words ("a better way to end my career")
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

// "After retiring, following the Paris 2024 Olympics,"
export const SCENE1_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1)];

// "double Olympic champion Tatjana Smith is officially back!"
export const SCENE2_CUTS: Bed[] = [bed('b3', 0.1), bed('b4', -0.1)];

// "She says she started missing the water and rediscovered her love for swimming."
export const SCENE3_CUTS: Bed[] = [bed('b5', 0.1), bed('b24', -0.1), bed('b21', 0.1), bed('b8', -0.1)];

// "But this time, she has a new challenge."
export const SCENE4_CUTS: Bed[] = [bed('b22', 0.1), bed('b9', -0.1)];

// "The 50-meter breaststroke at LA 2028 still has to qualify,"
export const SCENE5_CUTS: Bed[] = [bed('b10', 0.1), bed('b11', -0.1), bed('b12', 0.1)];

// "but at 29, Smith is ready to write a brand new chapter."
export const SCENE6_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.1), bed('c3', 0.1), bed('c4', -0.1)];
