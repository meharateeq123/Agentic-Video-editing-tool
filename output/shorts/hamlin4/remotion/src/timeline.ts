// Scene timing from Whisper word timestamps on vo/hamlin4.wav (../vo/hamlin4.json).
// Sentence 2 of the script is 7.4s long, so it is split at its own comma into two scenes:
//   3.37  ("...but there's a problem." | "He's lost the last two")
//   6.97  ("...after overtime restarts," | "despite leading 290")
//  10.80  ("...547 laps here." | "Now the championship fight")
//  13.23  ("...incredibly tight." | "Can Hamlin finally finish")
// The VO file is 18.28s (last word "race?" ends 17.74); the film runs to 18.30s.

export const FPS = 30;
export const VO_SECONDS = 18.28;
export const FILM_SECONDS = 18.3;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.3667},
  {n: 2, start: 3.3667, end: 6.9667},
  {n: 3, start: 6.9667, end: 10.8},
  {n: 4, start: 10.8, end: 13.2333},
  {n: 5, start: 13.2333, end: 18.3},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe'];
