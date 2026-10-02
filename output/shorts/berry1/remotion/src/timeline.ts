// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/josh-berry.wav), snapped onto the script's own sentence boundaries — not estimated.
// Source segments (ms): [0,3900] [4140,8660] [8820,11640] [11900,16460] [16720,18900] [19080,21060].

export const FPS = 30;
export const FILM_SECONDS = 21.06;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.14},
  {n: 2, start: 4.14, end: 8.82},
  {n: 3, start: 8.82, end: 11.9},
  {n: 4, start: 11.9, end: 16.72},
  {n: 5, start: 16.72, end: 19.08},
  {n: 6, start: 19.08, end: 21.06},
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
  'whip', // 3  replacing John Hunter Nemechek, and the timing is wild.
  'dip', // 4  Berry is coming off six straight top-10 finishes, showing serious speed at the right moment.
  'wipe', // 5  Now he gets a fresh start with Legacy Motor Club.
  'whipDown', // 6  Could this be the move that changes Berry's career?
];
