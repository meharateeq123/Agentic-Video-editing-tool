/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Every range is fresh - checked frame-by-frame
 * against everything yuzidi5/yuzidi6/yuzidi7 already used from the same source files (see the
 * comment block at the top of bake.mjs for the exact accounting). Her cap reads "...ZIDI" /
 * "CHN YU ZIDI" directly in every close-up beat; the two graphic beats (A, E) are lineup/start-list
 * shots that name her and McIntosh directly instead of a crop-and-hope guess.
 *
 * Beds carry `span` (real seconds of source) instead of a fixed playbackRate=1: the fresh windows
 * left in fly_full.mp4 and mac_yiting_200im_panpac.mp4 are short, so SceneBed gently slows each one
 * (never below ~0.45x) to cover its cut without ever running out or freezing.
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

const bed = (name: string, span: number, driftX = 0.1): Bed => ({
  src: P(name),
  startFrom: 0,
  zoom: 1.0,
  span,
  driftX,
});

// "Yu Zidi may have just started swimming's next huge rivalry." - the start-list graphic, lane 4 = YU Zidi
export const SCENE1_CUTS: Bed[] = [bed('A', 2.8, 0)];

// "At the Asian Games, the 13-year-old Chinese star swam 2:06.10 in the 200 IM,"
export const SCENE2_CUTS: Bed[] = [bed('B', 3.0, 0.1), bed('C', 2.9, -0.1)];

// "just 0.40 seconds behind Summer McIntosh's world record." - the lane-list graphic, lane 5 = MCINTOSH
export const SCENE3_CUTS: Bed[] = [bed('E', 1.5, 0)];

// "Yu also won three gold medals and set three Games records."
export const SCENE4_CUTS: Bed[] = [bed('D1', 3.0, 0.1)];

// "She's only 13, so how close can Yu get to Summer by LA 2028?"
export const SCENE5_CUTS: Bed[] = [bed('D2', 2.0, 0.1), bed('F', 1.15, -0.1)];
