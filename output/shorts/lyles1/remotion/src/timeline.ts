// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/lyles1.wav, saved as ../vo-words.json), snapped onto word boundaries - not estimated.
// The breaks:
//   2.54  ("...called it a season."             |  "After a small strain")
//   5.40  ("...injury flare-ups,"               |  "Lyles decided to stop racing")
//   9.50  ("...2027 and 2028."                  |  "That means he missed")
//  12.44  ("...in Budapest."                    |  "But remember, he already ran")
//  16.34  ("...at USAs this year."              |  "The question now is")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (912,044 - 44) / 48,000 = 19.00s.

export const FPS = 30;
export const FILM_SECONDS = 19.0;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.54},
  {n: 2, start: 2.54, end: 5.4},
  {n: 3, start: 5.4, end: 9.5},
  {n: 4, start: 9.5, end: 12.44},
  {n: 5, start: 12.44, end: 16.34},
  {n: 6, start: 16.34, end: 19.0},
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
  null, // 1  Noah Lyles has officially called it a season!
  'whip', // 2  After a small strain turned into more injury flare-ups,
  'whipDown', // 3  Lyles decided to stop racing and focus on 2027 and 2028.
  'push', // 4  That means he missed the Ultimate Championship in Budapest.
  'wipe', // 5  But remember, he already ran 9.79 at USAs this year.
  'dip', // 6  The question now is... what comes next?
];