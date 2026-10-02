// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/gibbs3.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   4.68  ("...caught in the late chaos."          |  "But now he heads to Bristol")
//   8.08  ("...his chance to fight back."          |  "Gibbs won at Bristol")
//  12.52  ("...led 201 laps there."                |  "With 51 points to make up")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (827,564 - 44) / 48,000 = 17.24s. Scene 4 carries the tail past the last word (16.78).

export const FPS = 30;
export const FILM_SECONDS = 17.24;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.68},
  {n: 2, start: 4.68, end: 8.08},
  {n: 3, start: 8.08, end: 12.52},
  {n: 4, start: 12.52, end: 17.24},
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
  null, // 1  Ty Gibbs had a rough Gateway race, finishing 18th after getting caught in the late chaos.
  'whip', // 2  But now he heads to Bristol, and this could be his chance to fight back.
  'push', // 3  Gibbs won at Bristol earlier this year, and last fall he led 201 laps there.
  'dip', // 4  With 51 points to make up, can Gibbs turn Bristol into another huge statement?
];
