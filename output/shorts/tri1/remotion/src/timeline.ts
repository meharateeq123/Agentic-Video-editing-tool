// Scene timing from Whisper word timestamps on vo/tri1.wav (../vo/tri1.json).
//   4.50 ("...looks incredible." | "Athletes will swim")   6.85 ("...1.5 km," | "bike 40 km,")
//   8.15 ("...40 km," | "then finish with a 10 km run")    12.10 ("...coastline." | "And here's the crazy part.")
//  13.30 ("...crazy part." | "The women's race will award the first Olympic medal of LA 2028.")
// The VO file is 17.72s; the film runs 0.5s past it.

export const FPS = 30;
export const VO_SECONDS = 17.72;
export const FILM_SECONDS = 18.22;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.5},
  {n: 2, start: 4.5, end: 6.85},
  {n: 3, start: 6.85, end: 8.15},
  {n: 4, start: 8.15, end: 12.1},
  {n: 5, start: 12.1, end: 13.3},
  {n: 6, start: 13.3, end: 18.22},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip', 'wipe'];
