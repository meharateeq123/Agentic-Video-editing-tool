/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from an earlier short.
 * All footage is from the 2026 Enjoy Illinois 300 weekend, pre-cropped to 9:16 (720x1280):
 *
 *   - logano-pole-presser   Peter Stratta, "Joey Logano: 'We're Back in the Championship
 *                     Conversation' with Gateway Pole" (IsgMJk-9uKg, 2026-09-12). Source 30-60s.
 *   - logano-at-car / logano-postrace-close   NASCAR, "What Drivers Said After Gateway | 2026 NASCAR
 *                     Cup Series" (st3dX3_-x10). Logano beside his No. 22 Shell-Pennzoil Ford
 *                     (115.5-121.5s) and in close-up (150-190s).
 *   - larson-presser   Peter Stratta, "How did Kyle Larson Beat Joey Logano at Gateway?"
 *                     (pTW7Gh4Q7Xs, 2026-09-14). Larson's winner's press conference. Source 15-45s.
 *   - logano-leads-early / logano-leads-lap228 / late-chaos-spin / late-chaos-aerial   NASCAR, "NASCAR Cup Series Highlights | 2026 World Wide Technology
 *                     Raceway" (W1u734oeW1o). NOTE: larson3 used this same highlights video, but only
 *                     its 1876-1960s stretch (final lap, finish, burnout). Nothing here comes from that
 *                     stretch: the No. 22 leading the field (229-237s, 1710-1716s, the
 *                     scoring ticker showing Logano P1) and the late-race wrecks (1546-1551s,
 *                     1673-1680s, laps 214-227). No other official race footage of this race exists.
 *
 * Facts on screen (NASCAR.com, 2026-09-12/13): Logano won the pole, won Stage 1, led a race-high
 * 96 laps and finished third behind Kyle Larson and Alex Bowman; Larson won in overtime.
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

const POLE = P('logano-pole-presser.mp4');
const LEADS_EARLY = P('logano-leads-early.mp4');
const LEADS_228 = P('logano-leads-lap228.mp4');
const CHAOS_SPIN = P('late-chaos-spin.mp4');
const CHAOS_AERIAL = P('late-chaos-aerial.mp4');
const AT_CAR = P('logano-at-car.mp4');
const LARSON = P('larson-presser.mp4');
const CLOSE = P('logano-postrace-close.mp4');

export const LOGANO_ID = 'id/logano-gateway-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // Logano at the pole press conference.
  {src: POLE, startFrom: 1, span: 1.6, zoom: 1.06, driftX: 0.3},
  // The No. 22 leading the field early (Stage 1).
  {src: LEADS_EARLY, startFrom: 0.5, span: 2.6, zoom: 1.06, driftX: -0.3},
  // Still up front on lap 228 (1.3s on; before that the No. 22 is small in the corner).
  {src: LEADS_228, startFrom: 1.3, span: 2.3, zoom: 1.06, driftX: 0.3},
];

export const SCENE2_CUTS: Bed[] = [
  // Lap 214: the wreck behind the leader.
  {src: CHAOS_SPIN, startFrom: 0.2, span: 1.4, zoom: 1.06, driftX: -0.3},
  // The multi-car wreck from the air.
  {src: CHAOS_AERIAL, startFrom: 1.5, span: 1.6, zoom: 1.06, driftX: 0.3},
];

export const SCENE3_CUTS: Bed[] = [
  // Logano beside his car after the race.
  {src: AT_CAR, startFrom: 0.3, span: 2.2, zoom: 1.06, driftX: 0.3},
  // The winner, Kyle Larson, in his press conference.
  {src: LARSON, startFrom: 2, span: 2.4, zoom: 1.06, driftX: -0.3},
];

export const SCENE4_CUTS: Bed[] = [
  // The No. 22 at the head of the field — a later stretch of the clip than scene 1 (0.5-3.1s).
  {src: LEADS_EARLY, startFrom: 3.2, span: 2.0, zoom: 1.06, driftX: -0.3},
  // Logano after the race, the serious stretch.
  {src: CLOSE, startFrom: 30, span: 2.6, zoom: 1.06, driftX: 0.3},
];

export const SCENE5_CUTS: Bed[] = [
  // Logano after the race — a different stretch from scene 4 (30-32.6s).
  {src: CLOSE, startFrom: 6, span: 2.8, zoom: 1.06, driftX: -0.3},
];
