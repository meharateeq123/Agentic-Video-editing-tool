// Scene timing from Whisper word timestamps on vo/melissa2.wav.
//   3.46  ("...100 meters." | "Then she came back")
//   7.58  ("...in the 200." | "She won both titles")
//  11.92  ("...sprint events." | "This isn't just a hot streak")
// Last word "level." ends 16.86s; the film runs to 17.2s.

export const FPS = 30;
export const VO_SECONDS = 16.86;
export const FILM_SECONDS = 17.2;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.4667},
  {n: 2, start: 3.4667, end: 7.5667},
  {n: 3, start: 7.5667, end: 11.9333},
  {n: 4, start: 11.9333, end: 17.2},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown'];
