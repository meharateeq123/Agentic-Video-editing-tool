// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/hamlin3.wav, saved as ../vo-words.json), snapped onto word boundaries — not estimated.
// The breaks:
//   6.40          ("...That's a massive change"          |  "with the playoffs heating up")
//   8.82 -> 9.02  ("...and Bristol coming next."           |  "Larson is suddenly")
//  13.08 -> 13.40 ("...can't afford another bad finish."   |  "The big question now")
// Scene 1 runs past "nine points" to "massive change" so the points card has a full second to
// sit before it leaves. Audio runs 19.48s, so scene 4 carries the tail past the last word (18.98).

export const FPS = 30;
export const FILM_SECONDS = 19.48;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 6.4},
  {n: 2, start: 6.4, end: 8.92},
  {n: 3, start: 8.92, end: 13.24},
  {n: 4, start: 13.24, end: 19.48},
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
  null, // 1  After Kyle Larson won Gateway, Hamlin's championship lead has been cut to just nine points. That's a massive change
  'whip', // 2  with the playoffs heating up and Bristol coming next.
  'push', // 3  Larson is suddenly right behind him, and Hamlin can't afford another bad finish.
  'dip', // 4  The big question now is, can Hamlin hold off Larson before this championship battle gets completely out of control?
];
