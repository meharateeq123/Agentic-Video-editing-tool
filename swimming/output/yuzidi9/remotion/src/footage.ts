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

export const SCENE1_CUTS: Bed[] = [bed('V1', 3.0, 0.08)];
export const SCENE2_CUTS: Bed[] = [bed('V2', 3.0, 0.08)];
export const SCENE3_CUTS: Bed[] = [bed('V3', 3.0, -0.08)];
export const SCENE4_CUTS: Bed[] = [bed('V4', 3.0, 0.08)];
export const SCENE5_CUTS: Bed[] = [bed('V5', 3.0, -0.08)];
