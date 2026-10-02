// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/cleetus5.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   5.66 -> 5.78  ("...alongside Squirrel McNutt."        |  "Cleetus has built his name")
//   8.14 -> 8.28  ("...racing in the real world,"         |  "but now fans can")
//  11.32 -> 11.58 ("...race as him in a NASCAR game."     |  "And the big question")
// Audio runs 16.28s, so scene 4 carries the tail past the last word (15.80) to the end.

export const FPS = 30;
export const FILM_SECONDS = 16.28;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 5.72},
  {n: 2, start: 5.72, end: 8.21},
  {n: 3, start: 8.21, end: 11.45},
  {n: 4, start: 11.45, end: 16.28},
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
  null, // 1  The famous YouTube racer is now officially featured in the upcoming NASCAR video game alongside Squirrel McNutt.
  'whip', // 2  Cleetus has built his name racing in the real world,
  'push', // 3  but now fans can actually race as him in a NASCAR game.
  'dip', // 4  And the big question is, can Cleetus actually compete with NASCAR's biggest stars in the game?
];
