// Scene timing from Whisper word timestamps on vo/kojima1.wav (../vo-words.json).
//   4.40 ("...Asian Games." | "The 17-year-old")     8.30 ("...World Junior record" | "in the 200-meter IM")
//  12.55 ("...1:55.36." | "He even went faster")     16.75 ("...junior best," | "and he was just 0.06 seconds from gold.")
// Film runs 0.5s past the last word (20.32s); the VO file is 20.92s. VO only - no real-clip ending.

export const FPS = 30;
export const VO_SECONDS = 20.92;
export const FILM_SECONDS = 21.4;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.4},
  {n: 2, start: 4.4, end: 8.3},
  {n: 3, start: 8.3, end: 12.55},
  {n: 4, start: 12.55, end: 16.75},
  {n: 5, start: 16.75, end: 21.4},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];
