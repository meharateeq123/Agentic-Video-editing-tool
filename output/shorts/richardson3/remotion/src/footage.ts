/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs from the sources already downloaded for richardson2,
 * at ranges disjoint from the ones that short used.
 *
 * Identity is on screen, not inferred: the Budapest result list reads JEFFERSON-WOODEN / ALFRED /
 * RICHARDSON (a1), the Athlos 100M STARTLIST and the 100M RESULTS board both read SHA'CARRI RICHARDSON
 * (b1, c2), and her bib reads RICHARDSON in the trackside and mixed-zone shots.
 *
 *   a1 Budapest result list              b1 Athlos startlist   b2 the race   b3 the finish clock
 *   c1 her after the race (bib)          c2 the results board - 1 SHA'CARRI RICHARDSON 10.80
 *   d1 d2 d3 the mixed zone (her answer) e1 the mixed zone     e2 her close-up, bib RICHARDSON
 *
 * The board beats are baked 'fill' (whole 16:9 frame over its own blur) because a tight 9:16 crop
 * would cut the names off; everything else is a tight crop with her face in frame.
 */

export type Bed = {
  src: string;
  startFrom: number;
  span?: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
  volume?: number;
  playbackRate?: number;
};

const P = (name: string) => `bed-pool/${name}.mp4`;

const bed = (name: string, driftX = 0.1): Bed => ({
  src: P(name),
  startFrom: 0,
  zoom: 1.0,
  driftX,
  playbackRate: 1,
});

// "After taking third in Budapest,"
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.08)];

// "she came back at Athlos London and won the 100 meters in 10.80 seconds."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.08), bed('b2', -0.1), bed('b3', 0.08)];

// "She pulled away in the second half and set a new Athlos meeting record."
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.08)];

// "But Sha'Carri said she wished this performance had happened at the beginning of her season."
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1), bed('d3', 0.1)];

// "So what will she look like in 2027?"
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.1), bed('e2', -0.1)];
