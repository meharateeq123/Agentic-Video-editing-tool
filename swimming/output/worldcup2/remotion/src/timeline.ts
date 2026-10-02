export const FPS = 30;
export const VO_SECONDS = 21.56;
export const FILM_SECONDS = 21.56;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.4},
  {n: 2, start: 3.4, end: 7.76},
  {n: 3, start: 7.76, end: 14.4},
  {n: 4, start: 14.4, end: 19.62},
  {n: 5, start: 19.62, end: 21.56},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe'];
