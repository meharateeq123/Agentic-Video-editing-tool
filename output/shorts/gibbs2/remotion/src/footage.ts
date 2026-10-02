/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from ANY earlier short.
 * gibbs1 already covered Ty Gibbs and used gibbs-interviews-raw / gibbs-nbc-raw, and Darlington has
 * since carried bell1, keselowski1, toyota1 and byron1 (darlington-race, darlington-finish,
 * postrace, southern500-night, byron-onboard, byron-face). None of those are touched here — every
 * bed below is a fresh download of an upload no earlier short used.
 *
 *   - gibbs-face.mp4  Ty Gibbs interviewed on Darlington pit road at night, from the official
 *                     NASCAR channel. Identity is established inside the footage itself: the
 *                     broadcast runs a "TY GIBBS / DRIVER, NO. 54" lower-third over the opening
 *                     seconds, and his firesuit carries the NASCAR Cup Series patch with Monster
 *                     Energy, Toyota, Goodyear, SportClips and Interstate Batteries — the Joe
 *                     Gibbs Racing No. 54 package. Derived from gibbs-clinch.mp4 (crop below).
 *   - gateway.mp4     "Enjoy Illinois 300 at Gateway | NASCAR Cup Series Extended Highlights",
 *                     official NASCAR. Used only for the "Gateway next" beat, as track footage —
 *                     no car in it is named or implied to be Gibbs.
 *   - fox-darlington.mp4  "NASCAR Cup Series: Cook Out Southern 500 Highlights | NASCAR on FOX".
 *                     A different upload from the FOX "FINAL LAPS" clip toyota1 used. One cut
 *                     only, opening the film: Darlington at night, no driver named over it.
 *
 * gibbs-face.mp4 is PRE-CROPPED with ffmpeg (crop=460:720:190:0) rather than recentred with offX.
 * A 9:16 cover-fit of a 1280x720 frame shows only ~405px of source width, so offX cannot move a
 * subject far, and SceneBed's minScale compensation runs away into heavy zoom past roughly
 * |offX| = 15. Gibbs stands well left of centre in the wide pit-road shot, so the crop is baked in.
 *
 * Deliberately avoided: gibbs-face.mp4 t=0-8, where the burned-in "TY GIBBS" lower-third sits at
 * the same height as this film's captions and the two would collide. The identity it provides is
 * carried instead by the ID card, whose photo is a still from t=50 of this very clip.
 *
 * gateway.mp4 t=22-30 is a crash sequence — left alone, since nothing in the script describes one.
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

const GIBBS = P('gibbs-face.mp4');
const GW = P('gateway.mp4');
const FOX = P('fox-darlington.mp4');

export const GIBBS_ID = 'id/gibbs-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // Two Toyota Cup cars side by side at Darlington under the lights. Chosen over the pit-road
  // windows around t=78-84, where huge painted stall numbers (24, 51) fill the frame and would
  // read as a claim about which car this is.
  {src: FOX, startFrom: 91, span: 2.0, zoom: 1.08, driftX: 0.4},
];

export const SCENE2_CUTS: Bed[] = [
  // The cut the name-and-face card rides.
  {src: GIBBS, startFrom: 56, span: 2.4, zoom: 1.05, driftX: -0.4},
];

export const SCENE3_CUTS: Bed[] = [
  // Blurred and dimmed under the points card.
  {src: GIBBS, startFrom: 66, span: 2.4, zoom: 1.08, driftX: 0.4},
];

export const SCENE4_CUTS: Bed[] = [
  // A wide Gateway shot where no single livery dominates. Not t=4: that shot pans onto a
  // McDonald's car in close-up, and a clearly recognisable other driver's car does not belong
  // under a plate about where Gibbs races next.
  {src: GW, startFrom: 15.5, span: 1.7, zoom: 1.06, driftX: -0.5},
];

export const SCENE5_CUTS: Bed[] = [
  {src: GW, startFrom: 34, span: 1.4, zoom: 1.08, driftX: 0.5},
  {src: GW, startFrom: 86, span: 1.4, zoom: 1.06, driftX: -0.5},
];

export const SCENE6_CUTS: Bed[] = [
  // Deliberately not t=48 or t=104: a single car's number (the 8, the 22) fills those frames, and
  // a big unrelated number right before a Ty Gibbs card reads as a claim about who that car is.
  {src: GW, startFrom: 61, span: 2.2, zoom: 1.08, driftX: 0.5},
  // Back to Gibbs for the closing bookend card.
  {src: GIBBS, startFrom: 52, span: 2.2, zoom: 1.05, driftX: -0.4},
];
