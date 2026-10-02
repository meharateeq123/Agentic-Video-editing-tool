/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs from lyles1's own downloads, at ranges disjoint from
 * the ones that short used.
 *
 * Identity is on screen, not inferred: his bib/name tag reads LYLES and the NBC results board reads
 * "1 NOAH LYLES WL 9.79" (c3, d2), and the 200m lower-third reads "NOAH LYLES / 9th Place: 50.88" (d1).
 *
 *   b1 blocks, bowed in    b2 start burst         c1 full sprint drive
 *   c2 finish, LYLES tag   c3 results board 9.79  d1 200m lower-third, the actual setback
 *   d2 the 9.79 board again - the comeback        e1 wide track + American-record card
 *   e2 interview close-up, looking ahead
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

const bed = (name: string, span: number, driftX = 0.1): Bed => ({
  src: P(name),
  startFrom: 0,
  zoom: 1.0,
  span,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [bed('b1', 3.2, 0.06), bed('b2', 2.6, -0.08)];
export const SCENE2_CUTS: Bed[] = [bed('c1', 2.4, 0.08), bed('c2', 2.2, -0.06), bed('c3', 3.2, 0)];
export const SCENE3_CUTS: Bed[] = [bed('d1', 3.1, 0), bed('d2', 2.9, 0)];
export const SCENE4_CUTS: Bed[] = [bed('e1', 2.6, 0), bed('e2', 3.2, 0.06)];
