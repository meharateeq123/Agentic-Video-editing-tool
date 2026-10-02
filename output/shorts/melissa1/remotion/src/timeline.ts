// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/melissa1.wav, saved as ../whisper-out/melissa1.json), snapped onto the mid-point of each
// pause - not estimated. The breaks:
//    3.08 -> 3.34  ("...took her season to another level."     |  "After winning the 100m...")
//   13.88 -> 14.08 ("...according to World Athletics."         |  "She also completed...")
//   16.38 -> 16.48 ("...sprint double in Budapest."             |  "So who can stop Melissa now?")
// Note: "After winning the 100 meters in 10.62...200 meter that moved her to third...World
// Athletics" (3.34 -> 13.88) has no real pause in it, so the whole 100m+200m stat beat stays one
// scene. Audio runs 18.76s (ffprobe), so scene 4 carries the tail past the last word (18.24).

export const FPS = 30;
export const FILM_SECONDS = 18.76;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.21},
  {n: 2, start: 3.21, end: 13.98},
  {n: 3, start: 13.98, end: 16.43},
  {n: 4, start: 16.43, end: 18.76},
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
  null, // 1  Melissa Jefferson-Wooden just took her season to another level.
  'whip', // 2  100m in 10.62... 200m in 21.47... third on the world all-time list.
  'push', // 3  She also completed the sprint double in Budapest.
  'dip', // 4  So who can stop Melissa now?
];
