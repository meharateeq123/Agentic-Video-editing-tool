// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/toyota-championship.wav), snapped onto the script's own sentence boundaries — not estimated.
// Source segments (ms): [0,2540] [2800,5040] [5340,7720] [8080,10720] [10980,12700] [12940,15220]
// [15220,16860] [17100,19180] [19180,21440].

export const FPS = 30;
export const FILM_SECONDS = 21.88;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 2.8},
  {n: 2, start: 2.8, end: 8.08},
  {n: 3, start: 8.08, end: 10.98},
  {n: 4, start: 10.98, end: 12.94},
  {n: 5, start: 12.94, end: 17.1},
  {n: 6, start: 17.1, end: 21.88},
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
  null, // 1  Toyota JUST took over the NASCAR championship.
  'whip', // 2  At Darlington, Toyota drivers Christopher Bell, Ty Gibbs and Tyler Reddick...
  'push', // 3  ...finished first, second and third — and it gets even crazier.
  'dip', // 4  Denny Hamlin still leads the Chase,
  'wipe', // 5  while Bell sits just 12 points behind him, with Gibbs only 39 back.
  'whipDown', // 6  Can anyone stop Toyota from winning the championship?
];
