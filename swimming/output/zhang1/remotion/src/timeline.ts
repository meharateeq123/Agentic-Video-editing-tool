// Scene timing from Whisper word timestamps on vo/zhang1.wav (../vo-words.json). The VO is 20.1s (last word ends 19.66);
// the film runs ~0.5s past it. Boundaries sit in the pauses between clauses, in whole frames.
//   3.96 ("...50-meter butterfly," | "touching in 25.41")    6.85 ("...gold medal." | "She led a Chinese one-two")
//  10.58 ("...silver," | "while Japan's")                    12.95 ("...bronze." | "At the end of the Games")
//  17.69 ("...career," | "and she's still one of")

export const FPS = 30;
export const VO_SECONDS = 20.1;

/** scene lengths in frames */
export const SCENE_FRAMES = [119, 87, 111, 72, 142, 87];

export const FILM_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);
export const FILM_SECONDS = FILM_FRAMES / FPS;

export const startFrame = (n: number) => SCENE_FRAMES.slice(0, n - 1).reduce((a, b) => a + b, 0);
export const sceneFrames = (n: number) => SCENE_FRAMES[n - 1];
export const TOTAL_FRAMES = FILM_FRAMES;

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip', 'wipe'];