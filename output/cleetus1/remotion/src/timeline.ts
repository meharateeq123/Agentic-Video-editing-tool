// Scene timing comes straight from transcript.json (VO pause-aligned).
// These are the timeline. Nothing here is estimated.

export const FPS = 30;
export const FILM_SECONDS = 291.96;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 14.43},
  {n: 2, start: 14.43, end: 20.25},
  {n: 3, start: 20.25, end: 36.17},
  {n: 4, start: 36.17, end: 43.6},
  {n: 5, start: 43.6, end: 51.37},
  {n: 6, start: 51.37, end: 59.75},
  {n: 7, start: 59.75, end: 70.66},
  {n: 8, start: 70.66, end: 79.38},
  {n: 9, start: 79.38, end: 95.76},
  {n: 10, start: 95.76, end: 105.24},
  {n: 11, start: 105.24, end: 111.51},
  {n: 12, start: 111.51, end: 123.62},
  {n: 13, start: 123.62, end: 134.1},
  {n: 14, start: 134.1, end: 145.45},
  {n: 15, start: 145.45, end: 152.14},
  {n: 16, start: 152.14, end: 162.71},
  {n: 17, start: 162.71, end: 175.6},
  {n: 18, start: 175.6, end: 197.05},
  {n: 19, start: 197.05, end: 214.12},
  {n: 20, start: 214.12, end: 224.69},
  {n: 21, start: 224.69, end: 241.45},
  {n: 22, start: 241.45, end: 260.87},
  {n: 23, start: 260.87, end: 271.51},
  {n: 24, start: 271.51, end: 285.67},
  {n: 25, start: 285.67, end: 291.96},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

/**
 * Overlap window used by every transition. Each scene bleeds this many frames
 * past its own cut so the incoming scene has something to transition over.
 * A dip-to-black is therefore 8 frames down and 8 back up, per flick-plan.md.
 */
export const OVERLAP = 16;

/** Beats inside a scene run this much past the scene end to cover the bleed. */
export const BLEED = 20;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

/**
 * Transition INTO each scene. Index 0 is scene 1 (film open — no transition).
 * Deliberately cycled: never the same kind twice in a row, and matched to the
 * beat of the line it lands on.
 */
export const TRANSITION_IN: (TKind | null)[] = [
  null, // 1  film opens
  'push', // 2  "let's break down" — scale through into the thesis
  'wipe', // 3  gradient wipe into the map
  'whip', // 4  whip into "the race started well"
  'dip', // 5  dip into the spin
  'push', // 6  push into the tyre explanation
  'whip', // 7  whip into the backlash
  'wipe', // 8  wipe into Dale Jr
  'push', // 9  push into his argument
  'whipDown', // 10 drop into "wrecking on a first attempt"
  'wipe', // 11 wipe into the wider point
  'whip', // 12 whip into the pushback
  'dip', // 13 dip into "here's the part headlines missed"
  'push', // 14 push into the second race
  'whip', // 15 whip into "No crash. No late spin."
  'wipe', // 16 wipe into Earnhardt's read
  'push', // 17 push into the two-race comparison
  'dip', // 18 dip into the résumé
  'whip', // 19 whip into Rockingham
  'wipe', // 20 wipe into the pattern
  'push', // 21 push into the long game
  'whipDown', // 22 drop into "so where does this leave Cleetus"
  'wipe', // 23 wipe into the message
  'push', // 24 push into the forward look
  'dip', // 25 dip into the closing road
];
