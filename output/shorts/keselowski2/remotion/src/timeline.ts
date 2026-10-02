// Scene timing from Whisper word timestamps on vo/keselowski2.wav (../vo-words.json). The VO is 16.20s (last word ends 16.20);
// the film runs ~1.0s past it. Boundaries sit in the pauses between clauses, in whole frames.
//   3.80 ("...before Kansas." | "RFK racing split")   11.34 ("...the No. 6." | "His first real test")
//  13.32 ("...comes Sunday." | "Can Skarbowski")

export const FPS = 30;
export const VO_SECONDS = 16.2;

/** scene lengths in frames */
export const SCENE_FRAMES = [104, 224, 63, 125];

export const FILM_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);
export const FILM_SECONDS = FILM_FRAMES / FPS;

export const startFrame = (n: number) => SCENE_FRAMES.slice(0, n - 1).reduce((a, b) => a + b, 0);
export const sceneFrames = (n: number) => SCENE_FRAMES[n - 1];
export const TOTAL_FRAMES = FILM_FRAMES;

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown'];
