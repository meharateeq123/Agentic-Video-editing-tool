// Scene timing from Whisper word timestamps on vo/zhang3.wav (../vo/zhang3.json).
//   6.63  ("...touching in 25.41," | "she beat teammate Wu Qingfeng")
//  11.60  ("...another Asian Games gold." | "After everything she's already achieved")
//  16.07  ("...on the biggest stages," | "and the next chapter")
// The script's first two sentences are kept as ONE scene: "touching in 25.41" is only 1.5s on its own,
// which is too short for the 25.41 stamp to land and leave without being cut off by the scene end.
// The VO file is 18.76s (last word "interesting" ends 18.28); the film runs to 18.77s.

export const FPS = 30;
export const VO_SECONDS = 18.76;
export const FILM_SECONDS = 18.77;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 6.6333},
  {n: 2, start: 6.6333, end: 11.6},
  {n: 3, start: 11.6, end: 16.0667},
  {n: 4, start: 16.0667, end: 18.7667},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown'];
