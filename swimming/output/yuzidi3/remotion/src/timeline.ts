// Scene timing comes from the voiceover's own words (Whisper word timestamps on vo/yuzidi3.wav,
// saved as ../vo/cand3.json), snapped onto the pauses - not estimated:
//    3.60 -> 3.98   ("...swimming world."              |  "At the Asian Games...")
//   11.60 -> 11.84  ("...Asian Games record."          |  "And here's the crazy part...")
//   17.90 -> 18.00  ("...McIntosh's World Record."      |  "Is Yu Zidi the next...")
// Audio runs 20.48s.

export const FPS = 30;
export const FILM_SECONDS = 20.48;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.8},
  {n: 2, start: 3.8, end: 11.72},
  {n: 3, start: 11.72, end: 17.95},
  {n: 4, start: 17.95, end: 20.48},
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
  null, // 1  Yu Zidi is only 13 and she just shocked the swimming world.
  'whip', // 2  At the Asian Games, Yu blasted a 2:06.10 in the 200 IM, breaking the Asian Games record.
  'push', // 3  And here's the crazy part. She finished just 0.40 off Summer McIntosh's World Record.
  'dip', // 4  Is Yu Zidi the next swimming superstar?
];
