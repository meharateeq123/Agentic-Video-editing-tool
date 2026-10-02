// Scene timing from Whisper word timestamps on vo/yuzidi8.wav (../vo/vo-words.json).
//   3.5   ("...rivalry." | "At the Asian Games")
//   9.7   ("...200 IM," | "just 0.40 seconds behind")
//  13.68  ("...World Record." | "Yu also won")
//  17.0   ("...Games records." | "She's only 13,")
// The VO file is 21.24s (last word "2028?" ends 20.92); the film runs to 21.24s.

export const FPS = 30;
export const VO_SECONDS = 21.24;
export const FILM_SECONDS = 21.24;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.5},
  {n: 2, start: 3.5, end: 9.7},
  {n: 3, start: 9.7, end: 13.68},
  {n: 4, start: 13.68, end: 17.0},
  {n: 5, start: 17.0, end: 21.24},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe'];
