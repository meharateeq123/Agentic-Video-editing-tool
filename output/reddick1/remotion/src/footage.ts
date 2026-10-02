/**
 * Scene -> bed clip. Every scene has a bed and the bed plays for the whole scene, first frame
 * to last. This film runs long scenes (up to ~30s) against a footage pipeline that by default
 * downloads only ~10s per scene, so roughly half the scenes needed a second, longer fetch from
 * the same source video rather than stretching a 10s clip into extreme slow motion to cover a
 * 25-30s scene.
 *
 * Rejected at QC and deleted: an American Flat Track (motorcycle dirt oval — wrong sport
 * entirely), an iRacing/sim-racing broadcast ("Reddick races with fans on virtual speedway" —
 * fake, not real footage), and a 1987 ARCA pit-crew history documentary (completely unrelated).
 * Scene 1 was upgraded from a real-but-off-topic Xfinity Series champion celebration to Reddick
 * and Michael Jordan's actual 2026 Cup Series Daytona 500 win.
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

const F = (name: string) => `auto-footage/${name}`;
const P = (name: string) => `bed-pool/${name}`;

export const BEDS: Record<number, Bed> = {
  // 1: replaced — real 2026 Daytona 500 win (Reddick + Michael Jordan), not the Xfinity clip.
  1: {src: P('reddick-daytona-win.mp4'), startFrom: 8, span: 15, driftX: 1},
  // 2: kept — Xfinity pack racing, generic mood bed for the transitional line.
  2: {src: F('02-here-s-why-darlington-could-turn-into-th.mp4'), startFrom: 0.1, span: 5, driftX: -0.8},
  // 3: motion graphic — blurred bed of Reddick's own win celebration (Daytona footage, since no
  // Goodyear 400 victory-lane footage was found) instead of generic Darlington pack racing.
  3: {src: P('reddick-daytona-win.mp4'), startFrom: 51, span: 7, driftX: 0.6},
  // 4: replaced — s04-long.mp4 carried a persistent KFC/standings-box broadcast graphic the
  // whole way through and wasn't even Reddick on screen. Swapped for Michael Jordan's real,
  // graphics-free post-race interview reacting to Reddick's Goodyear 400 win (one small
  // "MICHAEL JORDAN" name plate only, no scoreboard). Kept for reference; the scene itself now
  // cuts across four short (~7-8s) moments of this same interview instead of one held shot — see
  // SCENE4_CUTS.
  4: {src: P('s04-mj-raw.mp4'), startFrom: 25, span: 30, driftX: 1.1},
  // 5: kept for reference; the scene now cuts across real Darlington on-track action instead —
  // see SCENE5_CUTS. s05-long.mp4 was a static two-guy reaction-podcast clip that never showed
  // Darlington or a car for the scene's full ~21s.
  5: {src: P('s05-long.mp4'), startFrom: 10, span: 22, zoom: 1.08},
  // 6: kept — reaction-podcast bed, short clip fits its shorter scene.
  6: {src: F('06-to-understand-why-reddick-is-such-a-dang.mp4'), startFrom: 0.1, span: 8, driftX: -0.7},
  // 7: motion graphic — blurred Daytona-win bed behind the three stat beats.
  7: {src: P('reddick-daytona-win.mp4'), startFrom: 30, span: 21, driftX: -0.5},
  // 8: replaced — Sonoma broadcast (was American Flat Track, wrong sport).
  8: {src: P('sonoma.mp4'), startFrom: 177, span: 3, zoom: 1.1},
  // 9: replaced — real Sonoma Cup race footage, car #11 (Hamlin) visible (was iRacing sim).
  9: {src: P('sonoma.mp4'), startFrom: 64, span: 25, driftX: -1},
  // 10: kept — real on-track incident, fits its shorter scene at a mild slow-down.
  10: {src: F('10-reddick-himself-compared-the-season-to-a.mp4'), startFrom: 0.1, span: 10, driftX: 0.9},
  // 11: motion graphic — blurred Sonoma bed behind the deficit card.
  11: {src: P('sonoma.mp4'), startFrom: 140, span: 6, driftX: 0.5},
  // 12: replaced — same Chastain/Hamlin/Elliott WWT source, longer section.
  12: {src: P('s12-long.mp4'), startFrom: 20, span: 18, driftX: -1},
  // 13: replaced — Sonoma aerial pack shot (was a 1987 ARCA documentary, unrelated).
  13: {src: P('sonoma.mp4'), startFrom: 100, span: 13, zoom: 1.06},
  // 14: kept — real Darlington 500 pack racing, mild slow-down.
  14: {src: F('14-that-s-not-a-small-break-that-s-a-driver.mp4'), startFrom: 0.1, span: 10, driftX: 1},
  // 15: kept — Reddick's own Darlington Next Gen onboard.
  15: {src: F('15-this-isn-t-just-about-one-win-in-march-r.mp4'), startFrom: 0.1, span: 10, driftX: -0.6},
  // 16: replaced — same Darlington playoff-drama source, longer section.
  16: {src: P('s16-long.mp4'), startFrom: 20, span: 26, driftX: 0.9},
  // 17: replaced — Backseat Drivers panel + Darlington wrecks, longer section.
  17: {src: P('s17-18-long.mp4'), startFrom: 10, span: 24, driftX: -0.8},
  // 18: replaced — same Backseat Drivers source, a disjoint later moment.
  18: {src: P('s17-18-long.mp4'), startFrom: 90, span: 19, zoom: 1.07},
  // 19: replaced — Darlington night race, longer section (driver interviews, onboard sunset).
  19: {src: P('s19-long.mp4'), startFrom: 20, span: 24, driftX: 1},
  // 20: replaced — same Actions Detrimental reaction-podcast source, longer section.
  20: {src: P('s20-long.mp4'), startFrom: 15, span: 28, driftX: -0.7},
  // 21: kept — real Reddick COTA race action, mild slow-down for the closing line.
  21: {src: F('21-the-chase-always-starts-at-the-track-tha.mp4'), startFrom: 0.1, span: 10, driftX: 0.8},
};

export const bed = (n: number): Bed => BEDS[n];

/**
 * Scene 4 cuts across four short moments of the same Michael Jordan interview rather than
 * holding one clip stretched across the full ~30s scene — matches the short-cut pacing used
 * everywhere else, just sourced from one clean interview instead of four different videos.
 */
export const SCENE4_CUTS: Bed[] = [
  // Reddick #45, final laps, leading — real on-track action.
  {src: P('s04-replacement-raw.mp4'), startFrom: 8, span: 5.5, driftX: 0.8},
  // Same leading run, a later disjoint moment.
  {src: P('s04-replacement-raw.mp4'), startFrom: 14, span: 5.5, driftX: -0.6},
  // The one Jordan-reaction cut kept, brief rather than held the whole scene.
  {src: P('s04-mj-raw.mp4'), startFrom: 32, span: 5.5, driftX: -0.8},
  // Reddick's car, victory close-up with the crowd.
  {src: P('s04-replacement-raw.mp4'), startFrom: 54, span: 5.5, driftX: 0.9},
  // Post-win celebration donuts, early moment.
  {src: P('s04-replacement-raw.mp4'), startFrom: 78, span: 5.5, driftX: -0.7},
  // Donuts continue — pairs with the finishing-margin card.
  {src: P('s04-replacement-raw.mp4'), startFrom: 85, span: 6.5, driftX: 0.7},
];

/**
 * Scene 5 cuts — real Cook Out Southern 500 (Darlington) broadcast footage, official @NASCARonFOX
 * upload, from the 100-190s section of the full highlights video. Verified clean at these exact
 * offsets: tight pack racing on the banking (t=3, t=12), a dusty low-sun turn (t=21), and a real
 * pit stop (t=57). Avoided: t≈33, which carries an NBC "Football Night in America" promo insert
 * over part of the frame.
 */
export const SCENE5_CUTS: Bed[] = [
  {src: P('s05-southern500-raw.mp4'), startFrom: 3, span: 6, driftX: 0.7},
  {src: P('s05-southern500-raw.mp4'), startFrom: 12, span: 6, driftX: -0.6},
  {src: P('s05-southern500-raw.mp4'), startFrom: 21, span: 6, driftX: 0.8},
  {src: P('s05-southern500-raw.mp4'), startFrom: 57, span: 6.7, driftX: -0.7},
];
