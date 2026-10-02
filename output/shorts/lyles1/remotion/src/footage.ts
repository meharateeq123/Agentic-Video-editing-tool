/**
 * Scene -> bed clips. Rules: real footage only, and no clip reused from any earlier film or short.
 * Every source here is new to the library.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - l1*, l2*, l3*, l6*  USA Track & Field's official upload of the 2026 USATF Outdoor Championships
 *          men's 200m final - the race Lyles finished 9th in. The lower-third at 0:15 names him and
 *          he wears the same lilac kit and hip bib "6" throughout, so every shot is a proven face.
 *   - l5a/l5b/l5c  USATF's official men's 100m final, where he ran the 9.79. l5c is the real NBC
 *          results board (1 NOAH LYLES 9.79), shown whole over a blurred fill, not a built card.
 *   - l4*  World Athletics' "Day 3 Extended Highlights" from the Ultimate Championship in Budapest.
 *          Lyles did not race there, so these are stadium/race shots under "he missed" - no face.
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
  // Head down in the blocks, then clapping his hands together and walking off the track.
  bed('l1a', 2.0, 0.3),
  bed('l1b', 2.0, -0.3),
];

export const SCENE2_CUTS: Bed[] = [
  bed('l2a', 2.6, 0.3),
  bed('l2b', 2.6, -0.3),
];

export const SCENE3_CUTS: Bed[] = [
  bed('l3a', 2.6, 0.3),
  bed('l3b', 1.8, -0.2),
];

export const SCENE4_CUTS: Bed[] = [
  bed('l4a', 2.6, 0.3),
  bed('l4b', 2.6, -0.3),
];

export const SCENE5_CUTS: Bed[] = [
  bed('l5a', 2.6, -0.25),
  bed('l5b', 2.6, 0.25),
  // The results board is 456px wide inside a 480px crop - no zoom, no drift, or 9.79 slides off.
  bed('l5c', 2.6, 0, 1.0),
];

export const SCENE6_CUTS: Bed[] = [
  bed('l6a', 1.7, 0.2),
  bed('l6b', 2.4, -0.3),
];