// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/toyota-threats.wav), snapped onto word boundaries — not estimated.
// The breaks:
//   3.48          ("...first, second and third"      |  "with Christopher Bell")
//   5.22 -> 5.52  ("...taking the win."              |  "Now Bell sits")
//   8.12          ("...behind Denny Hamlin"          |  "while Ty Gibbs")
//  10.22 -> 10.42 ("...only 39 back."                |  "With Gateway next,")
//  13.94 -> 14.40 ("...championship threats."        |  "Is anyone stopping Toyota")
// Audio runs 16.44s, so scene 6 carries the tail past the last word (16.04) to the end.

export const FPS = 30;
export const FILM_SECONDS = 16.44;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.48},
  {n: 2, start: 3.48, end: 5.37},
  {n: 3, start: 5.37, end: 8.12},
  {n: 4, start: 8.12, end: 10.32},
  {n: 5, start: 10.32, end: 14.17},
  {n: 6, start: 14.17, end: 16.44},
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
  null, // 1  At Darlington, Toyota drivers finished first, second and third,
  'whip', // 2  with Christopher Bell taking the win.
  'push', // 3  Now Bell sits just 12 points behind Denny Hamlin,
  'dip', // 4  while Ty Gibbs is only 39 back.
  'wipe', // 5  With Gateway next, Toyota has three serious championship threats.
  'whipDown', // 6  Is anyone stopping Toyota this year?
];
