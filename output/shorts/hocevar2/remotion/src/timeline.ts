// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/hocevar2.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   5.30  ("...a huge result."                     |  "He finished eighth")
//   8.64  ("...top-10 of the season."              |  "Even crazier")
//  12.10  ("...championship standings."            |  "Hocevar is now ninth")
//  15.90  ("...behind Hamlin."                     |  "Could Bristol be")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (954,284 - 44) / 48,000 = 19.88s. Scene 5 carries the tail past the last word.

export const FPS = 30;
export const FILM_SECONDS = 19.88;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 5.3},
  {n: 2, start: 5.3, end: 8.64},
  {n: 3, start: 8.64, end: 12.1},
  {n: 4, start: 12.1, end: 15.9},
  {n: 5, start: 15.9, end: 19.88},
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
  null, // 1  Carson Hocevar survived absolute chaos at Gateway and still came away with a huge result.
  'whip', // 2  He finished eighth, giving him his 10th top-10 of the season.
  'whipDown', // 3  Even crazier, he gained three positions in the championship standings.
  'push', // 4  Hocevar is now ninth, but he's still 88 points behind Hamlin.
  'dip', // 5  Could Bristol be where this unexpected championship run gets even crazier?
];
