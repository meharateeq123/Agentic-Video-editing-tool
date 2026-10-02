// Scene timing from Whisper word timestamps on vo/richardson2.wav (../vo-words.json).
//   3.62 ("...for 2027." | "After a tough season,")      8.76 ("...win in London." | "But now she's promising")
//  13.08 ("...in 2027."  | "and with Melissa running")   18.47 = end of the voiceover.
// Scene 5 has NO voiceover: Sha'Carri's own voice, straight from her post-race interview.

export const FPS = 30;
export const VO_SECONDS = 18.47;
export const FILM_SECONDS = 22.87;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.62},
  {n: 2, start: 3.62, end: 8.76},
  {n: 3, start: 8.76, end: 13.08},
  {n: 4, start: 13.08, end: 18.47},
  {n: 5, start: 18.47, end: 22.87},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];