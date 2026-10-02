// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/gibbs-darlington.wav), snapped onto the script's own sentence boundaries — not estimated.
// Source segments (ms): [0,3040] [3360,4700] [4960,6480] [6700,9660] [9900,13940] [14300,15620]
// [15820,17940] [18100,19800].

export const FPS = 30;
export const FILM_SECONDS = 20.28;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.83},
  {n: 2, start: 4.83, end: 9.78},
  {n: 3, start: 9.78, end: 14.12},
  {n: 4, start: 14.12, end: 18.02},
  {n: 5, start: 18.02, end: 20.28},
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
  null, // 1  Ty Gibbs just proved he's not a future champion anymore. He's a threat right now.
  'whip', // 2  Starting 28th at Darlington, Gibbs charged all the way to second in the Southern 500.
  'dip', // 3  That huge finish puts him just 39 points behind Denny Hamlin in the Chase.
  'push', // 4  With nine races still left, Gibbs has a real chance to shock NASCAR.
  'wipe', // 5  Could Ty Gibbs actually win it all?
];
