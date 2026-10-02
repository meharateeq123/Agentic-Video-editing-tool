// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/gout1.wav, saved as ../vo-words.json), snapped onto word boundaries - not estimated.
// The breaks:
//   3.44  ("...earlier than expected,"           |  "but now the focus is 2027.")
//   5.66  ("...focus is 2027."                   |  "The Australian sprint star")
//  11.18  ("...injury in training."              |  "But before that, he ran")
//  16.20  ("...Under 20 World record."           |  "Now the big question")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (977,324 - 44) / 48,000 = 20.36s.

export const FPS = 30;
export const FILM_SECONDS = 20.36;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.44},
  {n: 2, start: 3.44, end: 5.66},
  {n: 3, start: 5.66, end: 11.18},
  {n: 4, start: 11.18, end: 16.2},
  {n: 5, start: 16.2, end: 20.36},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

/** Overlap window used by every transition. */
export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

/** Transition INTO each scene. Index 0 is scene 1 (film open - no transition). */
export const TRANSITION_IN: (TKind | null)[] = [
  null, // 1  Gout Gout's 2026 season ended earlier than expected,
  'whip', // 2  but now the focus is 2027.
  'push', // 3  The Australian sprint star missed the World Under-20 championships...
  'wipe', // 4  But before that, he ran an incredible 19.67 for the Under-20 World record.
  'whipDown', // 5  Now the big question is simple: how fast will Gout be when he comes back?
];