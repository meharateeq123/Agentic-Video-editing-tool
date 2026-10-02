// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/sc27.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   1.96  ("...almost here,"                      |  "and that means")
//   6.06  ("...the record books."                 |  "The World Cup begins")
//  10.80  ("...arrive in Beijing."                |  "With the best swimmers")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (697,004 - 44) / 48,000 = 14.52s. Scene 4 carries the tail past the last word (14.10).

export const FPS = 30;
export const FILM_SECONDS = 14.52;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 1.96},
  {n: 2, start: 1.96, end: 6.06},
  {n: 3, start: 6.06, end: 10.8},
  {n: 4, start: 10.8, end: 14.52},
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
  null, // 1  The short-course season is almost here,
  'whip', // 2  and that means another opportunity for swimming's biggest stars to attack the record books.
  'push', // 3  The World Cup begins in October before the World Short Course Championships arrive in Beijing.
  'dip', // 4  With the best swimmers in the world racing, how many records could fall?
];
