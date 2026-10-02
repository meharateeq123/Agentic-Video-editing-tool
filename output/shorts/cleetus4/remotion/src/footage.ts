/**
 * Scene -> bed clips. Rule: no game/gameplay footage at all — even though the script itself
 * talks about "the latest game footage" (a NASCAR 26 reveal), every bed here is real footage of
 * the real Cleetus McFarland. The "No. 30 ARCA car at Talladega" line is illustrated with his
 * own real ARCA race footage instead of any game clip.
 *
 * Two entirely fresh real sources — NOT reused from any earlier short (cleetus2, cleetus3,
 * cleetusdev1, or the first cut of this one all used hook-forehead/talladega-mid/daytona-truck/
 * talladega-reaction; those are dropped here in favor of new downloads):
 *   - talladega-final-laps.mp4  "Talladega's Final Laps Ends in Chaotic Finish | 2026 NASCAR
 *                                ARCA Menards Series" — official broadcast, 120s section. The
 *                                running leaderboard reads "1 30 CLEETUS" throughout — real,
 *                                on-screen confirmation his No. 30 car is leading this race.
 *   - press-conference-cleetus.mp4  Same press conference, pre-cropped (ffmpeg crop=750:1080:1025:0)
 *                                so Cleetus (seated on the right of a 2-shot with Squirrel McNutt)
 *                                fills the frame instead of being cut off — the raw source is a
 *                                wide 2-person shot and the Bed component's own offX/driftX can't
 *                                shift far enough to recenter on him without the safety clamp
 *                                forcing a runaway zoom, so the crop is baked into the file itself.
 *
 * Cleetus's own photo (id/cleetus-id.jpg) is a real cropped still from the press conference (his
 * "MCFARLAND Racing" cap in frame), shown in an ID card over real footage — this library's
 * established look.
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

const FINAL = P('talladega-final-laps.mp4');
const PRESS = P('press-conference-cleetus.mp4');

export const CLEETUS_ID = 'id/cleetus-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  {src: FINAL, startFrom: 5, span: 2.0, zoom: 1.1, driftX: 0.6},
  {src: PRESS, startFrom: 20, span: 1.9, zoom: 1.12, driftX: -0.5},
];

export const SCENE2_CUTS: Bed[] = [
  {src: FINAL, startFrom: 30, span: 2.5, zoom: 1.1, driftX: 0.7},
  {src: FINAL, startFrom: 50, span: 2.5, zoom: 1.1, driftX: -0.6},
];

export const SCENE3_CUTS: Bed[] = [
  {src: PRESS, startFrom: 40, span: 2.7, zoom: 1.1, driftX: -0.5},
  {src: FINAL, startFrom: 70, span: 2.7, zoom: 1.1, driftX: 0.6},
];

export const SCENE4_CUTS: Bed[] = [
  {src: PRESS, startFrom: 60, span: 2.4, zoom: 1.1, driftX: 0.5},
  {src: FINAL, startFrom: 90, span: 2.4, zoom: 1.08, driftX: -0.7},
];

export const SCENE5_CUTS: Bed[] = [
  {src: PRESS, startFrom: 80, span: 2.1, zoom: 1.12, driftX: 0.4},
];
