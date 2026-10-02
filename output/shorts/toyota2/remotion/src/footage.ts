/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from ANY earlier short.
 * This is the sixth film off the same race weekend, so the off-limits list is long: toyota1 used
 * the FOX "FINAL LAPS" and FOX "POST-RACE INTERVIEWS" uploads, byron1 used the NASCAR official
 * extended highlights plus Byron's onboard and media-day clips, gibbs2 used Ty Gibbs' Darlington
 * pit-road interview, the FOX Southern 500 highlights reel and the official Gateway highlights,
 * and bell1/gibbs1/keselowski1 used bell-battle-raw, bell-playoffs-raw, bell-burnout-raw,
 * gibbs-nbc-raw, gibbs-interviews-raw and darlington-race. None of those appear here — all four
 * beds below are fresh downloads of uploads no earlier short has touched.
 *
 *   - darlington-battle.mp4  "Joey Logano and Christopher Bell battle hard in the opening laps at
 *                     Darlington", official NASCAR. Daylight Cup racing at Darlington with no
 *                     leaderboard sidebar. Usable 0-78s only: after that the upload runs a
 *                     "THANKS FOR WATCHING / LIKE AND SUBSCRIBE" end card.
 *   - bell-face.mp4   Christopher Bell's Southern 500 winner's press conference. Identity is
 *                     established inside the frame: the Mobil 1 cap and the Toyota Racing /
 *                     Mobil 1 / Interstate Batteries / Goodyear firesuit are the Joe Gibbs Racing
 *                     No. 20 package he won in, and the backdrop reads "NASCAR CUP SERIES — THE
 *                     CHASE" beside "COOK OUT SOUTHERN 500 — DARLINGTON".
 *                     Derived from bell-presser.mp4 (crop below).
 *   - gibbs-face.mp4  Ty Gibbs on camera in 2025. The same person gibbs2 verified against a
 *                     burned-in "TY GIBBS / DRIVER, NO. 54" broadcast plate, in a Monster Energy
 *                     cap — Monster is his Cup sponsor on the JGR No. 54.
 *                     Derived from gibbs-2025.mp4 (crop below).
 *   - gateway-oval.mp4  Official NASCAR Cup footage from World Wide Technology Raceway. Used only
 *                     to establish the track the script says is next; it is not this season's
 *                     race and no car in it is named or implied to be a Toyota contender.
 *                     Derived from wwt-raceway.mp4 (crop below).
 *
 * Three beds are PRE-CROPPED with ffmpeg rather than nudged with offX/offY. A 9:16 cover-fit only
 * ever shows about 56% of a 16:9 frame's width, so offX cannot move a subject far, and SceneBed's
 * minScale compensation runs away into heavy zoom past roughly |offX| = 15:
 *   bell-face.mp4     crop=430:720:430:0    — centres Bell in the wide press-conference shot.
 *   gibbs-face.mp4    crop=600:1080:600:0   — clears the uploader's burned-in FRONTSTRETCH
 *                     watermark, which runs along the top-left out to about x=550.
 *   gateway-oval.mp4  crop=1280:600:0:115   — drops the broadcast's top running-order ticker,
 *                     which a 9:16 crop would otherwise keep in full since it spans the width.
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

const DB = P('darlington-battle.mp4');
const BELL = P('bell-face.mp4');
const GIBBS = P('gibbs-face.mp4');
const GO = P('gateway-oval.mp4');

export const BELL_ID = 'id/bell-id.jpg';
export const GIBBS_ID = 'id/gibbs-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  {src: DB, startFrom: 3, span: 1.9, zoom: 1.08, driftX: 0.5},
  // Deliberately not t=37: the camera is mid-pan there and the frame is bare asphalt.
  {src: DB, startFrom: 12, span: 1.9, zoom: 1.1, driftX: -0.5},
];

export const SCENE2_CUTS: Bed[] = [
  // Bell's own winner's press conference — the cut his name-and-face card rides.
  {src: BELL, startFrom: 40, span: 2.1, zoom: 1.05, driftX: 0.4},
];

export const SCENE3_CUTS: Bed[] = [
  {src: DB, startFrom: 45, span: 1.6, zoom: 1.08, driftX: 0.5},
  // Blurred and dimmed under the points card.
  {src: BELL, startFrom: 95, span: 1.6, zoom: 1.06, driftX: -0.4},
];

export const SCENE4_CUTS: Bed[] = [
  // No zoom-in: the watermark forces a narrow crop, so this bed is already a tight close-up and
  // any extra push starts clipping the top of his cap.
  {src: GIBBS, startFrom: 28, span: 2.4, zoom: 1.0, driftX: 0.3},
];

export const SCENE5_CUTS: Bed[] = [
  {src: GO, startFrom: 55, span: 2.1, zoom: 1.08, driftX: -0.5},
  {src: GO, startFrom: 98, span: 2.1, zoom: 1.06, driftX: 0.5},
];

export const SCENE6_CUTS: Bed[] = [
  // Deliberately not t=62: a single car's number fills that frame, and a big unrelated number
  // under a line about Toyota reads as a claim about which car it is.
  {src: DB, startFrom: 66, span: 2.5, zoom: 1.08, driftX: -0.5},
];
