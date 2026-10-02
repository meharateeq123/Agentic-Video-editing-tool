// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/elliott3.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   3.30  ("...when disaster struck."             |  "His brake rotor failed")
//   9.10  ("...an isolated problem."              |  "Ryan Blaney and Chris Buescher")
//  12.70  ("...brake failures at Gateway."        |  "Elliott is now 93 points")
//  15.50  ("...behind Hamlin."                    |  "Can he recover at Bristol")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (935,084 - 44) / 48,000 = 19.48s. Scene 5 carries the tail past the last word.

export const FPS = 30;
export const FILM_SECONDS = 19.48;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.3},
  {n: 2, start: 3.3, end: 9.1},
  {n: 3, start: 9.1, end: 12.7},
  {n: 4, start: 12.7, end: 15.5},
  {n: 5, start: 15.5, end: 19.48},
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
  null, // 1  Chase Elliott was running around seventh at Gateway when disaster struck.
  'whip', // 2  His brake rotor failed, ending his race and dropping him all the way to 31st. And this wasn't an isolated problem.
  'whipDown', // 3  Ryan Blaney and Chris Buescher also suffered brake failures at Gateway.
  'push', // 4  Elliott is now 93 points behind Hamlin.
  'dip', // 5  Can he recover at Bristol, or is his championship fight slipping away?
];
