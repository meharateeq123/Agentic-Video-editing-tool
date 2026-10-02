// Scene timing from Whisper word timestamps on vo/popovici1.wav (../vo-words.json). The VO is 20.44s (last word ends 20.10);
// the film runs ~0.5s past it. Boundaries sit in the pauses between sentences / clauses, in whole frames.
//   3.53 ("...sprint freestyle." | "His European record")     10.10 ("...World Championships," | "and he has continued")
//  13.64 ("...in 2026." | "With the next Olympic cycle")       17.13 ("...the question is simple." | "How fast can Popovici go")

export const FPS = 30;
export const VO_SECONDS = 20.44;

/** scene lengths in frames */
export const SCENE_FRAMES = [106, 197, 106, 105, 104];

export const FILM_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);
export const FILM_SECONDS = FILM_FRAMES / FPS;

export const startFrame = (n: number) => SCENE_FRAMES.slice(0, n - 1).reduce((a, b) => a + b, 0);
export const sceneFrames = (n: number) => SCENE_FRAMES[n - 1];
export const TOTAL_FRAMES = FILM_FRAMES;

export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

export const TRANSITION_IN: (TKind | null)[] = [null, 'whip', 'push', 'whipDown', 'dip'];