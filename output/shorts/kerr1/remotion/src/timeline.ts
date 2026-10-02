// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/kerr1.wav, saved as ../vo-words.json), snapped onto word boundaries - not estimated.
// The breaks:
//   3.40  ("...of his career."                 |  "In Budapest, Kerr waited")
//   8.04  ("...his famous kick."               |  "He closed the final 800 meters")
//  11.56  ("...in 1:47.79"                     |  "and won the 1500 meters in 3:29.35")
//  14.20  ("...3:29.35"                        |  "That capped a season with a mile world record")
//  19.72  the voiceover ends. (946,604 - 44) / 48,000 = 19.72s.
//
// Scene 6 is the payoff and has NO voiceover over it at all: it is 7 seconds of the real World
// Athletics call of the finish, at full volume, the way the reference short the user shared hands
// over from its own narration to the live race commentary and never takes it back.

export const FPS = 30;
export const VO_SECONDS = 19.72;
export const FILM_SECONDS = 26.72;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.4},
  {n: 2, start: 3.4, end: 8.04},
  {n: 3, start: 8.04, end: 11.56},
  {n: 4, start: 11.56, end: 14.2},
  {n: 5, start: 14.2, end: 19.72},
  {n: 6, start: 19.72, end: 26.72},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

/** Overlap window used by every transition. */
export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

/** Transition INTO each scene. Index 0 is scene 1 (film open - no transition). */
export const TRANSITION_IN: (TKind | null)[] = [
  null, // 1  Josh Kerr just produced one of the craziest finishes of his career.
  'whip', // 2  In Budapest, Kerr waited until the final stages before unleashing his famous kick.
  'push', // 3  He closed the final 800 meters in 1:47.79
  'whipDown', // 4  and won the 1500 meters in 3:29.35.
  'wipe', // 5  That capped a season with a mile world record, Commonwealth gold...
  'dip', // 6  (no VO) the live call of the finish.
];