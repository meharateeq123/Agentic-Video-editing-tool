// Scene timing comes from the voiceover's own pauses (ffmpeg silencedetect, snapped onto the
// known script's sentence boundaries) — not estimated.

export const FPS = 30;
export const FILM_SECONDS = 18.6;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.66},
  {n: 2, start: 4.66, end: 6.88},
  {n: 3, start: 6.88, end: 10.02},
  {n: 4, start: 10.02, end: 13.86},
  {n: 5, start: 13.86, end: 15.59},
  {n: 6, start: 15.59, end: 18.6},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

/** Overlap window used by every transition. */
export const OVERLAP = 12;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

/** Transition INTO each scene. Index 0 is scene 1 (film open — no transition). */
export const TRANSITION_IN: (TKind | null)[] = [
  null, // 1  Legacy Motor Club has confirmed Nemechek won't return to the No. 42 Toyota in 2027.
  'dip', // 2  And the shocking part?
  'push', // 3  His replacement is already locked in: Riley Herbst.
  'wipe', // 4  After a tough 2026 season, Nemechek now faces a huge question:
  'dip', // 5  where does he go next?
  'push', // 6  His NASCAR future just got VERY interesting.
];
