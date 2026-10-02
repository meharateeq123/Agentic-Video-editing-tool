/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from an earlier short
 * or long-form film in this library (logano2 already covered this same Gateway race - every
 * source below is a different video from logano2's, larson2/3's and blaney1/2's). All footage is
 * pre-cropped to 9:16 (720x1280):
 *
 *   - lead-corner / logano-wolfe / checkered-flag   NASCAR TODAY, "Kyle Larson Won the Enjoy
 *                     Illinois 300 at Gateway After Two Overtimes!" (PrvdDg9wibc, 2026-09-14).
 *                     The leading pack exiting a corner (54.5-58s), Logano on the pit box beside
 *                     crew chief Paul Wolfe (25-28.5s), and the checkered flag falling at the
 *                     finish line (174-178s) - "...S 300" (Illinois 300) is legible painted on the
 *                     track surface, confirming this is the real race.
 *   - logano-open / logano-bitter / logano-team / logano-51pts   NASCAR Nation News, "Joey Logano
 *                     ADMITS BITTER Truth After Gateway Heartbreak!" (LBMqIoGjvQA, 2026-09-15).
 *                     Real Logano interview footage cut into a narrated recap - his own quote ("Just
 *                     bitter at the moment that we didn't win... they beat us", 69-72.2s), Logano
 *                     laughing with Paul Wolfe in the garage (104-107.2s), and an interview close-up
 *                     during the segment that states the real 51-point gap to Hamlin (246-249.2s).
 *   - bristol-a / bristol-b   HHLT Marketing & Drone Services, "IT'S BRISTOL, BABY! Epic 4K Drone
 *                     Footage of Bristol Motor Speedway" (RdXqEbiWGck, 2026-08-27). Two different
 *                     angles of the real track facade.
 *
 * Facts on screen: Logano won the pole, won Stage 1, led a race-high 96 laps and finished third
 * behind Kyle Larson and Alex Bowman; Larson won in overtime. Logano sits seventh, 51 points
 * behind Chase leader Denny Hamlin, heading into Bristol.
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

const LEAD_CORNER = P('lead-corner.mp4');
const LOGANO_WOLFE = P('logano-wolfe.mp4');
const CHECKERED = P('checkered-flag.mp4');
const LOGANO_OPEN = P('logano-open.mp4');
const LOGANO_BITTER = P('logano-bitter.mp4');
const LOGANO_TEAM = P('logano-team.mp4');
const LOGANO_51PTS = P('logano-51pts.mp4');
const BRISTOL_A = P('bristol-a.mp4');
const BRISTOL_B = P('bristol-b.mp4');

export const LOGANO_ID = 'id/logano-gateway-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // The leading pack exiting a corner.
  {src: LEAD_CORNER, startFrom: 0.3, span: 3.2, zoom: 1.06, driftX: 0.3},
  // Logano's own interview close-up, early in the recap.
  {src: LOGANO_OPEN, startFrom: 0.2, span: 3.2, zoom: 1.06, driftX: -0.3},
];

export const SCENE2_CUTS: Bed[] = [
  // The checkered flag falling — the payoff of "changed everything".
  {src: CHECKERED, startFrom: 0.2, span: 3.7, zoom: 1.06, driftX: 0.3},
];

export const SCENE3_CUTS: Bed[] = [
  // Logano's real "bitter at the moment" quote.
  {src: LOGANO_BITTER, startFrom: 0.2, span: 2.9, zoom: 1.06, driftX: -0.3},
  // Logano and Paul Wolfe in the garage.
  {src: LOGANO_TEAM, startFrom: 0.2, span: 2.8, zoom: 1.06, driftX: 0.3},
];

export const SCENE4_CUTS: Bed[] = [
  // Bristol Motor Speedway, real drone footage.
  {src: BRISTOL_A, startFrom: 0.2, span: 2.9, zoom: 1.06, driftX: -0.3},
  // Interview close-up during the real 51-point-gap narration.
  {src: LOGANO_51PTS, startFrom: 0.2, span: 2.8, zoom: 1.06, driftX: 0.3},
];

export const SCENE5_CUTS: Bed[] = [
  // Bristol, a second angle — the next stop.
  {src: BRISTOL_B, startFrom: 0.2, span: 2.3, zoom: 1.06, driftX: -0.3},
];
