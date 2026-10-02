// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/logano3.wav), snapped onto the mid-point of each pause - not estimated. The breaks:
//   6.58 -> 6.86  ("...led a race-high 96 laps."        |  "But Kyle Larson's late strategy")
//   9.58 -> 9.84  ("...helped change everything."       |  "Logano finished third")
//  13.82 -> 14.18 ("...leaving him with a huge what if."|  "Now Bristol is next")
//  18.10 -> 18.36 ("...still 51 points behind Hamlin."  |  "Could he finally strike back?")
// Audio runs 19.8s, so scene 5 carries the tail past the last word (19.44) to the end.

export const FPS = 30;
export const FILM_SECONDS = 19.8;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 6.72},
  {n: 2, start: 6.72, end: 9.71},
  {n: 3, start: 9.71, end: 14.0},
  {n: 4, start: 14.0, end: 18.23},
  {n: 5, start: 18.23, end: 19.8},
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
  null, // 1  Joey Logano looked unstoppable at Gateway. He started on pole, won Stage 1, led 96 laps.
  'whip', // 2  But Kyle Larson's late strategy helped change everything.
  'push', // 3  Logano finished third instead of taking the win, leaving him with a huge what if.
  'dip', // 4  Now Bristol is next, and Logano is still 51 points behind Hamlin.
  'whipDown', // 5  Could he finally strike back?
];
