/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs from melissa1's own downloads, at ranges disjoint
 * from the ones that short used.
 *
 * Identity is on screen, not inferred: a2's RESULT board reads "1 JEFFERSON-WOODEN / ALFRED /
 * RICHARDSON, FINISH 100m 10.62" and b2's board reads "FINISH 200m 21.48" - both match the VO's
 * numbers. c1/d1 are a second, confirmed angle of the same 200m finish (APT Sports, "SOURCE: INFRONT").
 */

export type Bed = {
  src: string;
  startFrom: number;
  span?: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
  volume?: number;
  playbackRate?: number;
};

const P = (name: string) => `bed-pool/${name}.mp4`;

const bed = (name: string, span: number, driftX = 0.1): Bed => ({
  src: P(name),
  startFrom: 0,
  zoom: 1.0,
  span,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [bed('a1', 2.3, 0.08), bed('a2', 2.6, 0)];
export const SCENE2_CUTS: Bed[] = [bed('b1', 2.6, 0.08), bed('b2', 2.0, 0)];
export const SCENE3_CUTS: Bed[] = [bed('c1', 2.3, 0), bed('c2', 3.0, -0.06)];
export const SCENE4_CUTS: Bed[] = [bed('d1', 2.7, 0.04)];
