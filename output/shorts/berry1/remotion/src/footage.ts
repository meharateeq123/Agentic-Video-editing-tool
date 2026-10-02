/**
 * Scene -> bed clips. Rule: no game/gameplay footage at all. Two fresh real sources — neither
 * used in the last 2 shorts (bell2's bell-battle/playoffs/burnout, gibbs1's gibbs-nbc):
 *
 *   - berry-onboard-raw.mp4   Real Cup Series onboard, car 21 (Josh Berry, Wood Brothers Ford) —
 *                             confirmed by the driver-cam name/photo graphic burned into the
 *                             broadcast itself. USABLE 0-8s ONLY — a wall impact starts at ~9s.
 *   - cup-highlights-raw.mp4  Real "NASCAR Cup Series 2026: Regular-season finale at Daytona |
 *                             EXTENDED HIGHLIGHTS | Motorsports on NBC" broadcast, 120s section.
 *                             Wide pack racing; the running leaderboard graphic names "42 JH
 *                             NEMECHEK" on screen around 10-14s in, which is why that offset is
 *                             reserved for the Nemechek beat. USABLE 0-66s ONLY — past that it's
 *                             a driver-cam highlight package (split-screen PIP over a studio
 *                             backdrop), not continuous track footage.
 *
 * Josh Berry's own photo (id/berry-id.jpg) is a real cropped still pulled from his own
 * on-record interview (Wood Brothers polo visible), shown in an ID card over real footage —
 * this library's established look, not a full-bleed swap-out.
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

const ONBOARD = P('berry-onboard-raw.mp4');
const CUP = P('cup-highlights-raw.mp4');

export const BERRY_ID = 'id/berry-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  {src: CUP, startFrom: 15, span: 2.2, zoom: 1.12, driftX: 0.7},
  {src: CUP, startFrom: 20, span: 2.1, zoom: 1.1, driftX: -0.6},
];

export const SCENE2_CUTS: Bed[] = [
  {src: CUP, startFrom: 2, span: 2.6, zoom: 1.12, driftX: 0.8},
  {src: CUP, startFrom: 30, span: 2.4, zoom: 1.1, driftX: -0.7},
];

export const SCENE3_CUTS: Bed[] = [
  // Reserved: this is the exact window where the broadcast's own leaderboard graphic
  // reads "42 JH NEMECHEK" — real, on-screen confirmation for the "replacing" beat.
  {src: CUP, startFrom: 10, span: 1.6, zoom: 1.1, driftX: 0.6},
  {src: CUP, startFrom: 40, span: 1.6, zoom: 1.12, driftX: -0.6},
];

export const SCENE4_CUTS: Bed[] = [
  {src: ONBOARD, startFrom: 0, span: 2.6, zoom: 1.14, driftX: 0.4},
  {src: ONBOARD, startFrom: 4, span: 2.6, zoom: 1.14, driftX: -0.4},
];

export const SCENE5_CUTS: Bed[] = [
  {src: CUP, startFrom: 60, span: 2.4, zoom: 1.1, driftX: 0.7},
];

export const SCENE6_CUTS: Bed[] = [
  {src: CUP, startFrom: 45, span: 2.1, zoom: 1.12, driftX: -0.5},
];
