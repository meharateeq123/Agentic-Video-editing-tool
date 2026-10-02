// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/cleetus-talladega.wav), snapped onto the script's own sentence boundaries — not estimated.
// Source segments (ms): [0,4740] [5040,9320] [9540,13560] [13820,17380], plus a short trailing
// sound after 17800ms.
//
// Scene 4 is cut short at the user's request, right after "statement" — the closing
// "at Talladega?" and the trailing sound are dropped rather than played out.

export const FPS = 30;
export const FILM_SECONDS = 17.5;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.89},
  {n: 2, start: 4.89, end: 9.43},
  {n: 3, start: 9.43, end: 13.69},
  {n: 4, start: 13.69, end: 17.5},
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
  null, // 1  Cleetus McFarland's FINAL NASCAR race of 2026 is coming, and it's a big one!
  'whip', // 2  On October 23, Cleetus is set to return to Talladega for a Truck Series race.
  'dip', // 3  After a wild year of racing, this could be his last NASCAR start of the season.
  'push', // 4  But can Cleetus finish 2026 with a HUGE statement at Talladega?
];
