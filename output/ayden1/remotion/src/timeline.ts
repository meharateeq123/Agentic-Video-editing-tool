// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/ayden-tan.wav), snapped onto the article's own paragraph/sentence boundaries — not
// estimated.

export const FPS = 30;
export const FILM_SECONDS = 463.98;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 7.9},
  {n: 2, start: 7.9, end: 24.16},
  {n: 3, start: 24.16, end: 39.9},
  {n: 4, start: 39.9, end: 51.12},
  {n: 5, start: 51.12, end: 79.02},
  {n: 6, start: 79.02, end: 108.44},
  {n: 7, start: 108.44, end: 139.22},
  {n: 8, start: 139.22, end: 155.38},
  {n: 9, start: 155.38, end: 179.4},
  {n: 10, start: 179.4, end: 189.34},
  {n: 11, start: 189.34, end: 208.66},
  {n: 12, start: 208.66, end: 227.6},
  {n: 13, start: 227.6, end: 236.36},
  {n: 14, start: 236.36, end: 267.24},
  {n: 15, start: 267.24, end: 297.7},
  {n: 16, start: 297.7, end: 316.86},
  {n: 17, start: 316.86, end: 346.12},
  {n: 18, start: 346.12, end: 361.88},
  {n: 19, start: 361.88, end: 386.76},
  {n: 20, start: 386.76, end: 412.84},
  {n: 21, start: 412.84, end: 441.84},
  {n: 22, start: 441.84, end: 463.98},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

export const OVERLAP = 16;
export const BLEED = 20;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

/** Transition INTO each scene. Index 0 is scene 1 (film open — no transition). */
export const TRANSITION_IN: (TKind | null)[] = [
  null, // 1  A 12-year-old touches the wall.
  'dip', // 2  This is the story of Ayden Tan...
  'push', // 3  By the time his 11-12 age group ended...
  'wipe', // 4  It started well before that summer...
  'whip', // 5  The 2025 record run began in the 200 IM...
  'dip', // 6  At a small local meet in Saratoga...
  'push', // 7  The pattern continued into the summer's biggest meets...
  'whipDown', // 8  He also broke records in the 100 back and 100 IM...
  'wipe', // 9  Even at meets where he did not break a record...
  'whip', // 10  Over one stretch, Tan competed in six of seven weekends...
  'push', // 11  What makes this run stand out is the range of events...
  'dip', // 12  This range matters more than it might first appear...
  'wipe', // 13  Coaches often view IM success...
  'whip', // 14  His progress within events tells the same story...
  'push', // 15  Swimming coaches and analysts... (SwimSwam quote)
  'whipDown', // 16  None of this happened without setbacks... club changes
  'wipe', // 17  The obvious question is what comes next...
  'dip', // 18  The swimmers who do make that jump share range...
  'push', // 19  Tan's own results point to steady improvement...
  'whip', // 20  For now, Tan moves into the 13-14 age group...
  'wipe', // 21  Whether Tan becomes a senior national team swimmer...
  'dip', // 22  Do you think Ayden Tan keeps up this pace...
];
