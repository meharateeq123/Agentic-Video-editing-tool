/**
 * Scene -> bed clips. Rules: real footage only, and no clip reused from any earlier film or short.
 * This is the library's first athletics short, so nothing here collides with the motorsport or
 * swimming pools.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - b-*  World Athletics' official "Day 2 Extended Highlights" from the World Athletics Ultimate
 *          Championship, Budapest, 12 Sep 2026 — the women's 100m semi-final and final.
 *   - s-*  Sha'Carri Richardson's introduction at the Brussels Diamond League Final broadcast,
 *          the one feed where her bib ("RICHARDSON") and the lower-third both name her. The
 *          Budapest cameras never put her name next to her face, and this library does not label
 *          an unverified face, so her close-ups come from here. They sit only under lines that
 *          name no venue.
 *
 * Facts on screen (worldathletics.org / olympics.com): in the Budapest final Melissa
 * Jefferson-Wooden won in 10.62 (world lead), Julien Alfred was second in 10.74 and Sha'Carri
 * Richardson third in 10.76 — the exact numbers the SEIKO photo finish in scene 4 prints itself.
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
const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  // Her face first, on her name.
  bed('s-intro', 2.4, 0.3),
  // Then Budapest itself, on "after Budapest": hands on the line, clock at 0.00.
  bed('b-hands', 2.4, -0.3),
  bed('b-blocks', 2.4, 0.3),
];

export const SCENE2_CUTS: Bed[] = [
  bed('b-start', 2.4, 0.35),
  bed('b-race1', 2.4, -0.35),
];

export const SCENE3_CUTS: Bed[] = [
  bed('b-race2', 2.4, 0.35),
  bed('b-slowmo', 2.6, -0.3),
  bed('s-name', 2.4, 0.25),
];

export const SCENE4_CUTS: Bed[] = [
  bed('b-fin', 2.4, -0.35),
  // The photo finish carries the whole line's information on its own — no built card.
  bed('b-photo', 2.5, 0.12),
  bed('b-cel', 2.4, 0.3),
];

export const SCENE5_CUTS: Bed[] = [
  bed('s-ready', 2.4, -0.25),
  bed('s-close', 2.4, 0.25),
];

export const SCENE6_CUTS: Bed[] = [
  bed('s-focus', 2.4, -0.25),
  bed('b-slow2', 2.4, 0.3),
];
