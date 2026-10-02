/**
 * Scene -> bed clips. All real footage from World Athletics' "Women's Half Marathon | World Road
 * Running Championships Copenhagen 26" highlight (wM8YAVdIxzY), baked 9:16 by ../crop.ps1.
 * Every range is used once. No real-clip ending: the film ends on the VO.
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

export const SCENE1_CUTS: Bed[] = [bed('a1', 2.4, 0.2), bed('a2', 2.4, -0.15)];

export const SCENE2_CUTS: Bed[] = [bed('b1', 2.4, 0.2), bed('b2', 2.4, 0.0, 1.0)];

export const SCENE3_CUTS: Bed[] = [
  bed('c1', 2.5, 0.15),
  // The real RECORDS graphic (WR 1:05:16), whole over its own blur.
  {src: P('c2'), startFrom: 0, span: 2.4, zoom: 1.0},
  bed('c3', 2.4, 0.0, 1.0),
];

export const SCENE4_CUTS: Bed[] = [
  bed('d1', 2.4, 0.2),
  // The real results board: "1 NGETICH 1:05:15 / 2 LOLEO 1:06:05".
  {src: P('d2'), startFrom: 0, span: 2.4, zoom: 1.0},
];

export const SCENE5_CUTS: Bed[] = [bed('e1', 1.5, 0.1), bed('e2', 2.3, -0.1)];
