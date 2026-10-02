/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from ANY earlier short or
 * film. larson2 (the short before this one) used chase-talk (hAPP4wsdVrg), the FOX 2022 Gateway
 * overtime clip, NASCAR's 2025 Gateway extended highlights, Larson's Gateway presser and his
 * Darlington interview; gibbs2/toyota2 used the 2022 Gateway highlights; logano1 used the KSDK
 * drone videos and the 2025 full-race replay. None of those appear here. All four beds are fresh
 * downloads, pre-cropped to 9:16 with ffmpeg (720x1280):
 *
 *   - blaney-presser.mp4  Peter Stratta, "Ryan Blaney: 'Us 3 Were Class of the Field, Just Took Us
 *                     Longer...'" (XJTq0Lt1Uro, 2026-03-23). Blaney on pit road: Delta cap with a
 *                     Team Penske patch, Menards / Ford firesuit. Source 0-100s, crop x=660/1920,
 *                     which clears the uploader's logo (top right) and name tag (bottom right).
 *   - blaney-pitroad.mp4  Frontstretch, "Ryan Blaney & Austin Cindric Talk Darlington Top 5 Day"
 *                     (86Gb94kaWzE, 2026-03-22). Blaney in profile, Delta cap, Menards firesuit.
 *                     Source 104-146s, top 77% only — the My Place hotels ad sits below it.
 *   - hamlin-face.mp4  Frontstretch, "Denny Hamlin: 'I Wouldn't Disagree' With Ryan Blaney Calling
 *                     Their Contact Unnecessary" (GFSZC3h5DyA, 2026-03-29). Hamlin in his teal
 *                     Bob's Discount Furniture cap and firesuit — the No. 11 package. Source
 *                     44-104s, top 77% only, clearing the ad and the mic flags.
 *   - gateway-2024-finish.mp4  NASCAR, "Ryan Blaney runs out of gas as Austin Cindric captures first
 *                     win of 2024" (RUKOhGPPB7Y). The 2024 Gateway finish: Blaney's No. 12 Menards
 *                     Ford leading, then Cindric's No. 2 Team Penske Ford taking the win. No
 *                     broadcast graphics anywhere in it. Centre crop.
 *
 * gateway-2024-finish.mp4 is from the 2024 race, used for the Penske-history line and the "Gateway
 * win" line. It is not presented as today's race.
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

const PRESSER = P('blaney-presser.mp4');
const PROFILE = P('blaney-pitroad.mp4');
const HAMLIN = P('hamlin-face.mp4');
const FINISH = P('gateway-2024-finish.mp4');

export const BLANEY_ID = 'id/blaney-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // The cut Blaney's ID card rides.
  {src: PRESSER, startFrom: 18, span: 2.2, zoom: 1.08, driftX: 0.4},
];

export const SCENE2_CUTS: Bed[] = [
  // The championship leader, straight to camera.
  {src: HAMLIN, startFrom: 8, span: 4.0, zoom: 1.08, driftX: -0.4},
];

export const SCENE3_CUTS: Bed[] = [
  // Blaney's No. 12 at Gateway in 2024.
  {src: FINISH, startFrom: 4, span: 2.6, zoom: 1.08, driftX: 0.5},
];

export const SCENE4_CUTS: Bed[] = [
  // Cindric's No. 2 Team Penske Ford on the way to the 2024 win. Not t=66-71: that is still the
  // No. 12 close-up, which scene 5 owns.
  {src: FINISH, startFrom: 72, span: 4.2, zoom: 1.08, driftX: -0.4},
];

export const SCENE5_CUTS: Bed[] = [
  // Not overlapping scene 3's 4-6.6s: the No. 12 closer up, from t=8.
  {src: FINISH, startFrom: 8, span: 2.6, zoom: 1.08, driftX: -0.5},
  {src: PROFILE, startFrom: 21, span: 2.6, zoom: 1.05, driftX: 0.4},
];

export const SCENE6_CUTS: Bed[] = [
  // A different stretch of the presser than scene 1 (18-20.2s).
  {src: PRESSER, startFrom: 60, span: 2.3, zoom: 1.08, driftX: -0.3},
];
