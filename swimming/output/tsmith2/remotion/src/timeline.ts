// Scene timing from Whisper word timestamps on vo/tsmith2.wav (../vo/tsmith2.json).
//   2.85 ("...Olympics," | "double Olympic champion")   6.10 ("...officially back!" | "She says she started")
//  10.63 ("...swimming." | "But this time")             13.00 ("...new challenge." | "The 50-meter breaststroke")
//  17.10 ("...still has to qualify," | "but at 29")
// The VO file is 20.84s (last word ends 20.5); the film runs ~0.5s past it.

export const FPS = 30;
export const VO_SECONDS = 20.84;
export const FILM_SECONDS = 21.34;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.85},
  {n: 2, start: 2.85, end: 6.1},
  {n: 3, start: 6.1, end: 10.63},
  {n: 4, start: 10.63, end: 13.0},
  {n: 5, start: 13.0, end: 17.1},
  {n: 6, start: 17.1, end: 21.34},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip', 'wipe'];
