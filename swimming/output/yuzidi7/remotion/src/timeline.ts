// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 469.24;
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
  'dip', // 1  Four tenths of a second. That is the entire gap between the fast
  'wipe', // 2  Her name is Yu Zidi. At the 2026 Asian Games, she did not just c
  'dip', // 3  Start with what actually happened in Tokyo. Between September 20
  'whip', // 4  Look closer at each result, because the story is not the same in
  'whipDown', // 5  Yu swam 2:06.10 in that final. That time made her the second-fas
  'push', // 6  To understand how unusual that is, you need to know exactly who 
  'wipe', // 7  That is what makes the 200 IM gap so remarkable. Yu is not closi
  'dip', // 8  The 200 IM swim in Tokyo also had its own drama attached. Yu's o
  'whip', // 9  Now compare the other two events where their careers overlap, be
  'whipDown', // 10  That contrast matters, because it tells you exactly where this r
  'push', // 11  That range is the real story. McIntosh built her career on being
  'wipe', // 12  McIntosh's own progression in the 400 IM shows exactly how fast 
  'dip', // 13  Consider the timeline each swimmer is working with. McIntosh is 
  'whip', // 14  McIntosh herself is not standing still while all of this plays o
  'whipDown', // 15  There is a reason this comparison is being taken seriously rathe
  'push', // 16  The Olympic path ahead adds another layer to this story. Los Ang
  'wipe', // 17  None of this guarantees a rivalry actually forms. McIntosh has y
  'dip', // 18  What is not in question is the shape of what just happened. A 13
  'whip', // 19  Does Yu Zidi close that four-tenths gap in the 200 IM before Los
  'whipDown', // 20  If you want to follow this story as it develops toward a possibl
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 15.91},
  {n: 2, start: 15.91, end: 28.9},
  {n: 3, start: 28.9, end: 49.57},
  {n: 4, start: 49.57, end: 74.65},
  {n: 5, start: 74.65, end: 90.78},
  {n: 6, start: 90.78, end: 124.65},
  {n: 7, start: 124.65, end: 137.9},
  {n: 8, start: 137.9, end: 162.47},
  {n: 9, start: 162.47, end: 193.38},
  {n: 10, start: 193.38, end: 219.58},
  {n: 11, start: 219.58, end: 241.78},
  {n: 12, start: 241.78, end: 275.47},
  {n: 13, start: 275.47, end: 307.61},
  {n: 14, start: 307.61, end: 335.05},
  {n: 15, start: 335.05, end: 361.06},
  {n: 16, start: 361.06, end: 388.91},
  {n: 17, start: 388.91, end: 416.58},
  {n: 18, start: 416.58, end: 442.64},
  {n: 19, start: 442.64, end: 457.25},
  {n: 20, start: 457.25, end: 469.24},
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
