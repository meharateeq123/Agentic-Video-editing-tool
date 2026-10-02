// Scene timing from Whisper word timestamps on vo/kansas3.wav (../vo-words.json). VO is 16.12s (last word ends 16.12);
// the film runs ~0.5s past it. Boundaries sit in the pauses / clause breaks, in whole frames.
//   3.33 ("...in the Chase." | "And Toyota")      7.65 ("...this season," | "while Chevrolet")
//  10.80 ("...Kansas races." | "With the championship")   14.95 ("...everything." | "Kansas could be chaos.")

export const FPS = 30;
export const VO_SECONDS = 16.12;

/** scene lengths in frames */
export const SCENE_FRAMES = [100, 130, 94, 125, 49];

export const FILM_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);
export const FILM_SECONDS = FILM_FRAMES / FPS;

export const startFrame = (n: number) => SCENE_FRAMES.slice(0, n - 1).reduce((a, b) => a + b, 0);
export const sceneFrames = (n: number) => SCENE_FRAMES[n - 1];
export const TOTAL_FRAMES = FILM_FRAMES;

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];