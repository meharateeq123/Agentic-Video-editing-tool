// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/sc28.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   5.00  ("...challenging champions."            |  "From Gretchen Walsh")
//   9.62  ("...Tomoyuki Matsushita,"              |  "the sport is changing fast")
//  11.10  ("...changing fast."                    |  "And with LA 2028")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (754,604 - 44) / 48,000 = 15.72s. Scene 4 carries the tail past the last word (15.24).

export const FPS = 30;
export const FILM_SECONDS = 15.72;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 5.0},
  {n: 2, start: 5.0, end: 9.62},
  {n: 3, start: 9.62, end: 11.1},
  {n: 4, start: 11.1, end: 15.72},
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
  null, // 1  The old guard is facing a new generation of swimmers who are breaking records and challenging champions.
  'whip', // 2  From Gretchen Walsh to Léon Marchand and rising stars like Tomoyuki Matsushita,
  'whipDown', // 3  the sport is changing fast.
  'push', // 4  And with LA 2028 approaching, could a new generation take control of swimming?
];
