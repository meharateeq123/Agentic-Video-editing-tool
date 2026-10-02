// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/byron-championship.wav), snapped onto the script's own sentence boundaries — not estimated.
// The six scene breaks land in the silences Whisper found between clauses:
//   3.82 -> 4.06  ("...huge hit."   |  "At Darlington,")
//   7.28 -> 7.50  ("...engine failure,"  |  "leaving him with")
//   9.82 -> 10.14 ("...place finish."    |  "Now he sits")
//  11.96 -> 12.18 ("...chase drivers,"   |  "114 points")
//  15.48         ("...races left."       |  "Can Byron pull off")
// Audio runs 20.68s, so scene 6 carries the tail past the last word (20.26) to the end.

export const FPS = 30;
export const FILM_SECONDS = 20.68;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.94},
  {n: 2, start: 3.94, end: 7.39},
  {n: 3, start: 7.39, end: 9.98},
  {n: 4, start: 9.98, end: 12.07},
  {n: 5, start: 12.07, end: 15.48},
  {n: 6, start: 15.48, end: 20.68},
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
  null, // 1  William Byron just saw his NASCAR championship hopes take a huge hit.
  'whip', // 2  At Darlington, Byron spun late, then suffered an engine failure,
  'push', // 3  leaving him with a brutal 37th-place finish.
  'dip', // 4  Now he sits last among the Chase drivers,
  'wipe', // 5  114 points behind Denny Hamlin with nine races left.
  'whipDown', // 6  Can Byron pull off a massive comeback, or is his run already in trouble?
];
