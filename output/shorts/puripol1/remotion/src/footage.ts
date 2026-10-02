/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs.
 *
 * Identity is on screen, never inferred: the 100m START LIST and RESULTS boards both read
 * "Puripol BOONSON", the winner lower-third reads "WINNER Puripol BOONSON GR 9.90", the 200m results
 * board reads "1 Puripol BOONSON 19.88", and his bib reads BOONSON in every trackside shot.
 *
 *   a1 the 100m final        a2 the WINNER 9.90 lower-third   a3 the 100m results board
 *   b1 with the Thai flag    b2 at the 200m, bib BOONSON
 *   c1 the 200m final        c2 the FINISH clock - 19.88
 *   d1 the ASIAN RECORD board   d2 the 200m results board
 *   e1 him after the 100m    e2 his 200m celebration
 *   f1 the 100m from behind  f2 him with a rival
 *
 * Both sources carry a small channel bug top-right, so every tight crop sits near cx 0.5 (well clear
 * of it) and the three board beats bake 'fill' with the right edge trimmed away.
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

// "After winning the Asian Games 100 meters in a stunning 9.90,"
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.08), bed('a3', 0.08)];

// "the Thai sprinter returned for the 200 meter final"
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1)];

// "and ran an incredible 19.88 seconds."
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.08)];

// "That matched the Asian record and completed his sprint double in Nagoya."
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.08)];

// "He now owns two huge performances at one Asian Games,"
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.1), bed('e2', -0.1)];

// "so how fast can Puripol go next?"
export const SCENE6_CUTS: Bed[] = [bed('f1', 0.1), bed('f2', -0.1)];
