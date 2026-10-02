/**
 * Scene -> bed clips. Rules: no game footage, and no clip reused from any earlier film or short.
 * bell1/bell2 used Darlington footage; gibbs3 used NBC's 2025 Night Race reel (bwb0H_19a_E) and
 * the 19:00-22:10 stretch of NBC's Gateway reel. None of the clips below appear in any of them.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *
 *   - gw-wreck / gw-after / gw-overhead   "NASCAR Cup Series 2026: Chase continues at WWTR |
 *     EXTENDED HIGHLIGHTS | Motorsports on NBC" (ZMwqXq8N8fY), 18:10-18:59 only - the late
 *     multi-car wreck the commentary puts Bell in ("Berry is in it. Bell, that was massive"). No
 *     car number is readable in the crop, so nothing on screen claims which car is Bell's.
 *   - night-front / win-lap / win-burnout / night-battle / night-battle-b / bell-climb / bell-arms
 *     "Bristol Delivers Playoff Fireworks | 2025 NASCAR Cup Series Extended Highlights" (NASCAR,
 *     rlGeh4sBXfs). Bell's No. 20 DeWalt Toyota; "BELL" is on the roof rail in bell-climb.
 *   - bell-interview   "Christopher Bell Reacts to INTENSE Bristol Finish" (NASCAR, YxFybTYTFyk).
 *
 * Facts on screen (motorsport.com, NASCAR.com): Chase standings after Gateway - Hamlin 2,168,
 * Larson 2,159 (-9), Bell 2,150 (-18), Bell 3rd. Bell won the 2025 Bass Pro Shops Night Race.
 */

export type Bed = {
  src: string;
  startFrom: number;
  span: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
};

const P = (name: string) => `bed-pool/${name}.mp4`;

export const BELL_ID = 'id/bell-id.jpg';

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  // The late Gateway wreck as it starts.
  bed('gw-wreck', 1.8, 0.3),
  // The field slowing past the smoke.
  bed('gw-after', 2.2, -0.3),
  // The overhead replay, on "late-race chaos".
  bed('gw-overhead', 2.2, 0.3),
];

export const SCENE2_CUTS: Bed[] = [
  // Bristol's frontstretch under the lights.
  bed('night-front', 2.5, -0.3),
];

export const SCENE3_CUTS: Bed[] = [
  // The No. 20 after winning the 2025 Night Race.
  bed('win-lap', 1.8, 0.3),
  // The burnout.
  bed('win-burnout', 1.8, -0.3),
];

export const SCENE4_CUTS: Bed[] = [
  // Bell's post-race interview.
  bed('bell-interview', 2.6, 0.3),
  // The No. 20 racing for the win.
  bed('night-battle-b', 2.2, -0.3),
];

export const SCENE5_CUTS: Bed[] = [
  // The No. 20 side by side on the last lap, on "can't afford another bad race".
  bed('night-battle', 1.8, 0.3),
  // Bell climbing out, on "Can Bell strike back".
  bed('bell-climb', 2.0, -0.3),
  // Arms up under the lights, on "under the lights".
  bed('bell-arms', 3.0, 0.3),
];
