// Scene timing from Whisper word timestamps on vo/worldcup1.wav (../vo/worldcup1.json).
//   4.57  ("...in Baku, Azerbaijan," | "before moving to Tashkent")
//   6.60  ("...Tashkent and Astana." | "It's the first major chance")
//  11.13  ("...after the Asian Games." | "And with the World Short Course")
//  14.97  ("...coming in December," | "more records could be coming")
// The VO file is 16.68s (last word "coming" ends 16.24); the film runs to 16.67s.

export const FPS = 30;
export const VO_SECONDS = 16.68;
export const FILM_SECONDS = 16.6667;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.5667},
  {n: 2, start: 4.5667, end: 6.6},
  {n: 3, start: 6.6, end: 11.1333},
  {n: 4, start: 11.1333, end: 14.9667},
  {n: 5, start: 14.9667, end: 16.6667},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe'];
