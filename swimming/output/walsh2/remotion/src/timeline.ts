// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/walsh2.wav, saved as ../vo/walsh2.json), snapped onto the mid-point of each pause - not
// estimated. The breaks:
//    3.40 -> 3.72  ("...record higher."                    |  "In May, she broke...")
//    8.12 -> 8.44  ("...stunning 54.33 seconds."            |  "It was the fourth time...")
//   10.48 -> 10.76 ("...had lowered the mark."              |  "And with another short course...")
//   14.08 -> 14.36 ("...the big question is simple."        |  "How much faster...")
// Audio runs 16.68s (ffprobe), so scene 5 carries the tail past the last word (16.14).

export const FPS = 30;
export const FILM_SECONDS = 16.68;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.56},
  {n: 2, start: 3.56, end: 8.28},
  {n: 3, start: 8.28, end: 10.62},
  {n: 4, start: 10.62, end: 14.22},
  {n: 5, start: 14.22, end: 16.68},
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
  null, // 1  Gretchen Walsh keeps pushing the 100m butterfly record higher.
  'whip', // 2  In May, she broke her own world record again with a stunning 54.33 seconds.
  'push', // 3  It was the fourth time Walsh had lowered the mark.
  'dip', // 4  And with another short course season coming, the big question is simple.
  'wipe', // 5  How much faster can Gretchen Walsh go?
];
