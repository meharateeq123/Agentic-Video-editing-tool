/**
 * Scene -> bed clips. Rule: no game/gameplay footage at all. Reuses the three real, already
 * QC'd Christopher Bell sources from the bell1 project (same driver, same footage library) —
 * fresh disjoint offsets per cut so nothing repeats within this film. Per the 3-second cap, every
 * scene is built from short internal cuts rather than one held clip.
 *
 *   - bell-battle-raw.mp4   Wide aerial: Bell/Logano pack racing at Darlington, 99.48s.
 *   - bell-playoffs-raw.mp4 Wide aerial: green-flag grid start + pack racing, 54.54s.
 *   - bell-burnout-raw.mp4  Close burnout smoke + in-car cockpit celebration POV, 45.22s.
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
  {src: BURNOUT, startFrom: 2, span: 2.4, zoom: 1.12, driftX: 0.7},
  {src: BATTLE, startFrom: 2, span: 2.4, zoom: 1.1, driftX: -0.8},
];

export const SCENE2_CUTS: Bed[] = [
  {src: PLAYOFFS, startFrom: 6, span: 3.0, zoom: 1.08, driftX: -0.7},
  {src: BATTLE, startFrom: 20, span: 3.0, zoom: 1.1, driftX: 0.8},
];

export const SCENE3_CUTS: Bed[] = [
  {src: BATTLE, startFrom: 40, span: 2.6, zoom: 1.1, driftX: -0.6},
  {src: PLAYOFFS, startFrom: 24, span: 2.6, zoom: 1.08, driftX: 0.7},
];

export const SCENE4_CUTS: Bed[] = [
  {src: BURNOUT, startFrom: 20, span: 2.9, zoom: 1.08, driftX: 0.6},
  {src: PLAYOFFS, startFrom: 2, span: 2.9, zoom: 1.1, driftX: -0.7},
];

export const SCENE5_CUTS: Bed[] = [
  // Same closing cockpit-celebration moment used to close bell1 — his face, for the button line.
  {src: BURNOUT, startFrom: 33, span: 1.5, zoom: 1.1, driftX: -0.5},
];
