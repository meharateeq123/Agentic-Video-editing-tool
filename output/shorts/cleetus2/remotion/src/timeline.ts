// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/short1.wav), snapped onto the known script's sentence/clause boundaries — not estimated.

export const FPS = 30;
export const FILM_SECONDS = 15.86;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.34},
  {n: 2, start: 4.34, end: 7.24},
  {n: 3, start: 7.24, end: 9.52},
  {n: 4, start: 9.52, end: 11.3},
  {n: 5, start: 11.3, end: 14.7},
  {n: 6, start: 14.7, end: 15.86},
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
  null, // 1  iRacing Studios finally showed his No. 30 ARCA car in the latest developer video
  'dip', // 2  and fans got their first look at Cleetus back in the game.
  'push', // 3  He was already featured in NASCAR 25,
  'wipe', // 4  but now he's officially returning.
  'dip', // 5  And with Cleetus racing even more NASCAR events in real life,
  'push', // 6  could this be just the beginning?
];
