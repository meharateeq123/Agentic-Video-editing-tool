// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/cleetus-nascar26.wav), snapped onto the script's own sentence boundaries — not estimated.
// Source segments (ms): [0,3400] [3780,5820] [6220,8440] [8660,13980] [13980,18680] [18680,19220]
// [19220,20220].

export const FPS = 30;
export const FILM_SECONDS = 20.68;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.78},
  {n: 2, start: 3.78, end: 8.66},
  {n: 3, start: 8.66, end: 13.98},
  {n: 4, start: 13.98, end: 18.68},
  {n: 5, start: 18.68, end: 20.68},
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
  null, // 1  Cleetus McFarland JUST got a huge NASCAR 26 reveal!
  'whip', // 2  The latest game footage officially shows Cleetus' No. 30 ARCA car racing at Talladega.
  'push', // 3  After appearing in NASCAR 25, Cleetus is now coming back for NASCAR 26,
  'dip', // 4  and with his real-world NASCAR career growing, fans wonder if he'll have an even bigger role this time.
  'whipDown', // 5  Cleetus is back!
];
