/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from ANY earlier short —
 * in particular none of berry1's sources (berry-onboard-raw.mp4, cup-highlights-raw.mp4) appear
 * here, even though that film covered the same driver.
 *
 *   - berry-josh.mp4        Josh Berry's own sit-down interview in the motorhome lot ("wood
 *                           brothers" quarter-zip + Ford Racing + DEX "21" cap confirm identity).
 *                           Pre-cropped (ffmpeg crop=480:590:550:0) so he fills the frame instead
 *                           of sharing it with the reporter, and so the channel logo and the
 *                           donate banner fall outside the frame entirely.
 *   - nemechek-legacy.mp4   Real Legacy Motor Club trackside footage — team suit, Toyota Racing
 *                           and LEGACY MOTOR CLUB branding, with a No. 42 car in shot. Used ONLY
 *                           as a team/car bed: the driver on camera is not individually
 *                           identifiable from the frame (the upload covers two Legacy drivers), so
 *                           no person-name card is ever placed over it.
 *   - cup-bristol.mp4       Official "NASCAR Cup Series Highlights | 2026 Bristol Motor Speedway",
 *                           120s section — real on-track Cup racing, visually distinct from the
 *                           superspeedway footage used in the earlier Berry film.
 *
 * Josh Berry's photo (id/berry-id.jpg) is a real still cropped from his own interview above,
 * shown in an ID card over real footage — this library's standard look.
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

const BERRY = P('berry-josh.mp4');
const LEGACY = P('nemechek-legacy.mp4');
const BRISTOL = P('cup-bristol.mp4');

export const BERRY_ID = 'id/berry-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  {src: BERRY, startFrom: 10, span: 2.0, zoom: 1.1, driftX: 0.5},
  {src: BRISTOL, startFrom: 10, span: 2.0, zoom: 1.1, driftX: -0.6},
];

export const SCENE2_CUTS: Bed[] = [
  {src: LEGACY, startFrom: 8, span: 2.4, zoom: 1.1, driftX: 0.6},
  {src: BRISTOL, startFrom: 40, span: 2.3, zoom: 1.12, driftX: -0.6},
];

// Legacy first, race footage second — the name plate rides the SECOND cut, so "John Hunter
// Nemechek" never lands on top of an unverified face.
export const SCENE3_CUTS: Bed[] = [
  {src: LEGACY, startFrom: 50, span: 1.7, zoom: 1.1, driftX: -0.5},
  {src: BRISTOL, startFrom: 70, span: 1.7, zoom: 1.1, driftX: 0.6},
];

export const SCENE4_CUTS: Bed[] = [
  {src: BERRY, startFrom: 40, span: 2.4, zoom: 1.1, driftX: -0.5},
  {src: BRISTOL, startFrom: 95, span: 2.4, zoom: 1.1, driftX: 0.6},
];

export const SCENE5_CUTS: Bed[] = [
  {src: LEGACY, startFrom: 90, span: 2.6, zoom: 1.1, driftX: 0.5},
];

export const SCENE6_CUTS: Bed[] = [
  {src: BRISTOL, startFrom: 25, span: 1.8, zoom: 1.12, driftX: -0.5},
  {src: BERRY, startFrom: 75, span: 1.8, zoom: 1.1, driftX: 0.4},
];
