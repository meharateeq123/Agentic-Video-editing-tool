// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/reddick2.wav, saved as ../vo-words.json), snapped onto the mid-point of each pause - not
// estimated. The breaks:
//   3.04 -> 3.22  ("...went wrong almost immediately."   |  "Contact with Daniel Suarez...")
//   9.02 -> 9.22  ("...caught in another major wreck."   |  "Reddick finished just 25th...")
//  14.88 -> 15.16 ("...a chance to recover."              |  "Can Reddick finally...")
// Audio runs 18.12s, so scene 4 carries the tail past the last word (17.62) to the end.

export const FPS = 30;
export const FILM_SECONDS = 18.12;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.13},
  {n: 2, start: 3.13, end: 9.12},
  {n: 3, start: 9.12, end: 15.02},
  {n: 4, start: 15.02, end: 18.12},
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
  null, // 1  Tyler Reddick's Gateway race went wrong almost immediately.
  'whip', // 2  Contact with Daniel Suarez sent him into the wall on Lap 3, and later another wreck.
  'push', // 3  Reddick finished just 25th and is now 42 points behind Hamlin, but Bristol...
  'dip', // 4  Can Reddick finally get a clean race when he needs it most?
];
