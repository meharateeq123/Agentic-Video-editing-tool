// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/bell-championship.wav), snapped onto the script's own sentence boundaries — not estimated.
// Source segments (ms): [0,3020] [3260,8920] [9080,13860] [14120,19460] [19720,20640].

export const FPS = 30;
export const FILM_SECONDS = 21.08;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.14},
  {n: 2, start: 3.14, end: 9.0},
  {n: 3, start: 9.0, end: 13.99},
  {n: 4, start: 13.99, end: 19.59},
  {n: 5, start: 19.59, end: 21.08},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

/** Overlap window used by every transition. */
export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

/** Transition INTO each scene. Index 0 is scene 1 (film open — no transition). */
export const TRANSITION_IN: (TKind | null)[] = [
  null, // 1  Christopher Bell just changed the NASCAR championship fight!
  'whip', // 2  After going 33 races without a win, Bell shocked everyone by winning the Southern 500
  'dip', // 3  That victory pushed him all the way to second in the Chase, 12 points behind Hamlin.
  'push', // 4  With nine playoff races left, Bell now has momentum, confidence, and a real shot.
  'wipe', // 5  Could this be Bell's year?
];
