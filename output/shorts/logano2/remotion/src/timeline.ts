// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/logano2.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   5.96 -> 6.82  ("...for a huge victory,"             |  "but late race chaos")
//   8.24 -> 8.82  ("...changed everything"              |  "and Logano had to settle")
//  12.16 -> 12.70 ("...took the win in overtime."       |  "After looking like")
//  16.72 -> 17.34 ("...watched the victory slip away."  |  "Could he bounce back")
// Audio runs 19.64s, so scene 5 carries the tail past the last word (18.94) to the end.

export const FPS = 30;
export const FILM_SECONDS = 19.64;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 6.4},
  {n: 2, start: 6.4, end: 8.62},
  {n: 3, start: 8.62, end: 12.43},
  {n: 4, start: 12.43, end: 17.05},
  {n: 5, start: 17.05, end: 19.64},
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
  null, // 1  Logano started on pole, won the first stage and led 96 laps. Everything looked perfect...
  'whip', // 2  but late race chaos changed everything
  'push', // 3  and Logano had to settle for third while Kyle Larson took the win in overtime.
  'dip', // 4  After looking like the fastest driver all night, Logano watched the victory slip away.
  'whipDown', // 5  Could he bounce back in the next playoff race?
];
