/**
 * Scene -> bed clips, all baked 9:16 by ../../crop.ps1 from fresh sources (none used in an earlier
 * film). No cards anywhere - identity and numbers are carried by the real footage itself:
 *   - a2/a3  Sports Today's Asian Games swim: the cap reads CHN / YU ZIDI.
 *   - b2/b5  the National Games 200 IM final (Nov 2025): the broadcast's own lane-4 "Yu Zidi" graphic
 *            and "4 Yu Zidi / 5 Yu Yiting +0.15". This is her IM race, but NOT the Asian Games race -
 *            no footage of the 2:06.10 swim itself exists online yet.
 *   - a1/c1/d2  CGTN's interview with Yu right after her Asian Games gold (medal, Aichi-Nagoya backdrop).
 *   - b1/d1  the Asian Games podium with the gold medal and the Games mascot.
 *   - c3/c5  CBC's Canadian Trials broadcast of Summer McIntosh's 200 IM world record (2:05.70) and the
 *            results board, c4 McIntosh at the trials backdrop.
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

const bed = (name: string, span: number, driftX = 0, zoom = 1.06): Bed => ({
  src: P(name),
  startFrom: 0.05,
  span,
  zoom,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [bed('a1', 2.1, 0.2), bed('a2', 2.1, -0.2), bed('a3', 2.1, 0.2)];

export const SCENE2_CUTS: Bed[] = [
  bed('b1', 2.1, 0.2),
  bed('b2', 2.1, 0, 1.0),
  bed('b3', 2.1, -0.2),
  bed('b4', 2.1, 0.2),
  bed('b5', 2.1, 0, 1.0),
  bed('b6', 2.1, -0.2),
];

export const SCENE3_CUTS: Bed[] = [
  bed('c1', 2.1, -0.2),
  bed('c2', 2.1, 0.2),
  bed('c3', 2.1, 0.2),
  bed('c4', 2.2, -0.2),
  bed('c5', 2.3, 0, 1.0),
];

export const SCENE4_CUTS: Bed[] = [bed('d1', 2.1, 0.2), bed('d2', 2.3, -0.15)];
