/**
 * Scene -> bed clips. Rules: real footage only, and no clip reused from any earlier film or short.
 * Every source here is new to the library.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - g1*, g2*, g3a, g3d, g4*, g5*  the official upload of the 2026 Australian Athletics Championships
 *          men's open 200m final in Sydney - the race Gout ran 19.67 in. He wears the "GOUT" hip bib
 *          and the same purple kit throughout, so every shot is a proven face.
 *   - g3b, g3c  World Athletics' Day 3 highlights from the U20 Championships in Oregon. Gout withdrew,
 *          so these are other athletes and nothing on screen labels them as him.
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
  // Hand to his face by his bib, then walking away with his back to the camera.
  bed('g1a', 2.2, 0.2),
  bed('g1b', 2.6, -0.2),
];

export const SCENE2_CUTS: Bed[] = [
  bed('g2a', 2.6, 0.2),
  bed('g2b', 2.6, -0.25),
];

export const SCENE3_CUTS: Bed[] = [
  bed('g3a', 2.6, 0.2),
  bed('g3b', 2.6, -0.25),
  bed('g3c', 2.6, 0.25),
  bed('g3d', 2.6, -0.2),
];

export const SCENE4_CUTS: Bed[] = [
  bed('g4a', 2.6, 0.3),
  bed('g4b', 2.6, -0.3),
  bed('g4c', 2.6, 0.2),
];

export const SCENE5_CUTS: Bed[] = [
  bed('g5a', 2.6, 0.2),
  bed('g5b', 3.0, -0.2),
];