/**
 * Scene -> bed clips. Rules: no game footage, and no clip reused from any earlier short. Checked
 * against every footage.ts in output/shorts - notably larson3 (W1u734oeW1o, glzPhRIIhNU,
 * gTi7goKYIQk), logano2 (st3dX3_-x10, pTW7Gh4Q7Xs, IsgMJk-9uKg), larson2 (2QMx7H7DaCY,
 * hAPP4wsdVrg, G_eKHjAiXUk, 50X_h1q0LXI), blaney1 (GFSZC3h5DyA, RUKOhGPPB7Y) and berry2 (2026
 * spring Bristol highlights). None of the sources below appear there.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *
 *   - larson-victory-lane / larson-trophy-interview   KSDK News, "Kyle Larson earns first win of
 *                     season at Enjoy Illinois 300" (d-np3aBM8tE, 2026-09-14). Victory lane at Gateway.
 *   - larson-gateway-presser   Peter Stratta, "Kyle Larson on Winning Kyle Busch's Rowdy Trophy"
 *                     (wRcnINPCGWk, 2026-09-14). Gateway media centre after the win.
 *   - larson-filmroom   NASCAR, "How Teamwork Helped Kyle Larson Get Back to Victory Lane | NASCAR
 *                     Film Room" (1zM9bTLsSy8, 2026-09-14). Larson full screen, no insets.
 *   - hamlin-gateway-presser-a / -b   Peter Stratta, "Denny Hamlin: A Lot to Still Learn at Gateway"
 *                     (NWoDoL1kng4, 2026-09-12). Gateway media centre.
 *   - bristol-stands / bristol-building   WJHL, "Fans show up early ahead of NASCAR Cup Series
 *                     Bristol Night Race weekend" (-z0KZwwiwX8, 2026-09-15). Cropped above the
 *                     station lower-third.
 *   - hamlin-bristol-flag / hamlin-bristol-interview   NASCAR, "'I beat your favorite driver - All
 *                     of them': Hamlin fired up after Bristol win" (LfOgrWhZFYk, 2023-09-17). His
 *                     2023 Bristol Night Race win. 720p source.
 *
 * Facts on screen: Chase standings after Gateway - Hamlin 2,168, Larson 2,159 (-9) (motorsport.com).
 * Hamlin finished 18th at Darlington and 9th at Gateway (SI / NASCAR.com).
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

const VICTORY = P('larson-victory-lane.mp4');
const TROPHY = P('larson-trophy-interview.mp4');
const LARSON_PRESSER = P('larson-gateway-presser.mp4');
const FILMROOM = P('larson-filmroom.mp4');
const HAMLIN_A = P('hamlin-gateway-presser-a.mp4');
const HAMLIN_B = P('hamlin-gateway-presser-b.mp4');
const STANDS = P('bristol-stands.mp4');
const BUILDING = P('bristol-building.mp4');
const BRISTOL_FLAG = P('hamlin-bristol-flag.mp4');
const BRISTOL_TALK = P('hamlin-bristol-interview.mp4');

export const HAMLIN_ID = 'id/hamlin-gateway-id.jpg';
export const LARSON_ID = 'id/larson-gateway-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // Larson on the roof of the No. 5 in Gateway victory lane.
  {src: VICTORY, startFrom: 3.0, span: 2.2, zoom: 1.06, driftX: 0.3},
  // Hamlin, the points leader, in the Gateway media centre.
  {src: HAMLIN_A, startFrom: 0.5, span: 3.1, zoom: 1.06, driftX: -0.3},
  // Larson in his winner's press conference, on "massive change".
  {src: LARSON_PRESSER, startFrom: 2.0, span: 1.2, zoom: 1.06, driftX: 0.3},
];

export const SCENE2_CUTS: Bed[] = [
  // Bristol Motor Speedway this week.
  {src: STANDS, startFrom: 1.0, span: 1.2, zoom: 1.06, driftX: -0.3},
  {src: BUILDING, startFrom: 0.3, span: 1.5, zoom: 1.06, driftX: 0.3},
];

export const SCENE3_CUTS: Bed[] = [
  // Larson beside the Gateway trophy.
  {src: TROPHY, startFrom: 1.0, span: 2.0, zoom: 1.06, driftX: 0.3},
  // Hamlin again - a later stretch of the presser than scene 1.
  {src: HAMLIN_B, startFrom: 0.5, span: 2.3, zoom: 1.06, driftX: -0.3},
];

export const SCENE4_CUTS: Bed[] = [
  // Hamlin at the Bristol fence with the checkered flag, 2023 Night Race.
  {src: BRISTOL_FLAG, startFrom: 0.2, span: 1.5, zoom: 1.06, driftX: 0.3},
  // Larson, on "hold off Larson".
  {src: FILMROOM, startFrom: 1.0, span: 1.4, zoom: 1.06, driftX: -0.3},
  // Hamlin under the Bristol lights.
  {src: BRISTOL_TALK, startFrom: 0.5, span: 3.4, zoom: 1.06, driftX: 0.3},
];
