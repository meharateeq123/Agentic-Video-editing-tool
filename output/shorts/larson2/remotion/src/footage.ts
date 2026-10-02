/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from ANY earlier short or
 * film. Off-limits Gateway sources already used elsewhere: gibbs2's and toyota2's 2022 "Enjoy
 * Illinois 300 Extended Highlights", and logano1's KSDK drone videos plus NASCAR's 2025 full-race
 * replay. larson1 used the FOX Southern 500 post-race interviews, so none of those appear here.
 * All five beds below are fresh downloads, pre-cropped to 9:16 with ffmpeg (720x1280):
 *
 *   - larson-gateway-presser.mp4  Peter Stratta, "Kyle Larson: 'I Feel We Can be Dangerous' in the
 *                     Chase" (2QMx7H7DaCY, uploaded 2026-09-12). Larson at the Gateway media
 *                     centre this weekend: HendrickCars.com cap, backdrop reads "Enjoy Illinois
 *                     300 / World Wide Technology Raceway / NASCAR Cup Series — The Chase".
 *                     Source 10-70s, crop=608:1080:700:0 — clears the uploader's logo (top right)
 *                     and name tag (bottom right).
 *   - logano-gateway.mp4  Braking Bob, "NASCAR Chase Drivers Talk Gateway Weekend After Practice &
 *                     Qualifying" (hAPP4wsdVrg, 2026-09-12). Logano's segment: No. 22
 *                     Shell-Pennzoil cap, Shell-Pennzoil Ford firesuit with the "Cup Series
 *                     Champion 3X" patch. Source 162-184s, crop=608:1080:880:0.
 *   - larson-darlington-night.mp4  Frontstretch, "Kyle Larson Doesn't Regret Staying Out Late at
 *                     Darlington" (G_eKHjAiXUk, 2026-09-07). Larson at night on pit road in his
 *                     No. 5 HendrickCars.com cap and firesuit. Source 120-200s,
 *                     crop=404:720:376:0 — clears the FRONTSTRETCH logo (top left, to x=370) and
 *                     the My Place hotels ad (bottom right, from x=850).
 *   - gateway-front-row.mp4  NASCAR on FOX, "OVERTIME: Joey Logano, Kyle Busch battle back-and-forth
 *                     for win at Gateway" (C0w9-4QOZog, 2022). The field doubled up on the
 *                     frontstretch. Source 2-14s, top 14% cropped off to drop the OVERTIME banner.
 *   - gateway-green-flag.mp4  NASCAR, "Gateway Turns Up the Playoff Heat | 2025 NASCAR Cup Series
 *                     Extended Highlights" (50X_h1q0LXI). The green-flag start. Source 38-62s,
 *                     crop=608:1080:656:0 — the leaderboard sidebar sits outside the crop. Clean
 *                     for 0-14s only; after that it cuts away to other shots.
 *
 * The two race beds are track footage from earlier Gateway races, used only for the "attack from
 * the opening laps" line. No car in them is named or implied to be Larson's.
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

const PRESSER = P('larson-gateway-presser.mp4');
const LOGANO = P('logano-gateway.mp4');
const NIGHT = P('larson-darlington-night.mp4');
const FRONT = P('gateway-front-row.mp4');
const GREEN = P('gateway-green-flag.mp4');

export const LARSON_ID = 'id/larson-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // Larson mid-answer at this weekend's Gateway presser — the cut his ID card rides.
  {src: PRESSER, startFrom: 8, span: 3.4, zoom: 1.08, driftX: 0.4},
];

export const SCENE2_CUTS: Bed[] = [
  // Not t=0-2: the cap is cropped at the top edge there.
  {src: LOGANO, startFrom: 3, span: 3.0, zoom: 1.08, driftX: -0.4},
];

export const SCENE3_CUTS: Bed[] = [
  // The field doubled up, cars side by side — from t=5, after the crowd shot.
  {src: FRONT, startFrom: 5, span: 2.7, zoom: 1.08, driftX: 0.5},
  {src: GREEN, startFrom: 6, span: 2.8, zoom: 1.08, driftX: -0.5},
];

export const SCENE4_CUTS: Bed[] = [
  // Not t=20-22: the phone camera swings in there and the shot is a half-cropped, eyes-down frame.
  {src: NIGHT, startFrom: 26, span: 4.0, zoom: 1.05, driftX: 0.3},
];

export const SCENE5_CUTS: Bed[] = [
  // A different stretch of the presser than scene 1 (8-11.4s): the serious, straight-on look.
  {src: PRESSER, startFrom: 42, span: 3.6, zoom: 1.08, driftX: -0.3},
];
