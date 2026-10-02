// Scene timing from Whisper word timestamps on vo/zhang5.wav (../vo/vo-words.json).
//   2.74  ("...history." | "The 19-year-old")
//   7.78  ("...2026 Games," | "becoming the first")
//  11.65  ("...single Asian Games." | "He also set")
//  18.38  ("...one swimmer," | "and he's only 19")
// The VO file is 19.96s (last word "19." ends 19.58); the film runs to 19.96s.

export const FPS = 30;
export const VO_SECONDS = 19.96;
export const FILM_SECONDS = 19.96;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.74},
  {n: 2, start: 2.74, end: 7.78},
  {n: 3, start: 7.78, end: 11.65},
  {n: 4, start: 11.65, end: 18.38},
  {n: 5, start: 18.38, end: 19.96},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe'];
