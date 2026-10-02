/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. All NASCAR-official 2026 footage:
 *   a3 t1 u1 (Kansas)         "Kansas Final Laps ERUPT in Overtime" (VTBqA77xDE4)
 *   a1 t2 (Las Vegas)         "NASCAR Cup Series Highlights | 2026 Las Vegas Motor Speedway" (QiPbZV4zRpo)
 *   x1 x2 y2 (Las Vegas)      FOX "FINAL LAPS: Denny Hamlin takes the checkered flag at Pennzoil 400 in Las Vegas" (VYNROY3WGh0)
 *   a2 t3 u2 w1 w2 y1         "2026 Coca-Cola 600" (a_6CpnBk-uQ) - Charlotte
 *   s4a s4b s4c               "Denny Hamlin and Kyle Larson battle it out in Stage 1" (FjtMypEqYUc) - #5 Larson, #11 Hamlin
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

// "NASCAR's championship battle is entering a dangerous three-race stretch."
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1), bed('a3', 0.1)];

// "Kansas comes first, followed by Las Vegas and Charlotte,"
export const SCENE2_CUTS: Bed[] = [bed('t1', 0.1), bed('t2', -0.1), bed('t3', 0.1)];

// "all 1.5-mile tracks,"
export const SCENE3_CUTS: Bed[] = [bed('u1', 0.1), bed('u2', -0.1)];

// "and with Kyle Larson only one point ahead of Denny Hamlin,"
export const SCENE4_CUTS: Bed[] = [bed('s4a', 0.1), bed('s4b', -0.1), bed('s4c', 0.1)];

// "every mistake could be massive,"
export const SCENE5_CUTS: Bed[] = [bed('w1', 0.1), bed('w2', -0.1)];

// "three races, one championship fight,"
export const SCENE6_CUTS: Bed[] = [bed('x1', 0.1), bed('x2', -0.1)];

// "and everything could change!"
export const SCENE7_CUTS: Bed[] = [bed('y1', 0.1), bed('y2', -0.1)];
