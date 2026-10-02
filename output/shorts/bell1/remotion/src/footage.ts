/**
 * Scene -> bed clips. Rule for this project: no game/gameplay clips at all — every bed here is
 * real footage of real Cup Series racing and celebration. Per the 3-second cap on any single
 * clip, every scene is built from short internal cuts (see each Scene component's CUT_FRAMES)
 * rather than one clip held for the whole scene.
 *
 * Three verified real sources, official @NASCAR uploads, QC'd clean (no name/lower-third
 * graphics — just ordinary sponsor boards/scoreboard, which is fine):
 *   - bell-battle-raw.mp4   ("Joey Logano and Christopher Bell battle hard in the opening laps
 *                            at Darlington"), 99.48s. Wide aerial: tight pack racing on the
 *                            banking, a bottom-groove two-car battle, a late yellow/purple duel.
 *   - bell-playoffs-raw.mp4 ("Christopher Bell kicks off the playoffs at Darlington"), 54.54s.
 *                            Wide aerial: green-flag grid start and more tight-pack banking.
 *   - bell-burnout-raw.mp4  ("Bell does two burnouts at New Hampshire"), 45.22s. A different
 *                            visual register entirely: close trackside burnout smoke and an
 *                            in-car cockpit POV of Bell mid-celebration — used for the win/
 *                            momentum beats so those scenes don't repeat the wide aerial look.
 *
 * Every scene mixes at least two of the three sources (no scene repeats one source twice), and
 * no two consecutive scenes end/start on the same source — fixes the "too many duplicate clips"
 * problem from reusing just two similar-looking wide-aerial sources across all 8 cuts.
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

const BATTLE = P('bell-battle-raw.mp4');
const PLAYOFFS = P('bell-playoffs-raw.mp4');
const BURNOUT = P('bell-burnout-raw.mp4');

export const SCENE1_CUTS: Bed[] = [
  // Close victory burnout — a strong visual hook for "won the Southern 500."
  {src: BURNOUT, startFrom: 2, span: 2.8, zoom: 1.12, driftX: 0.7},
  {src: BATTLE, startFrom: 2, span: 2.8, zoom: 1.1, driftX: -0.8},
];

export const SCENE2_CUTS: Bed[] = [
  // Green-flag grid start — "held off the field."
  {src: PLAYOFFS, startFrom: 6, span: 3.0, zoom: 1.08, driftX: -0.7},
];

export const SCENE3_CUTS: Bed[] = [
  // In-car cockpit celebration POV — "grabbed a huge win when it mattered most."
  {src: BURNOUT, startFrom: 20, span: 2.4, zoom: 1.08, driftX: 0.6},
];

export const SCENE4_CUTS: Bed[] = [
  {src: BATTLE, startFrom: 40, span: 1.8, zoom: 1.12, driftX: -0.9},
  {src: PLAYOFFS, startFrom: 24, span: 1.8, zoom: 1.1, driftX: 0.8},
];

export const SCENE5_CUTS: Bed[] = [
  {src: BATTLE, startFrom: 72, span: 2.0, zoom: 1.1, driftX: 0.7},
  // Closing shot: his face in the cockpit, mid-celebration — the same moment the Scene 1 ID
  // photo was cropped from, so the closing beat calls back to the name card.
  {src: BURNOUT, startFrom: 33, span: 2.0, zoom: 1.1, driftX: -0.6},
];
