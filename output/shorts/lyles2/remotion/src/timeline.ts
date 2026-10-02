// Scene timing from Whisper word timestamps on vo/lyles2.wav (../vo-words.json).
//   4.19  ("...sprint stars." | "He blasted to 9.79")
//   9.60  ("...personal bests." | "After facing setbacks")
//  14.07  ("...serious speed, but" | "now the big question")
// The VO file is 17.96s (last word "showdown?" ends 17.96); the film runs to 18.3s.

export const FPS = 30;
export const VO_SECONDS = 17.96;
export const FILM_SECONDS = 18.3;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.2},
  {n: 2, start: 4.2, end: 9.6},
  {n: 3, start: 9.6, end: 14.0667},
  {n: 4, start: 14.0667, end: 18.3},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown'];
