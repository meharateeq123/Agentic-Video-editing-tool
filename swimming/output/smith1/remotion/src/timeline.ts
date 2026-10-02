// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/smith1.wav, saved as ../vo-words.json), snapped onto word boundaries - not estimated.
// The breaks:
//   3.08  ("...Pacific Championships."          |  "She won the 200 Backstroke,")
//   9.78  ("...than in the finals."             |  "She went 57.86 in the 100 Back Prelim")
//  15.04  ("...finishing with 58.11,"           |  "then posted 2:04.13 in the 200 Back Prelim")
//  22.08  ("...winning the final in 2:05.57."   |  "What happened at night?")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (1,123,244 - 44) / 48,000 = 23.40s.

export const FPS = 30;
export const FILM_SECONDS = 23.4;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.08},
  {n: 2, start: 3.08, end: 9.78},
  {n: 3, start: 9.78, end: 15.04},
  {n: 4, start: 15.04, end: 22.08},
  {n: 5, start: 22.08, end: 23.4},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

/** Overlap window used by every transition. */
export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

/** Transition INTO each scene. Index 0 is scene 1 (film open - no transition). */
export const TRANSITION_IN: (TKind | null)[] = [
  null, // 1  Regan Smith had a strange Pan Pacific Championships.
  'whip', // 2  She won the 200 Backstroke, but in both the 100 and 200 Back...
  'push', // 3  She went 57.86 in the 100 Back Prelim before finishing with 58.11,
  'whipDown', // 4  then posted 2:04.13 in the 200 Back Prelim before winning the final in 2:05.57.
  'wipe', // 5  What happened at night?
];