// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/mcintosh1.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   3.58  ("...Pan Pacific Championships"   |  "in 4:28.01")
//   6.96  ("...championship record."        |  "But there was a twist.")
//   8.10  ("...a twist."                    |  "She wasn't satisfied")
//  11.90  ("...more than 4 seconds slower"  |  "than her world record")
//  14.44  ("...of 4:23.65."                 |  "She won gold")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (885,164 - 44) / 48,000 = 18.44s.

export const FPS = 30;
export const FILM_SECONDS = 18.44;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.58},
  {n: 2, start: 3.58, end: 6.96},
  {n: 3, start: 6.96, end: 8.1},
  {n: 4, start: 8.1, end: 11.9},
  {n: 5, start: 11.9, end: 14.44},
  {n: 6, start: 14.44, end: 18.44},
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
  null, // 1  Summer McIntosh won the 400 IM at the Pan Pacific Championships
  'whip', // 2  in 4:28.01, setting a championship record.
  'dip', // 3  But there was a twist.
  'push', // 4  She wasn't satisfied with the swim because her time was more than four seconds slower
  'whipDown', // 5  than her world record of 4:23.65.
  'wipe', // 6  She won gold, but McIntosh clearly believes she can go much faster.
];
