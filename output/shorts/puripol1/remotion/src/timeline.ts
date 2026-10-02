// Scene timing from Whisper word timestamps on vo/puripol1.wav (../vo/puripol1.json).
//   3.90  ("...a stunning 9.90," | "the Thai sprinter returned")
//   6.37  ("...the 200 meter final" | "and ran an incredible")
//   9.57  ("...19.88 seconds." | "That matched the Asian record")
//  13.20  ("...his sprint double in Nagoya." | "He now owns two huge performances")
//  16.57  ("...at one Asian Games," | "so how fast can Puripol go next?")
// The VO file is 19.16s (last word "next?" ends 18.64); the film runs to 19.17s.

export const FPS = 30;
export const VO_SECONDS = 19.16;
export const FILM_SECONDS = 19.1667;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.9},
  {n: 2, start: 3.9, end: 6.3667},
  {n: 3, start: 6.3667, end: 9.5667},
  {n: 4, start: 9.5667, end: 13.2},
  {n: 5, start: 13.2, end: 16.5667},
  {n: 6, start: 16.5667, end: 19.1667},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe', 'dip'];
