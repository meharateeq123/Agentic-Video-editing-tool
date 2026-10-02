/**
 * Scene -> bed clips, baked 9:16 by ../crop.ps1 from: a phone video of the Asian Games 200 IM final (hl),
 * USA Swimming's Pan Pacs broadcast (pp, shots of Kojima himself) and the Sydney 2000 Phelps start list.
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

export const SCENE1_CUTS: Bed[] = [bed('a1', 2.0, 0.1), bed('a2', 1.7, 0.1)];

export const SCENE2_CUTS: Bed[] = [bed('b1', 2.4, 0.15), bed('b2', 2.4, -0.1)];

export const SCENE3_CUTS: Bed[] = [bed('c1', 2.4, 0.2), bed('c2', 2.4, -0.2), bed('c3', 2.4, 0.2)];

export const SCENE4_CUTS: Bed[] = [
  // The real start list naming "3 Michael Phelps", whole over its own blur.
  {src: P('d1'), startFrom: 0, span: 2.4, zoom: 1.0},
  bed('d2', 2.4, 0.1),
];

export const SCENE5_CUTS: Bed[] = [
  bed('e1', 2.4, 0.2),
  bed('e2', 2.4, -0.2),
  // The venue screen: "Men's 200m IM Final - WANG Shun 3, MATSUSHITA Tomoyuki 1, KOJIMA Yumeki 2".
  {src: P('e3'), startFrom: 0, span: 2.5, zoom: 1.0},
];
