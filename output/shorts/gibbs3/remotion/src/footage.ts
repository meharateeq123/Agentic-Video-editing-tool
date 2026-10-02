/**
 * Scene -> bed clips. Rules: no game footage, and no clip reused from any earlier film or short.
 * Earlier Gibbs shorts (gibbs1, gibbs2, toyota2) used Darlington footage; berry2 used NASCAR's own
 * 2026 spring Bristol highlight reel; hamlin3 used WJHL's -z0KZwwiwX8; blaney2 used the Gateway
 * full race replay. None of the sources below appear in any of them.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *
 *   - gw-onboard / gw-incident / gw-wreck   "NASCAR Cup Series 2026: Chase continues at WWTR |
 *     EXTENDED HIGHLIGHTS | Motorsports on NBC" (ZMwqXq8N8fY). The No. 54 in the backstretch
 *     incident and then spinning with the No. 16 in the late multi-car wreck.
 *   - bms-track / bms-stands   WJHL, "NASCAR fans flock to Bristol for race weekend" (ILrjTEsY-bg),
 *     cropped above the station lower-third.
 *   - win-car / win-burnout / gibbs-roof   NASCAR on FOX, "FINALS LAPS: Ty Gibbs grabs 1st Career
 *     NASCAR Cup Series Win at Bristol" (qFPW6VyI3hI), April 2026.
 *   - gibbs-car / gibbs-smile   NASCAR, "Ty and Joe Gibbs Celebrate First Cup Win Together | 2026
 *     Bristol Motor Speedway" (gHYC3aQ7DZE). The interview carries a "TY GIBBS / FIRST CAREER WIN"
 *     lower-third just before the stretch used here.
 *   - night-lead / night-close   "NASCAR Cup Series 2025: Bass Pro Shops Night Race | EXTENDED
 *     HIGHLIGHTS | Motorsports on NBC" (bwb0H_19a_E). The No. 54 leading ("54 - GIBBS" bug).
 *
 * Facts on screen: Gibbs finished 18th at Gateway (NASCAR.com); won the 2026 Food City 500
 * (NASCAR.com); led a race-high 201 laps in the 2025 Night Race (Frontstretch / NASCAR.com); Chase
 * standings after Gateway - Hamlin 2,168, Gibbs 2,117 (-51) (motorsport.com).
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

const P = (name: string) => `bed-pool/${name}.mp4`;

export const GIBBS_ID = 'id/gibbs-id.jpg';

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  // Gibbs's onboard at Gateway.
  bed('gw-onboard', 2.2, 0.3),
  // The No. 54 in the backstretch incident, on "finishing 18th".
  bed('gw-incident', 1.4, -0.3),
  // The No. 54 spinning in the late wreck, on "caught in the late chaos".
  bed('gw-wreck', 2.3, 0.3),
];

export const SCENE2_CUTS: Bed[] = [
  // Bristol Motor Speedway this week.
  bed('bms-track', 2.4, -0.3),
  bed('bms-stands', 2.4, 0.3),
];

export const SCENE3_CUTS: Bed[] = [
  // The No. 54 after the flag in April, on "Gibbs won at Bristol".
  bed('win-car', 1.8, 0.3),
  // The burnout, on "earlier this year".
  bed('win-burnout', 1.8, -0.3),
  // The No. 54 leading the 2025 Night Race, on "last fall he led".
  bed('night-lead', 2.5, 0.3),
  // The No. 54 in close-up, same race, on "laps there".
  bed('night-close', 1.8, -0.3),
];

export const SCENE4_CUTS: Bed[] = [
  // Gibbs at his car in victory lane.
  bed('gibbs-car', 2.0, 0.3),
  // Gibbs on the roof.
  bed('gibbs-roof', 2.0, -0.3),
  // Gibbs in his post-race interview, on "huge statement".
  bed('gibbs-smile', 2.5, 0.3),
];
