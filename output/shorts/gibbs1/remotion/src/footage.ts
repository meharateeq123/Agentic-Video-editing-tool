/**
 * Scene -> bed clips. Rule: no game/gameplay footage at all. Uses ONE new real source — a
 * Motorsports-on-NBC Darlington Cup Series broadcast, distinct from the FOX-graphics-package
 * clips already used in bell1/bell2 (different leaderboard style, different color grade) so this
 * short doesn't repeat footage from the Bell shorts. Wide aerial pack racing + one real pit-stop
 * cut, no identifiable single driver close-up, so it's safe as a generic Darlington bed for a
 * script about Ty Gibbs specifically. QC'd clean at every offset below: only the standard running
 * leaderboard graphic on the left, no name/lower-third supers.
 *
 *   - gibbs-nbc-raw.mp4  "NASCAR Cup Series 2026: Darlington Raceway | EXTENDED HIGHLIGHTS |
 *                        Motorsports on NBC", 240s section downloaded.
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

const NBC = P('gibbs-nbc-raw.mp4');

export const SCENE1_CUTS: Bed[] = [
  {src: NBC, startFrom: 20, span: 2.4, zoom: 1.1, driftX: 0.6},
  {src: NBC, startFrom: 45, span: 2.4, zoom: 1.1, driftX: -0.7},
];

export const SCENE2_CUTS: Bed[] = [
  {src: NBC, startFrom: 70, span: 2.6, zoom: 1.1, driftX: 0.7},
  {src: NBC, startFrom: 95, span: 2.6, zoom: 1.08, driftX: -0.6},
];

export const SCENE3_CUTS: Bed[] = [
  {src: NBC, startFrom: 140, span: 2.3, zoom: 1.1, driftX: -0.6},
  {src: NBC, startFrom: 165, span: 2.3, zoom: 1.08, driftX: 0.7},
];

export const SCENE4_CUTS: Bed[] = [
  {src: NBC, startFrom: 190, span: 2.0, zoom: 1.1, driftX: 0.6},
  {src: NBC, startFrom: 210, span: 2.0, zoom: 1.1, driftX: -0.6},
];

export const SCENE5_CUTS: Bed[] = [
  {src: NBC, startFrom: 230, span: 2.3, zoom: 1.1, driftX: -0.5},
];
