// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/larson3.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   1.70 -> 2.26  ("...more than a year,"                |  "Larson finally broke through")
//   5.18 -> 5.94  ("...huge overtime victory."           |  "But this win")
//   7.48 -> 7.98  ("...ending a drought."                |  "Larson is now")
//  11.96 -> 12.70 ("...championship battle."             |  "With the playoffs")
//  15.52 -> 15.98 ("...right back in the fight."         |  "Could this win")
// Audio runs 18.60s, so scene 6 carries the tail past the last word (17.88) to the end.

export const FPS = 30;
export const FILM_SECONDS = 18.6;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.2},
  {n: 2, start: 2.2, end: 5.6},
  {n: 3, start: 5.6, end: 7.76},
  {n: 4, start: 7.76, end: 12.36},
  {n: 5, start: 12.36, end: 15.78},
  {n: 6, start: 15.78, end: 18.6},
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
  null, // 1  After going winless for more than a year,
  'whip', // 2  Larson finally broke through at Gateway with a huge overtime victory.
  'push', // 3  But this win is bigger than ending a drought.
  'dip', // 4  Larson is now just 9 points behind Denny Hamlin in the NASCAR championship battle.
  'wipe', // 5  With the playoffs heating up, Larson is suddenly right back in the fight.
  'whipDown', // 6  Could this win be the start of another championship run?
];
