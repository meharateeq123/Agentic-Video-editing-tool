// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/hodgkinson1.wav, saved as ../vo-words.json), snapped onto word boundaries - not estimated.
// The breaks:
//   3.94  ("...behind her injury."               |  "She says a freak fall during")
//   9.44  ("...hit her later."                   |  "Even with the injury, she still raced")
//  14.78  ("...set for Athlos in London."         |  "Could this be her toughest season yet?")
// The wav header carries a placeholder data size, so the voiceover itself runs
// (800,684 - 44) / 48,000 = 16.68s.
//
// Scene 5 carries NO voiceover: it is 3.0s of Hodgkinson's own real voice (the h5 bed, baked WITH
// its sync audio) answering the "toughest season" line in her own words - same pattern as kerr1's
// live-commentary payoff. FILM_SECONDS is therefore longer than the voiceover.

export const FPS = 30;
export const VO_SECONDS = 16.68;
export const FILM_SECONDS = 19.68;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.94},
  {n: 2, start: 3.94, end: 9.44},
  {n: 3, start: 9.44, end: 14.78},
  {n: 4, start: 14.78, end: 16.68},
  {n: 5, start: 16.68, end: 19.68},
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
  null, // 1  Keely Hodgkinson just revealed the shocking story behind her injury.
  'whip', // 2  She says a freak fall during a cooldown run in July...
  'push', // 3  Even with the injury, she still raced at the Ultimate Championship...
  'whipDown', // 4  Could this be her toughest season yet?
  'dip', // 5  (no VO) her own real voice answers.
];