// Scene timing from Whisper word timestamps on vo/ngetich1.wav (../vo-words.json).
//   3.12 ("...a world record." | "In Copenhagen,")       6.38 ("...1:05:15" | "to win the World Half Marathon")
//  11.30 ("...by one second." | "But here's the crazy part.")   14.40 ("...50 seconds" | "and Ngetich is on another level.")
// The film runs 0.5s past the last word (16.22s); the VO file itself is 16.72s. VO only - no real-clip ending.

export const FPS = 30;
export const VO_SECONDS = 16.72;
export const FILM_SECONDS = 17.2;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.12},
  {n: 2, start: 3.12, end: 6.38},
  {n: 3, start: 6.38, end: 11.3},
  {n: 4, start: 11.3, end: 14.4},
  {n: 5, start: 14.4, end: 17.2},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];
