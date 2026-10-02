// Scene timing from Whisper word timestamps on vo/yuzidi5.wav (../vo-words.json). The VO is 19.76s (last word ends 19.76);
// the film runs ~0.5s past it. Boundaries sit in the pauses between clauses, in whole frames.
//   7.38 ("...just win." | "She set games records")   12.86 ("...400 IM," | "making her the fifth")
//  16.30 ("...in history." | "Three races.")

export const FPS = 30;
export const VO_SECONDS = 19.76;

/** scene lengths in frames */
export const SCENE_FRAMES = [221, 165, 103, 119];

export const FILM_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);
export const FILM_SECONDS = FILM_FRAMES / FPS;

export const startFrame = (n: number) => SCENE_FRAMES.slice(0, n - 1).reduce((a, b) => a + b, 0);
export const sceneFrames = (n: number) => SCENE_FRAMES[n - 1];
export const TOTAL_FRAMES = FILM_FRAMES;

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown'];
