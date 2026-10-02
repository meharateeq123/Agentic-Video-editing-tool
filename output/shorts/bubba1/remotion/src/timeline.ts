// Scene timing from Whisper word timestamps on vo/bubba1.wav (../vo/bubba1.json).
//   2.41 ("...everything." | "He enters this weekend")   8.17 ("...needs badly to win." | "Wallace has already won")
//  11.62 ("...what it takes." | "But with the chase")    15.40 (VO ends 14.96 / 15.24 file; Bubba's real voice takes over)
// Scene 5 is Bubba's own audio (3.82s), not the VO.

export const FPS = 30;
export const VO_SECONDS = 15.24;
export const FILM_SECONDS = 19.22;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.41},
  {n: 2, start: 2.41, end: 8.17},
  {n: 3, start: 8.17, end: 11.62},
  {n: 4, start: 11.62, end: 15.4},
  {n: 5, start: 15.4, end: 19.22},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];
