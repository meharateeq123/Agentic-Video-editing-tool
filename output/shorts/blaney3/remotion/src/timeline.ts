// Scene timing from Whisper word timestamps on vo/blaney3.wav (../vo-words.json). VO is 14.92s (last word ends 14.92);
// the film runs ~0.6s past it. Boundaries sit in the pauses between sentences, in whole frames.
//   4.40 ("...with Carson Hocevar." | "But now Blaney")   9.47 ("...one wreck." | "He also says")
//  13.17 ("...a penalty." | "But is this rivalry")

export const FPS = 30;
export const VO_SECONDS = 14.92;

/** scene lengths in frames */
export const SCENE_FRAMES = [132, 152, 111, 70];

export const FILM_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);
export const FILM_SECONDS = FILM_FRAMES / FPS;

export const startFrame = (n: number) => SCENE_FRAMES.slice(0, n - 1).reduce((a, b) => a + b, 0);
export const sceneFrames = (n: number) => SCENE_FRAMES[n - 1];
export const TOTAL_FRAMES = FILM_FRAMES;

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown'];