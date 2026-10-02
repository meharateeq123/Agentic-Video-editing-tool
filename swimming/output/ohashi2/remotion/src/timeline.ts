// Scene timing from Whisper word timestamps on vo/ohashi2.wav (../vo/ohashi2.json).
//   3.47  ("...newest rising star." | "After Shin Ohashi broke")
//   6.83  ("...world record" | "in 2:04.83,")          <- split mid-sentence so the stamp gets its own scene
//   9.07  ("...in 2:04.83," | "Marchand called")
//  13.20  ("...a scary competitor." | "Ohashi is now looking")
//  16.07  ("...toward LA 2028," | "where Marchand could become")   <- split mid-sentence, it ran 5.3s
//  18.50  ("...his biggest rivals." | "And Ohashi says")
//  20.80  ("...for the challenge." | "Could this become")
// The VO file is 23.40s (last word "battle?" ends 22.94); the film runs to 23.40s.

export const FPS = 30;
export const VO_SECONDS = 23.4;
export const FILM_SECONDS = 23.4;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.4667},
  {n: 2, start: 3.4667, end: 6.8333},
  {n: 3, start: 6.8333, end: 9.0667},
  {n: 4, start: 9.0667, end: 13.2},
  {n: 5, start: 13.2, end: 16.0667},
  {n: 6, start: 16.0667, end: 18.5},
  {n: 7, start: 18.5, end: 20.8},
  {n: 8, start: 20.8, end: 23.4},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe', 'dip', 'whip', 'push'];
