/**
 * Scene -> bed clips, baked 9:16 by ../crop.ps1.
 *   a1 b2 c1 c2 d2   NASCAR, "Bubba Wallace holds off Denny Hamlin to win at Kansas" (QpGcFTvHJSY) -
 *                    the 2022 Hollywood Casino 400, Wallace's real Kansas win.
 *   a2 b1 d1 tail    Peter Stratta, "Bubba Wallace Talks Kansas, Generational Chase Run"
 *                    (_I1dHhOHDJw, 2026-09-23) - Bubba on a call, only the vertical video strip kept.
 * Every range is used once. The film ends on Bubba's own voice (`tail`, played at full volume).
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

const bed = (name: string, span: number, driftX: number, zoom = 1.06): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom,
  driftX,
});

// "Bubba Wallace knows Kansas could change everything."
export const SCENE1_CUTS: Bed[] = [bed('a1', 2.33, 0.2), bed('a2', 2.3, -0.15)];

// "He enters this weekend 92 points behind the championship lead, but ... needs badly to win."
export const SCENE2_CUTS: Bed[] = [bed('b1', 3.7, 0.15), bed('b2', 3.7, 0.0, 1.0)];

// "Wallace has already won at Kansas before, so he knows what it takes."
export const SCENE3_CUTS: Bed[] = [bed('c1', 2.6, 0.1), bed('c2', 2.6, -0.15)];

// "But with the chase getting tighter, can Bubba pull off another Kansas shocker?"
export const SCENE4_CUTS: Bed[] = [bed('d1', 2.7, 0.1), bed('d2', 2.7, 0.15)];

// Bubba's real voice, with its own audio: "...winning Sunday, ultimately flips the script for all of us."
// playbackRate is pinned to 1 so the sound is never pitch-shifted.
export const SCENE5_CUTS: Bed[] = [{src: P('tail'), startFrom: 0, zoom: 1.0, volume: 1, playbackRate: 1}];
