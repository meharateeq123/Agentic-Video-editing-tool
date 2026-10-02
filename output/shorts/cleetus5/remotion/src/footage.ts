/**
 * Scene -> bed clips. Rules: no game/gameplay footage (even though the script is about NASCAR 26),
 * and no clip reused from any earlier short or film. Checked against cleetus1/2 (films),
 * cleetusdev1, and shorts cleetus2/3/4: none of these source videos appear there.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1 from these sources:
 *
 *   - cleetus-interview-a / -b   NASCAR, "Cleetus McFarland Reacts to First Top-5 NASCAR Finish |
 *                     2026 Rockingham Speedway" (EiGiotdP2zc, 2026-04-04). FloRacing's lower-third
 *                     on the same interview reads "#30 GARRETT MITCHELL". Source 8.5-14s / 59.5-66.5s.
 *   - mcnutt-rockingham   Peter Stratta, "Squirrel McNutt After Rockingham Top-10" (SmVYQzKnAQ8,
 *                     2026-04-04). Single-subject interview. Source 87.5-93.5s.
 *   - cleetus30-track / cleetus30-pit   FloRacing, "FULL RACE: Cleetus McFarland And Squirrell McNutt
 *                     Take On The Rock | ARCA East At Rockingham 4/4/26" (eLX7FiYnHMo). The No. 30
 *                     Kenetik Ford on track (race time ~667s, lower-third "GARRETT MITCHELL
 *                     'CLEETUS MCFARLAND'") and on pit road (~2307s). 720p is the best h264 there is.
 *   - cleetus-incar-pov / cleetus-helmet / cleetus-helmet-close / cleetus33-track   Cleetus McFarland,
 *                     "First Drive in My RCR O'Reilly's NASCAR... It's SO FAST!" (F_nqpHGsc9A,
 *                     2026-03-20). His first test in the No. 33 RCR Chevrolet at Rockingham.
 *
 * Facts on screen: NASCAR 26 (iRacing Studios) is out September 18 on PS5, Xbox Series X|S and PC
 * (NASCAR.com, 2026-07-29). Cleetus is in the game in ARCA, the Truck Series and the O'Reilly
 * Series; Squirrel McNutt (George Siciliano) drives the No. 0 in ARCA (The Daily Downforce).
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

const INTERVIEW_A = P('cleetus-interview-a.mp4');
const INTERVIEW_B = P('cleetus-interview-b.mp4');
const MCNUTT = P('mcnutt-rockingham.mp4');
const TRACK30 = P('cleetus30-track.mp4');
const PIT30 = P('cleetus30-pit.mp4');
const POV = P('cleetus-incar-pov.mp4');
const HELMET = P('cleetus-helmet.mp4');
const HELMET_CLOSE = P('cleetus-helmet-close.mp4');
const TRACK33 = P('cleetus33-track.mp4');

export const CLEETUS_ID = 'id/cleetus-rockingham-id.jpg';
export const MCNUTT_ID = 'id/mcnutt-rockingham-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // Cleetus at Rockingham, talking to the pit reporter.
  {src: INTERVIEW_A, startFrom: 1.0, span: 2.4, zoom: 1.06, driftX: 0.3},
  // Strapped into the car, helmet on.
  {src: HELMET, startFrom: 2.0, span: 2.0, zoom: 1.06, driftX: -0.3},
  // Squirrel McNutt, on "alongside Squirrel McNutt".
  {src: MCNUTT, startFrom: 1.0, span: 1.5, zoom: 1.06, driftX: 0.3},
];

export const SCENE2_CUTS: Bed[] = [
  // The No. 30 Kenetik Ford racing at Rockingham.
  {src: TRACK30, startFrom: 0.5, span: 1.2, zoom: 1.06, driftX: 0.3},
  // Same car on pit road, tyres coming off.
  // (Starts at 0.7s: before that the broadcast is still on its wide pit-road shot with a race banner.)
  {src: PIT30, startFrom: 0.7, span: 1.3, zoom: 1.06, driftX: -0.3},
];

export const SCENE3_CUTS: Bed[] = [
  // His in-car camera on track.
  {src: POV, startFrom: 1.0, span: 1.7, zoom: 1.06, driftX: 0.2},
  // The No. 33 on track past THE ROCK wall.
  // (Starts at 1.0s, once the whole car is in frame.)
  {src: TRACK33, startFrom: 1.0, span: 1.6, zoom: 1.06, driftX: -0.3},
];

export const SCENE4_CUTS: Bed[] = [
  // In-car camera again - a later stretch than scene 3 (1.0-2.7s).
  {src: POV, startFrom: 6.5, span: 1.4, zoom: 1.06, driftX: -0.2},
  // Helmet-cam close-up in the car.
  {src: HELMET_CLOSE, startFrom: 1.0, span: 1.6, zoom: 1.06, driftX: 0.3},
  // Back to Cleetus's face for the question - a later stretch than scene 1.
  {src: INTERVIEW_B, startFrom: 1.0, span: 2.2, zoom: 1.06, driftX: -0.3},
];
