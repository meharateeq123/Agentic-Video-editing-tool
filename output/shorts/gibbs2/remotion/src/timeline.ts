// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/gibbs-chase.wav), snapped onto word boundaries — not estimated.
// The breaks:
//   1.74 -> 1.96  ("...at Darlington,"      |  "the young star")
//   4.14          ("...just 39 points"      |  "behind Denny Hamlin")
//   6.34 -> 6.50  ("...playoff standings."  |  "Now, with Gateway next,")
//   7.64 -> 7.94  ("...Gateway next,"       |  "Gibbs has a huge chance")
//  10.34 -> 10.54 ("...the gap again."      |  "Could Ty Gibbs shock NASCAR")
// Audio runs 14.52s, so scene 6 carries the tail past the last word (14.12) to the end.

export const FPS = 30;
export const FILM_SECONDS = 14.52;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 1.85},
  {n: 2, start: 1.85, end: 4.14},
  {n: 3, start: 4.14, end: 6.42},
  {n: 4, start: 6.42, end: 7.94},
  {n: 5, start: 7.94, end: 10.44},
  {n: 6, start: 10.44, end: 14.52},
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
  null, // 1  After finishing second at Darlington,
  'whip', // 2  the young star moved to just 39 points
  'push', // 3  behind Denny Hamlin in the playoff standings.
  'dip', // 4  Now, with Gateway next,
  'wipe', // 5  Gibbs has a huge chance to close the gap again.
  'whipDown', // 6  Could Ty Gibbs shock NASCAR and make a championship run nobody saw coming?
];
