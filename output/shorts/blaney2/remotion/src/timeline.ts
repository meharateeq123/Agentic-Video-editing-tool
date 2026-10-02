// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/blaney2.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   5.02  ("...strong playoff finish."         |  "Then, on lap 155")
//  11.97  ("...forcing him into the wall."     |  "But here's the scary part.")
//  15.74  ("...with brake trouble."            |  "Zane Smith and Chase Elliott")
//  19.68  ("...during the race."               |  "Now the big question is")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (1,161,644 - 44) / 48,000 = 24.20s. Scene 5 carries the tail past the last word (23.74).

export const FPS = 30;
export const FILM_SECONDS = 24.2;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 5.02},
  {n: 2, start: 5.02, end: 11.97},
  {n: 3, start: 11.97, end: 15.74},
  {n: 4, start: 15.74, end: 19.68},
  {n: 5, start: 19.68, end: 24.2},
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
  null, // 1  But Ryan Blaney was running inside the top six at Gateway and looked set for a strong playoff finish.
  'whip', // 2  Then, on Lap 155, his right-front brake rotor failed, sending debris through the hood and forcing him into the wall.
  'push', // 3  But here's the scary part: Blaney wasn't the only driver with brake trouble.
  'whip', // 4  Zane Smith and Chase Elliott also suffered brake failures during the race.
  'dip', // 5  Now the big question is... is NASCAR facing a serious brake problem?
];
