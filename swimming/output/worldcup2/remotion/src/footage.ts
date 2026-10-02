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

export const SCENE1_CUTS: Bed[] = [bed('a1', 2.0, 0)];
export const SCENE2_CUTS: Bed[] = [bed('a2', 2.0, 0)];
export const SCENE3_CUTS: Bed[] = [bed('b1', 6.6, 0.08)];
export const SCENE4_CUTS: Bed[] = [bed('c1', 1.8, 0), bed('c2', 2.0, -0.06)];
export const SCENE5_CUTS: Bed[] = [bed('d1', 2.3, 0.08)];
