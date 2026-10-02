/**
 * Scene -> bed clips. Real footage only; every range is used ONCE (no clip repeats inside this short,
 * none overlaps another range of the same source, none comes from an earlier short).
 * Baked 9:16 by ../crop.ps1 from USA Sports' Athlos London 100m highlights (her 10.80 - the results
 * board and the interview bug both name her) and Republic of Games' Budapest 100m final (Melissa).
 * h5 is baked WITH its sync audio: her own voice, played at full volume in scene 5.
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
  volume?: number;
};

const P = (name: string) => `bed-pool/${name}.mp4`;

const bed = (name: string, span: number, driftX: number, zoom = 1.06): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [bed('a5', 2.4, 0.2), bed('b2', 2.4, -0.2)];

export const SCENE2_CUTS: Bed[] = [
  bed('a3', 2.4, 0.2),
  bed('a2', 2.2, -0.2),
  // The real "100M RESULTS - 1 SHA'CARRI RICHARDSON 10.80" board, whole over its own blur.
  {src: P('a4'), startFrom: 0, span: 2.6, zoom: 1.0},
];

export const SCENE3_CUTS: Bed[] = [bed('b1', 2.4, 0.2), bed('a6', 2.4, -0.2)];

export const SCENE4_CUTS: Bed[] = [bed('m1', 2.2, 0.2), bed('m4', 1.8, -0.1), bed('m3', 2.4, 0.2)];

/** Her own voice - never speed-changed. */
export const SCENE5_CUTS: Bed[] = [{src: P('h5'), startFrom: 0, span: 5.4, zoom: 1.04, driftX: -0.1, volume: 1}];