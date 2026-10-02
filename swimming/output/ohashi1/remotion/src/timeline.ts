// Scene timing from Whisper word timestamps on vo/ohashi1.wav (../vo/ohashi1.json).
// Each boundary sits in the gap between the last word of one sentence and the first of the next:
//   4.57  ("...he's only 17!" | "The Japanese teenager")   11.03 ("...under 2:05," | "but here's the crazy part")
//  14.50  ("...first world record." | "Ohashi is still")   18.30 ("...years to improve," | "so the biggest question")
//  20.27  ("...is simple." | "How fast can Shin Ohashi")
// The VO file is 23.08s (last word "go?" ends 22.62); the film runs to 23.10s.

export const FPS = 30;
export const VO_SECONDS = 23.08;
export const FILM_SECONDS = 23.1;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.5667},
  {n: 2, start: 4.5667, end: 11.0333},
  {n: 3, start: 11.0333, end: 14.5},
  {n: 4, start: 14.5, end: 18.3},
  {n: 5, start: 18.3, end: 20.2667},
  {n: 6, start: 20.2667, end: 23.1},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe', 'dip'];
