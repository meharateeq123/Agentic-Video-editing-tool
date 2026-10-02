// Scene timing from Whisper word timestamps on vo/kansas1.wav (../vo/kansas1.json).
//   2.95 ("...late-race track." | "In five of the last seven")   9.12 ("...went to overtime." | "Now the chase arrives")
//  16.03 ("...close the gap." | "One late restart")             19.23 ("...championship picture." | "And at Kansas")
// The VO file is 22.36s; the film runs 0.5s past the last word.

export const FPS = 30;
export const VO_SECONDS = 22.36;
export const FILM_SECONDS = 22.86;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.95},
  {n: 2, start: 2.95, end: 9.12},
  {n: 3, start: 9.12, end: 16.03},
  {n: 4, start: 16.03, end: 19.23},
  {n: 5, start: 19.23, end: 22.86},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];
