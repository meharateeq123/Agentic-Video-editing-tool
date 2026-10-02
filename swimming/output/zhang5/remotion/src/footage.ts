/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. Reuses zhang2's two source downloads
 * (race200.mp4, Kc-iQ-QGGYk.mp4 - both already identity-verified) at fresh, non-overlapping
 * ranges - see bake.mjs's header comment for the exact accounting against zhang2's used windows.
 *
 * Beds carry `span` (real seconds of baked source) instead of a fixed playbackRate: the fresh
 * windows left in these two files are short, so SceneBed gently slows each one to cover its cut
 * without ever running out.
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

// "Zhang Zhanshuo just made Asian Games history." - Start List graphic, lane 2 = ZHANG Zhanshuo
export const SCENE1_CUTS: Bed[] = [bed('SL', 2.6, 0)];

// "The 19-year-old Chinese swimmer won a record seven gold medals at the 2026 Games,"
export const SCENE2_CUTS: Bed[] = [bed('W1', 2.5, 0.1), bed('R1', 2.3, 0)];

// "becoming the first swimmer ever to reach that number at a single Asian Games."
export const SCENE3_CUTS: Bed[] = [bed('C1', 2.0, 0.08)];

// "He also set an Asian record in the 200m freestyle with 1:43.49, seven golds, one swimmer,"
export const SCENE4_CUTS: Bed[] = [bed('R2', 2.3, 0), bed('W2', 2.0, 0.1), bed('C2', 1.8, 0.08)];

// "and he's only 19."
export const SCENE5_CUTS: Bed[] = [bed('R3', 2.0, 0)];
