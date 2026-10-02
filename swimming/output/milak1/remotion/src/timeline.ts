// Scene timing from Whisper word timestamps on vo/milak1.wav (../vo-words.json). The VO is 20.44s (last word ends 20.02);
// the film runs ~0.5s past it.
//   3.33 ("...incredible." | "At the 2026")      11.17 ("...European record." | "But the crazy part?")
//  15.10 ("...49.45." | "That means")            18.70 ("...history." | "Could the record finally fall?")
// Boundaries sit in the pauses between sentences, expressed in whole frames.

export const FPS = 30;
export const VO_SECONDS = 20.44;

/** scene lengths in frames */
export const SCENE_FRAMES = [100, 235, 118, 108, 67];

export const FILM_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);
export const FILM_SECONDS = FILM_FRAMES / FPS;

export const startFrame = (n: number) => SCENE_FRAMES.slice(0, n - 1).reduce((a, b) => a + b, 0);
export const sceneFrames = (n: number) => SCENE_FRAMES[n - 1];
export const TOTAL_FRAMES = FILM_FRAMES;

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];
