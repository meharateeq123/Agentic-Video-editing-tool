// Scene timing from Whisper word timestamps on vo/kansas2.wav (../vo/kansas2.json).
//   2.95 ("...wildest Chase tracks." | "In five of the last seven")      8.66 ("...went to overtime." | "Now Kyle Larson leads")
//  11.70 ("...one point." | "With the championship this close")          16.85 ("...the standings," | "and at Kansas")
// The VO file is 20.20s (last word ends 19.7); the film runs 0.5s past it.

export const FPS = 30;
export const VO_SECONDS = 20.2;
export const FILM_SECONDS = 20.7;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.95},
  {n: 2, start: 2.95, end: 8.66},
  {n: 3, start: 8.66, end: 11.7},
  {n: 4, start: 11.7, end: 16.85},
  {n: 5, start: 16.85, end: 20.7},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];
