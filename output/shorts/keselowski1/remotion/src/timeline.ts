// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/keselowski-warning.wav), snapped onto the script's own sentence boundaries — not estimated.
// Source segments (ms): [0,3260] [3520,7860] [8160,11960] [12180,16440] [16960,19100].

export const FPS = 30;
export const FILM_SECONDS = 19.56;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.52},
  {n: 2, start: 3.52, end: 8.16},
  {n: 3, start: 8.16, end: 12.18},
  {n: 4, start: 12.18, end: 16.96},
  {n: 5, start: 16.96, end: 19.56},
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
  null, // 1  Brad Keselowski JUST sent a warning to Carson Hocevar.
  'whip', // 2  After their Darlington incident, Keselowski made it clear he hasn't forgotten.
  'push', // 3  He even told Hocevar to "watch out", hinting payback could be coming.
  'dip', // 4  NASCAR is now monitoring the situation — both drivers could meet again at Gateway.
  'whipDown', // 5  So will Hocevar get his payback this weekend?
];
