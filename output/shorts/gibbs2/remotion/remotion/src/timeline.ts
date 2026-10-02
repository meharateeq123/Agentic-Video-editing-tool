// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/josh-berry-2027.wav), snapped onto the script's own sentence boundaries — not estimated.
// Source segments (ms): [0,3780] [3960,8500] [8680,11540] [11840,16280] [16600,18980]
// [19160,22060].

export const FPS = 30;
export const FILM_SECONDS = 22.52;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 3.96},
  {n: 2, start: 3.96, end: 8.68},
  {n: 3, start: 8.68, end: 11.84},
  {n: 4, start: 11.84, end: 16.6},
  {n: 5, start: 16.6, end: 19.16},
  {n: 6, start: 19.16, end: 22.52},
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
  null, // 1  Josh Berry JUST got a huge NASCAR opportunity for 2027.
  'push', // 2  Legacy Motor Club has announced Berry will take over the No. 42 Toyota next season,
  'whip', // 3  replacing John Hunter Nemechek — and the timing is perfect.
  'dip', // 4  Berry is coming off six straight top-10 finishes, serious speed late in the season.
  'wipe', // 5  Now he gets a fresh start with Legacy Motor Club.
  'whipDown', // 6  Could this move finally turn Josh Berry into a NASCAR star?
];
