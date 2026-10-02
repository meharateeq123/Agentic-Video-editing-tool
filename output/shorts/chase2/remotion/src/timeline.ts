// Scene timing from Whisper word timestamps on vo/chase2.wav (../vo/chase2.json).
//   3.60 ("...three-race stretch." | "Kansas comes first")     6.85 ("...Charlotte," | "all 1.5-mile tracks")
//   8.60 ("...tracks," | "and with Kyle Larson")               12.05 ("...Hamlin," | "every mistake")
//  13.85 ("...massive," | "three races,")                      16.05 ("...fight," | "and everything could change!")
// The VO file is 17.88s; the film runs 0.5s past it.

export const FPS = 30;
export const VO_SECONDS = 17.88;
export const FILM_SECONDS = 18.38;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.6},
  {n: 2, start: 3.6, end: 6.85},
  {n: 3, start: 6.85, end: 8.6},
  {n: 4, start: 8.6, end: 12.05},
  {n: 5, start: 12.05, end: 13.85},
  {n: 6, start: 13.85, end: 16.05},
  {n: 7, start: 16.05, end: 18.38},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip', 'wipe', 'whip'];
