// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/blaney-gateway.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   1.64 -> 1.92  ("...third at Gateway,"            |  "putting him ahead")
//   4.90 -> 5.26  ("...for today's race."            |  "And there's another reason")
//   6.90 -> 7.06  ("...to watch him."                |  "Team Penske has won")
//  10.24 -> 10.52 ("...Cup races here."              |  "With the playoffs")
//  14.04          ("...huge Gateway win"             |  "and shake up the championship?")
// Audio runs 15.72s, so scene 6 carries the tail past the last word (15.26) to the end.

export const FPS = 30;
export const FILM_SECONDS = 15.72;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 1.78},
  {n: 2, start: 1.78, end: 5.08},
  {n: 3, start: 5.08, end: 6.98},
  {n: 4, start: 6.98, end: 10.38},
  {n: 5, start: 10.38, end: 14.04},
  {n: 6, start: 14.04, end: 15.72},
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
  null, // 1  Blaney qualified third at Gateway,
  'whip', // 2  putting him ahead of championship leader Denny Hamlin for today's race.
  'push', // 3  And there's another reason to watch him.
  'dip', // 4  Team Penske has won two of the last four Cup races here.
  'wipe', // 5  With the playoffs heating up, could Blaney pull off a huge Gateway win
  'whipDown', // 6  and shake up the championship?
];
