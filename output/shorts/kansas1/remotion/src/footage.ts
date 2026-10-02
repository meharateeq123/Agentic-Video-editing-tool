/**
 * Scene -> bed clips, baked 9:16 by ../crop.ps1. All real NASCAR-official Kansas Speedway footage:
 *   a1 d1 d2   "Final Laps: Watch the wild second overtime" (Lhda_Ro_poo) - double-file restart packs
 *   a2 b2 c4 e1  "Final Laps: Edge-of-Your-Seat THRILLER in Kansas | 2025" (QzpujcBALvQ) - incl. the #23/#11 last-lap contact
 *   b1 b3      "Kansas overtime ends at the line with closest finish in NASCAR Cup Series history" (zuhBr4ibh2c)
 *   c1 c2 c3 e2  "Hamlin overcomes Larson for win after last-lap pass at Kansas" (qRSUFLDXvRI) - #5 Larson vs #11 Hamlin
 * Every range is used once. The film ends on the VO.
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

const bed = (name: string, span: number, driftX: number, zoom = 1.0): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom,
  driftX,
});

// "Kansas has become NASCAR's wildest late-race track."
export const SCENE1_CUTS: Bed[] = [bed('a1', 2.5, 0.1), bed('a2', 2.5, -0.1)];

// "In five of the last seven Kansas races, the winning pass happened in the final two laps, and four went to overtime."
export const SCENE2_CUTS: Bed[] = [bed('b1', 3.0, 0.1), bed('b2', 3.0, -0.1), bed('b3', 3.0, 0.1)];

// "Now the chase arrives with Kyle Larson only one point ahead of Denny Hamlin, while several drivers ... close the gap."
export const SCENE3_CUTS: Bed[] = [bed('c1', 2.7, 0.1), bed('c2', 2.7, -0.1), bed('c3', 2.7, 0.1), bed('c4', 2.7, -0.1)];

// "One late restart could completely change the championship picture."
export const SCENE4_CUTS: Bed[] = [bed('d1', 2.6, 0.1), bed('d2', 2.6, -0.1)];

// "And at Kansas, anything can happen in the final lap."
export const SCENE5_CUTS: Bed[] = [bed('e1', 2.8, 0.1), bed('e2', 2.8, -0.1)];
