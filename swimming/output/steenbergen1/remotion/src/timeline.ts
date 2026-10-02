// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/steenbergen1.wav, saved as ../vo-words.json), snapped onto word boundaries - not estimated.
// The breaks:
//   3.82  ("...record book."                       |  "At the 2026 Settecolli meet,")
//   7.00  ("...the Dutch star blasted"              |  "51.68 seconds, breaking the world record.")
//  10.40  ("...breaking the world record."          |  "She also won the 100 free")
//  15.12  ("...World Championships in Singapore."   |  "Now, with short course racing ahead,")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (912,044 - 44) / 48,000 = 19.00s.

export const FPS = 30;
export const FILM_SECONDS = 19.0;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.82},
  {n: 2, start: 3.82, end: 7.0},
  {n: 3, start: 7.0, end: 10.4},
  {n: 4, start: 10.4, end: 15.12},
  {n: 5, start: 15.12, end: 19.0},
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
  null, // 1  Marrit Steenbergen just changed the women's 100 freestyle record book.
  'whip', // 2  At the 2026 Settecolli meet, the Dutch star blasted
  'push', // 3  51.68 seconds, breaking the world record.
  'wipe', // 4  She also won the 100 free at the 2026 World Championships in Singapore.
  'whipDown', // 5  Now, with short course racing ahead, could Steenbergen get even faster?
];