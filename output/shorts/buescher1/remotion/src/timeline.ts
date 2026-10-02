// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/buescher1.wav, saved as ../vo-words.json), snapped onto the mid-point of each pause - not
// estimated. The breaks:
//    3.02 -> 3.34  ("...much better Gateway result."       |  "Then his brake failure...")
//   11.30 -> 11.56 ("...111 points behind Hamlin."          |  "But there's one reason for hope...")
//   15.28 -> 15.62 ("...won the Bristol Night Race before." |  "Can Bristol save...")
// Note: the "race, leaving...13th...111 points behind Hamlin" clause has no real pause in it (it
// runs 3.34 -> 11.30 straight through), so it stays one scene. Audio runs 17.72s, so scene 4
// carries the tail past the last word (17.38) to the end.

export const FPS = 30;
export const FILM_SECONDS = 17.72;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.18},
  {n: 2, start: 3.18, end: 11.43},
  {n: 3, start: 11.43, end: 15.45},
  {n: 4, start: 15.45, end: 17.72},
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
  null, // 1  Chris Buescher looked like he was heading for a much better Gateway result.
  'whip', // 2  Then his brake failure ended his race... 27th... 13th... 111 points behind Hamlin.
  'push', // 3  But there's one reason for hope: Buescher has already won the Bristol Night Race.
  'dip', // 4  Can Bristol save his championship hopes?
];
