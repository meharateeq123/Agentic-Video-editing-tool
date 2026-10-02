// Scene timing from Whisper word timestamps on vo/zhang2.wav (../vo/zhang2.json).
// The script's first two sentences are 8.6s and 6.2s long, so each is split at its own comma:
//   4.22  ("...a stunning 1:43.49" | "in the 200-meter freestyle")
//   8.85  ("...smashing the Asian record." | "Even crazier")
//  12.00  ("...from his previous best" | "and beat reigning Asian Games champion")
//  15.27  ("...Hwang Sun-woo." | "Zhang is now officially")
// The VO file is 19.96s (last word "2028" ends 19.64); the film runs to 19.97s.

export const FPS = 30;
export const VO_SECONDS = 19.96;
export const FILM_SECONDS = 19.97;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.2333},
  {n: 2, start: 4.2333, end: 8.8667},
  {n: 3, start: 8.8667, end: 12.0},
  {n: 4, start: 12.0, end: 15.2667},
  {n: 5, start: 15.2667, end: 19.97},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'wipe'];
