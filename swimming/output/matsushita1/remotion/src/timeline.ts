// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/matsushita1.wav, saved as ../vo/matsushita1.json), snapped onto the pauses - not estimated:
//    3.90 -> 4.16   ("...in the 400 IM."                     |  "At Japan's 2026...")
//   11.30 -> 11.56  ("...an Asian record."                   |  "That performance...")
//   15.10 -> 15.26  ("...ever in the event,"                 |  "and at just 21...")
// Audio runs 18.76s (ffmpeg), so scene 4 carries the tail past the last word (18.0 + "coming").

export const FPS = 30;
export const FILM_SECONDS = 18.76;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 4.03},
  {n: 2, start: 4.03, end: 11.38},
  {n: 3, start: 11.38, end: 15.13},
  {n: 4, start: 15.13, end: 18.76},
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
  null, // 1  Tomoyuki Matsushita is becoming a serious name in the 400 IM.
  'whip', // 2  At Japan's 2026 Inter-College Championships, he clocked 4:05.83, an Asian record.
  'push', // 3  That performance also put him among the fastest swimmers ever in the event,
  'dip', // 4  and at just 21, Matsushita could have plenty more speed coming.
];
