/**
 * Scene -> bed clips, all baked by ../../crop.ps1 from ONE fresh source: TV Asahi Sports official,
 * "Matsushita Tomoyuki - Japan record, men's 400m IM, Inkare 2026" (4QFWetWwP6g, 1280x720). It is
 * not used in any earlier film. Identity is proven inside the footage itself, so no synthetic card
 * is needed:
 *   - m1a   lower-third "Matsushita Tomoyuki, Toyo Univ 3rd yr" with his lane-5 bib
 *   - m1c   the broadcast record board listing his 4:07.21 meet record
 *   - m2a   lane-5 graphic "5 Matsushita Tomoyuki 4:13.59" over the Toyo cheering section
 *   - m2d   the finish graphic "5 Nihon-shin 4:05.83"
 *   - m3a   his 200m split "5 1:59.70" against the Japan/meet-record pace
 *   - m4b   the post-race graphic "1 Matsushita Tomoyuki, Toyo Univ 3rd yr, Nihon-shin 4:05.83"
 * m1b / m2e / m4a / m4c are close-ups of him (cap reads TOYO UNIVERSITY); m2b / m2c / m3b are the race.
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

const bed = (name: string, span: number, driftX = 0): Bed => ({
  src: P(name),
  startFrom: 0.05,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [bed('m1a', 1.7), bed('m1b', 1.7, -0.3), bed('m1c', 1.6)];

export const SCENE2_CUTS: Bed[] = [
  bed('m2a', 1.9),
  bed('m2b', 1.9, 0.3),
  bed('m2c', 1.5, -0.3),
  bed('m2d', 2.1),
  bed('m2e', 1.7, 0.2),
];

export const SCENE3_CUTS: Bed[] = [bed('m3a', 2.1), bed('m3b', 2.1, 0.3)];

export const SCENE4_CUTS: Bed[] = [bed('m4a', 1.7, -0.2), bed('m4b', 1.9), bed('m4c', 1.5, 0.2)];
