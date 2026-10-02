/**
 * Scene -> bed clips. Rules: real footage only, and no clip reused from any earlier film or short.
 * Every source here is new to the library.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - s1a, s1c, s4a-s4d  World Aquatics' official upload of the women's 100m freestyle final in
 *          Singapore. Steenbergen is named by the lane graphic, the results board (STEENBERGEN 1) and
 *          the cap (NED STEENBERGEN). s4c is the board itself, shown whole, not a built card.
 *   - s1b, s2c, s5c  Nuoto.com's Settecolli 2026 interview; s3a-s3c, s5b  SwimSwam's interview about
 *          the world record. Both against the Rome Settecolli backdrop.
 *   - s2a, s2b, s5a  Canale 10's report from the 62nd Settecolli: the "26-27-28 giugno 2026, Foro
 *          Italico" poster and the pool. No race footage of the 51.68 exists on any source found.
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

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number, zoom = 1.06): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  bed('s1a', 1.7, 0.2),
  bed('s1b', 1.7, -0.2),
  bed('s1c', 2.0, 0.2),
];

export const SCENE2_CUTS: Bed[] = [
  // The poster is a whole 16:9 graphic over a blurred fill - no zoom or drift, or its edges clip.
  bed('s2a', 1.15, 0, 1.0),
  bed('s2b', 2.0, 0.3),
  bed('s2c', 2.2, -0.2),
];

export const SCENE3_CUTS: Bed[] = [
  bed('s3a', 2.0, 0.2),
  bed('s3b', 2.0, -0.2),
  bed('s3c', 2.4, 0.2),
];

export const SCENE4_CUTS: Bed[] = [
  bed('s4a', 2.0, -0.3),
  bed('s4b', 2.0, 0.3),
  // The results board, shown whole over a blurred fill.
  bed('s4c', 2.4, 0, 1.0),
  bed('s4d', 2.0, -0.2),
];

export const SCENE5_CUTS: Bed[] = [
  bed('s5a', 2.0, 0.3),
  bed('s5b', 2.0, -0.2),
  bed('s5c', 2.6, 0.2),
];