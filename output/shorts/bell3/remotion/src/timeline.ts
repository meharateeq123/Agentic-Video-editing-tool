// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/bell3.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   4.68  ("...Gateway's late-race chaos,"        |  "but Bristol could be")
//   6.86  ("...exactly what he needs."            |  "Bell won the Bristol Night Race")
//   9.28  ("...last year,"                         |  "and now he's just 18 points")
//  13.50  ("...only nine points back."            |  "Bell can't afford")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (877,484 - 44) / 48,000 = 18.28s. Scene 5 carries the tail past the last word (17.72).

export const FPS = 30;
export const FILM_SECONDS = 18.28;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.68},
  {n: 2, start: 4.68, end: 6.86},
  {n: 3, start: 6.86, end: 9.28},
  {n: 4, start: 9.28, end: 13.5},
  {n: 5, start: 13.5, end: 18.28},
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
  null, // 1  Christopher Bell dropped to third in the standings after getting caught in Gateway's late-race chaos.
  'whip', // 2  But Bristol could be exactly what he needs.
  'push', // 3  Bell won the Bristol Night Race last year,
  'whip', // 4  and now he's just 18 points behind Denny Hamlin. With Larson only nine points back,
  'dip', // 5  Bell can't afford another bad race. Can Bell strike back under the lights?
];
