// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/richardson1.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   4.06  ("...after Budapest."                  |  "She finished third")
//   6.02  ("...in the 100 meter,"                |  "but she says rival Julien Alfred")
//   9.96  ("...regain her form."                 |  "Sha'Carri ran 10.76")
//  14.44  ("...Jefferson-Wooden and Alfred,"     |  "and now she's heading to Athlos")
//  16.52  ("...in London."                       |  "Could this rivalry")
// The wav header carries a placeholder data size, so the length comes from the file size:
// (942,764 - 44) / 48,000 = 19.64s.

export const FPS = 30;
export const FILM_SECONDS = 19.64;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.06},
  {n: 2, start: 4.06, end: 6.02},
  {n: 3, start: 6.02, end: 9.96},
  {n: 4, start: 9.96, end: 14.44},
  {n: 5, start: 14.44, end: 16.52},
  {n: 6, start: 16.52, end: 19.64},
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
  null, // 1  Sha'Carri Richardson just revealed something very interesting after Budapest.
  'whip', // 2  She finished third in the 100 meter,
  'whipDown', // 3  but she says rival Julien Alfred actually helped her regain her form.
  'push', // 4  Sha'Carri ran 10.76 behind Melissa Jefferson-Wooden and Alfred,
  'wipe', // 5  and now she's heading to Athlos in London.
  'dip', // 6  Could this rivalry be exactly what Sha'Carri needed?
];
