// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/larson-p2.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   2.88          ("...right beside"                 |  "pole sitter Joey Logano")
//   5.26 -> 5.54  ("...in today's race."             |  "That gives him")
//   9.00 -> 9.30  ("...fight for the win."           |  "With the NASCAR playoffs")
//  12.20 -> 12.42 ("...needs a big result."          |  "Could he turn P2")
// Audio runs 15.08s, so scene 5 carries the tail past the last word (14.60) to the end.

export const FPS = 30;
export const FILM_SECONDS = 15.08;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.88},
  {n: 2, start: 2.88, end: 5.4},
  {n: 3, start: 5.4, end: 9.15},
  {n: 4, start: 9.15, end: 12.31},
  {n: 5, start: 12.31, end: 15.08},
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
  null, // 1  After qualifying second, Larson will start right beside
  'whip', // 2  pole sitter Joey Logano in today's race.
  'push', // 3  That gives him a perfect shot to attack from the opening laps and fight for the win.
  'dip', // 4  With the NASCAR playoffs heating up, Larson needs a big result.
  'wipe', // 5  Could he turn P2 into a HUGE victory?
];
