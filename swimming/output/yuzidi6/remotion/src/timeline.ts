// Scene timing from Whisper word timestamps on vo/yuzidi6.wav (../vo/yuzidi6.json).
//   4.57  ("...and 400 IM," | "setting a Games record")
//   6.37  ("...in all three." | "Her biggest swim")
//  11.73  ("...4:28.56," | "making her the fifth-fastest")
//  14.33  ("...in history." | "Three golds.")
//  16.17  ("...Three records." | "What can this 13-year-old")
// The VO file is 18.60s (last word "next?" ends 18.04); the film runs to 18.60s.

export const FPS = 30;
export const VO_SECONDS = 18.6;
export const FILM_SECONDS = 18.6;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.5667},
  {n: 2, start: 4.5667, end: 6.3667},
  {n: 3, start: 6.3667, end: 11.7333},
  {n: 4, start: 11.7333, end: 14.3333},
  {n: 5, start: 14.3333, end: 16.1667},
  {n: 6, start: 16.1667, end: 18.6},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe', 'dip'];
