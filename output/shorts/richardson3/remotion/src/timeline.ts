// Scene timing from Whisper word timestamps on vo/richardson3.wav (../vo/richardson3.json).
//   1.93  ("...third in Budapest," | "she came back at Athlos London")
//   6.67  ("...in 10.80 seconds." | "She pulled away")
//  10.07  ("...Athlos meeting record." | "But Sha'Carri said")
//  14.03  ("...beginning of her season." | "So what will she look like")
// The VO file is 16.28s (last word "2027" ends 15.9); the film runs to 16.27s.

export const FPS = 30;
export const VO_SECONDS = 16.28;
export const FILM_SECONDS = 16.2667;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 1.9333},
  {n: 2, start: 1.9333, end: 6.6667},
  {n: 3, start: 6.6667, end: 10.0667},
  {n: 4, start: 10.0667, end: 14.0333},
  {n: 5, start: 14.0333, end: 16.2667},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe'];
