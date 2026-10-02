/**
 * Scene -> bed clips. Rule for this project: no game/gameplay clips at all — every bed here is
 * real footage of the real Cleetus McFarland. Per the 3-second cap on any single clip, every
 * scene is built from short internal cuts (see each Scene component's CUT_FRAMES) rather than
 * one clip held for the whole scene.
 *
 * Four verified real sources, reused from the cleetusdev1 project's own research (official
 * NASCAR YouTube uploads, QC'd clean here — no name/lower-third graphics, just ordinary sponsor
 * branding on his own suit/car which is fine):
 *   - hook-forehead.mp4     Cleetus + a FOX pit reporter, Talladega pre-race, 86.31s.
 *   - talladega-mid.mp4     His own in-car camera at Talladega, pack racing, 160s.
 *   - daytona-truck.mp4     Real Truck-series crash footage (his 2026 Truck debut), 63.26s —
 *                           used only in its clean early section (blue car, no ambiguous other-
 *                           driver frames).
 *   - talladega-reaction.mp4 Cleetus's own post-race reaction/interview, 231.92s.
 *
 * (talladega-finish.mp4 was deliberately skipped — same in-car camera rig as talladega-mid.mp4,
 * so using both would just repeat the same shot. dd3-cleetus30.mp4 was skipped entirely: it is
 * confirmed NASCAR-26-game render footage, not real.)
 *
 * Every scene mixes two different sources (no scene repeats one source twice), and no two
 * consecutive scenes share a source at the cut boundary.
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

const P = (name: string) => `bed-pool/${name}`;

const HOOK = P('hook-forehead.mp4');
const MID = P('talladega-mid.mp4');
const TRUCK = P('daytona-truck.mp4');
const REACT = P('talladega-reaction.mp4');

export const SCENE1_CUTS: Bed[] = [
  // Cleetus on camera at Talladega — the hook.
  {src: HOOK, startFrom: 3, span: 2.6, zoom: 1.1, driftX: 0.7},
  {src: MID, startFrom: 5, span: 2.6, zoom: 1.12, driftX: -0.8},
];

export const SCENE2_CUTS: Bed[] = [
  {src: HOOK, startFrom: 20, span: 2.3, zoom: 1.08, driftX: -0.6},
  // Real Truck-series footage — matches "Truck Series race" directly.
  {src: TRUCK, startFrom: 5, span: 2.3, zoom: 1.1, driftX: 0.7},
];

export const SCENE3_CUTS: Bed[] = [
  {src: REACT, startFrom: 8, span: 2.2, zoom: 1.08, driftX: 0.6},
  {src: MID, startFrom: 40, span: 2.2, zoom: 1.1, driftX: -0.7},
];

export const SCENE4_CUTS: Bed[] = [
  {src: TRUCK, startFrom: 15, span: 2.4, zoom: 1.1, driftX: -0.7},
  {src: REACT, startFrom: 25, span: 2.4, zoom: 1.08, driftX: 0.6},
];
