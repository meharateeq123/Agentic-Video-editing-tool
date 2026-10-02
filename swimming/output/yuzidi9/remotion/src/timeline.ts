export const FPS = 30;
export const VO_SECONDS = 22.52;
export const FILM_SECONDS = 22.52;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.94},
  {n: 2, start: 4.94, end: 11.0},
  {n: 3, start: 11.0, end: 16.37},
  {n: 4, start: 16.37, end: 20.99},
  {n: 5, start: 20.99, end: 22.52},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe'];
