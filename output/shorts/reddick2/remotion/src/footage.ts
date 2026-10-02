/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from an earlier short
 * or long-form film in this library. All footage is pre-cropped to 9:16 (720x1280):
 *
 *   - reddick-pack / reddick-airborne / reddick-wall   NASCAR Nation News, "Tyler Reddick GOES
 *                     AIRBORNE in Wild Gateway Wreck — Fans Are STUNNED" (vJlpFfcVDyA,
 *                     2026-09-14). Real broadcast footage: the No. 45 tangled with another car
 *                     at Gateway (0.8-3s, the "went airborne" moment), the No. 45 making wall
 *                     contact (3-5.4s), and the field racing (198-201.5s).
 *   - bristol3-a / bristol3-b   Knips_Kombinat, "Bristol Motor Speedway | short | DJI Air 2S"
 *                     (w-mvGLCXMyE, 2025-09-29). A top-down drone shot of the oval (5-8.2s) and
 *                     the Bristol Dragway sign at the complex entrance (40-43s).
 *
 * Facts on screen: Reddick made contact with Daniel Suarez and hit the wall on Lap 3, was later
 * caught in another major wreck (car went airborne off another car), and finished 25th - now 42
 * points behind Chase leader Denny Hamlin heading into Bristol.
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

const PACK = P('reddick-pack.mp4');
const AIRBORNE = P('reddick-airborne.mp4');
const WALL = P('reddick-wall.mp4');
const BRISTOL_A = P('bristol3-a.mp4');
const BRISTOL_B = P('bristol3-b.mp4');

export const SCENE1_CUTS: Bed[] = [{src: PACK, startFrom: 0.2, span: 3.2, zoom: 1.08, driftX: 0.3}];

export const SCENE2_CUTS: Bed[] = [
  {src: WALL, startFrom: 0.1, span: 2.2, zoom: 1.08, driftX: -0.3},
  {src: AIRBORNE, startFrom: 0.1, span: 2.0, zoom: 1.08, driftX: 0.3},
  {src: PACK, startFrom: 2.6, span: 2.0, zoom: 1.08, driftX: -0.3},
];

export const SCENE3_CUTS: Bed[] = [{src: BRISTOL_A, startFrom: 0.2, span: 2.9, zoom: 1.06, driftX: -0.3}];

export const SCENE4_CUTS: Bed[] = [{src: BRISTOL_B, startFrom: 0.2, span: 2.7, zoom: 1.06, driftX: 0.3}];
