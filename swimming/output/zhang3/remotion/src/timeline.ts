// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 441.32;
export const OVERLAP = 16;
export const BLEED = 20;

// No cold-open hook clip in this film - the VO starts at frame 0. HOOK_SECONDS stays 0 so every
// downstream offset (FinalFilm.tsx, TOTAL_FRAMES) is a no-op rather than a special case.
export const HOOK_SECONDS = 0;
export const HOOK_FRAMES = Math.round(HOOK_SECONDS * FPS);
export const VO_ALIGNED = true;

export type Cut = {n: number; start: number; end: number};
export type TKind = 'dip' | 'whip' | 'whipDown' | 'push' | 'wipe';

export const TRANSITION_IN: TKind[] = [
  'dip', // 1  Before these Asian Games even began, one of the most experienced
  'wipe', // 2  She is 28. She first raced at the Asian Games when she was 16. A
  'dip', // 3  Twenty-five seconds later, the scoreboard gave its answer. This 
  'whip', // 4  Start with the morning. In the heats, Zhang did not just qualify
  'whipDown', // 5  Then came the final, on September 25, 2026, at the Tokyo Aquatic
  'push', // 6  Now compare the heat and the final, swimmer by swimmer, because 
  'wipe', // 7  Why did that challenge feel so real? Because this rivalry has a 
  'dip', // 8  Read those numbers as a story. Between November and June, Wu cut
  'whip', // 9  Here is where honesty matters, because the title says the swim w
  'whipDown', // 10  So why does this swim belong in the story of her career? Because
  'push', // 11  The podium also carried a quiet echo. In Hangzhou, the 50 butter
  'wipe', // 12  The night was not over when Zhang left the pool deck. She came b
  'dip', // 13  That relay gold gave Zhang four medals at these Games. It also t
  'whip', // 14  Look at who she was sharing the pool with. At these same Games, 
  'whipDown', // 15  She also explained afterward how much the week had taken out of 
  'push', // 16  And there is a reason she chose to swim the 50 butterfly at all.
  'wipe', // 17  But the path to Los Angeles is not only about beating Asian riva
  'dip', // 18  That is what makes this result more interesting than a simple ti
  'whip', // 19  Can Zhang Yufei get back to her best of 25.05 before Los Angeles
  'whipDown', // 20  If you want to follow the race for the first ever Olympic 50 but
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 10.49},
  {n: 2, start: 10.49, end: 22.76},
  {n: 3, start: 22.76, end: 33.21},
  {n: 4, start: 33.21, end: 59.1},
  {n: 5, start: 59.1, end: 79.96},
  {n: 6, start: 79.96, end: 108.79},
  {n: 7, start: 108.79, end: 144.49},
  {n: 8, start: 144.49, end: 162.81},
  {n: 9, start: 162.81, end: 214.54},
  {n: 10, start: 214.54, end: 234.36},
  {n: 11, start: 234.36, end: 263.44},
  {n: 12, start: 263.44, end: 291.74},
  {n: 13, start: 291.74, end: 311.01},
  {n: 14, start: 311.01, end: 333.01},
  {n: 15, start: 333.01, end: 354.88},
  {n: 16, start: 354.88, end: 379.81},
  {n: 17, start: 379.81, end: 404.33},
  {n: 18, start: 404.33, end: 420.14},
  {n: 19, start: 420.14, end: 432.02},
  {n: 20, start: 432.02, end: 441.32},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);

/**
 * How many frames a scene is actually mounted for. Every scene but the last carries OVERLAP extra
 * frames so the next one can cross over it, and a scene's footage has to cover those frames too.
 */
export const mountedFrames = (n: number) =>
  sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);

export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS) + HOOK_FRAMES;
