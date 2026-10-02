/**
 * Scene -> bed clips. Rules: real footage only, and no clip reused from any earlier film or short -
 * and, within this short, scene 1's intro and scene 5's closer are DIFFERENT source clips, not the
 * same interview reused twice.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - s1a  SwimSwam's interview, "I haven't swam a 58 at night at an important meet since I was a
 *          teenager" (kY1m2QzOeNE) - her own words on the exact pattern this script describes.
 *   - s2a/s2b  USA Swimming's 200m Backstroke final broadcast (FUaBnm2yEZs): the win celebration and
 *          the "4 USA SMITH" start-list graphic.
 *   - s2c  Day 1 Prelims, Women's 100 Back Heat 4 (z_GHzq1TuUo cut to d1-100back-h4.mp4).
 *   - s2d  Day 3 Prelims, Women's 200 Back Heat 4 (yHC6b9LePKc cut to d3-200back-h4.mp4).
 *   - s3a  the 100 Back Heat 4 prelim swim; the broadcast's own winner caption reads "USA Regan SMITH
 *          - WINNER - HEAT 4 - 57.86" - the exact prelim number, no built card needed.
 *   - s3c/s3d  USA Swimming's 100m Backstroke final broadcast (K1CKuU4VKx4): the race, then the real
 *          results board "1 BERKOFF 57.93 / 2 SMITH 58.11".
 *   - s4a/s4b  the 200 Back Heat 4 prelim swim and its results board, "1 Regan SMITH 2:04.13".
 *   - s4c/s4d  the 200m Backstroke final race and its results board, "1 Regan SMITH 2:05.57".
 *   - s5a  a DIFFERENT clip from s1a: the 200 Back prelim heat's own celebration at the wall.
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

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number, zoom = 1.06): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [bed('s1a', 2.4, 0.15)];

export const SCENE2_CUTS: Bed[] = [
  bed('s2a', 2.2, 0.2),
  bed('s2b', 2.0, -0.2, 1.0),
  bed('s2c', 1.8, 0.2),
  bed('s2d', 1.8, -0.2),
];

export const SCENE3_CUTS: Bed[] = [
  bed('s3a', 2.2, 0.2),
  bed('s3c', 2.4, -0.2),
  // The results board is a static graphic already letterboxed over its own blur - no zoom/drift.
  {src: P('s3d'), startFrom: 0, span: 2.2, zoom: 1.0},
];

export const SCENE4_CUTS: Bed[] = [
  bed('s4a', 2.4, 0.2),
  {src: P('s4b'), startFrom: 0, span: 2.2, zoom: 1.0},
  bed('s4c', 2.4, -0.2),
  {src: P('s4d'), startFrom: 0, span: 2.4, zoom: 1.0},
];

export const SCENE5_CUTS: Bed[] = [bed('s5a', 2.0, 0.15)];