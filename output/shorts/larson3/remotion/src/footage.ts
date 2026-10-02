/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from ANY earlier short or
 * film. larson2 used chase-talk, the FOX 2022 Gateway overtime clip, NASCAR's 2025 Gateway
 * highlights, Larson's Gateway presser and his Darlington interview; blaney1 used Blaney's pressers,
 * the 2024 Gateway finish and Frontstretch's March Hamlin interview. None of those appear here.
 * Every bed is from the 2026 Enjoy Illinois 300 itself (Sep 13, 2026), pre-cropped to 9:16
 * (720x1280) with ffmpeg:
 *
 *   - larson-final-lap / larson-finish-line / larson-incar / larson-window / larson-burnout-close /
 *     larson-burnout-fence   NASCAR, "NASCAR Cup Series Highlights | 2026 World Wide Technology
 *                     Raceway" (W1u734oeW1o). Source 1876-1960s: the No. 5 HendrickCars.com Chevrolet
 *                     leading the final overtime lap, stopping at the line, Larson in the window,
 *                     the burnout. Crops sit right of the scoring ticker on the left edge.
 *   - larson-postrace-usa   USA Sports, "LAST WORD from the Enjoy Illinois 300 at Gateway"
 *                     (glzPhRIIhNU). Larson's winner interview on the frontstretch. Source 60-118s.
 *   - hamlin-gateway-face   Frontstretch, "Denny Hamlin Finishes 9th, Talks About Red Flags
 *                     Contributing to Brake Problems" (gTi7goKYIQk, 2026-09-14). Source 20-80s,
 *                     cropped clear of the Frontstretch banner (top left) and donate bug (bottom).
 *
 * Facts on screen (NASCAR.com recap, 2026-09-13): Larson won in double overtime, snapping a
 * 51-race winless drought, and moved to second in the Chase standings, nine points behind Hamlin.
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

const FINAL_LAP = P('larson-final-lap.mp4');
const FINISH = P('larson-finish-line.mp4');
const INCAR = P('larson-incar.mp4');
const WINDOW = P('larson-window.mp4');
const BURNOUT = P('larson-burnout-close.mp4');
const FENCE = P('larson-burnout-fence.mp4');
const INTERVIEW = P('larson-postrace-usa.mp4');
const HAMLIN = P('hamlin-gw-face.mp4');

export const LARSON_ID = 'id/larson-gateway-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // The No. 5 alone out front on the last overtime lap. Not t=7+: the camera moves to other cars.
  {src: FINAL_LAP, startFrom: 3.8, span: 2.8, zoom: 1.08, driftX: 0.4},
];

export const SCENE2_CUTS: Bed[] = [
  // Stopped at the start/finish line, then Larson out the window with his fist up.
  // From 2.4s: the side-on shot of the car stopped at the line. Before ~2.3s it is the aerial of
  // the corner, with the car leaving frame right.
  {src: FINISH, startFrom: 2.4, span: 2.0, zoom: 1.06, driftX: -0.3},
  {src: WINDOW, startFrom: 0.2, span: 2.2, zoom: 1.06, driftX: 0.3},
];

export const SCENE3_CUTS: Bed[] = [
  // The burnout close-up, LARSON on the roof rail.
  {src: BURNOUT, startFrom: 0.3, span: 3.0, zoom: 1.08, driftX: 0.4},
];

export const SCENE4_CUTS: Bed[] = [
  // Larson in the car, then the points leader.
  {src: INCAR, startFrom: 0, span: 2.2, zoom: 1.06, driftX: -0.3},
  {src: HAMLIN, startFrom: 2, span: 3.8, zoom: 1.06, driftX: 0.3},
];

export const SCENE5_CUTS: Bed[] = [
  // The burnout seen through the catchfence, crew on the wall.
  {src: FENCE, startFrom: 2.5, span: 4.2, zoom: 1.08, driftX: -0.4},
];

export const SCENE6_CUTS: Bed[] = [
  // Larson's winner interview.
  {src: INTERVIEW, startFrom: 4, span: 3.6, zoom: 1.06, driftX: 0.3},
];
