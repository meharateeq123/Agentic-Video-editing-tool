// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 463.40;
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
  'dip', // 1  The morning session ends, and the fastest qualifier for the 200 
  'wipe', // 2  By the time the race ends, the scoreboard shows a time nobody in
  'dip', // 3  This is the story of that race, swum on September 21, 2026, at t
  'whip', // 4  China's own record book tells part of the story here too. Before
  'whipDown', // 5  Start with what happened in the water, stroke by stroke. Yu Zidi
  'push', // 6  The backstroke leg is where the gap opened up. Yu split 31.96 se
  'wipe', // 7  Then came the breaststroke leg, and it changed everything. Yu sp
  'dip', // 8  She closed with a 30.19 freestyle split, just slightly slower th
  'whip', // 9  The margin between them is 0.40 seconds. In a race that takes ov
  'whipDown', // 10  Consider what that time means outside the record book, too. Yu's
  'push', // 11  Look closer at what the splits actually reveal about her race sh
  'wipe', // 12  There is also the prelims twist to consider. Yu Yiting, the swim
  'dip', // 13  This was not an isolated swim. It was Yu's second gold medal in 
  'whip', // 14  Put both swims together, and the picture becomes clear. In two d
  'whipDown', // 15  That opening night also set the tone for how dominant China was 
  'push', // 16  What happens next follows quickly. Yu still has the 400 meter in
  'wipe', // 17  Beyond Tokyo, the bigger picture points toward a potential head-
  'dip', // 18  None of this guarantees anything. Swimming has seen fast teenage
  'whip', // 19  The backstroke leg remains the clearest place to look for where 
  'whipDown', // 20  What is not in question is what happened in that pool in Tokyo. 
  'push', // 21  Does Yu Zidi close that four-tenths gap before Los Angeles? Does
  'wipe', // 22  If you want to be here when the gap between Yu Zidi and the worl
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 18.99},
  {n: 2, start: 18.99, end: 37.55},
  {n: 3, start: 37.55, end: 46.14},
  {n: 4, start: 46.14, end: 67.6},
  {n: 5, start: 67.6, end: 87.3},
  {n: 6, start: 87.3, end: 109.32},
  {n: 7, start: 109.32, end: 127.93},
  {n: 8, start: 127.93, end: 157.53},
  {n: 9, start: 157.53, end: 166.94},
  {n: 10, start: 166.94, end: 189.86},
  {n: 11, start: 189.86, end: 224.65},
  {n: 12, start: 224.65, end: 252.46},
  {n: 13, start: 252.46, end: 285.8},
  {n: 14, start: 285.8, end: 311.84},
  {n: 15, start: 311.84, end: 334.25},
  {n: 16, start: 334.25, end: 353.31},
  {n: 17, start: 353.31, end: 386.05},
  {n: 18, start: 386.05, end: 402.16},
  {n: 19, start: 402.16, end: 423.49},
  {n: 20, start: 423.49, end: 440.65},
  {n: 21, start: 440.65, end: 452.48},
  {n: 22, start: 452.48, end: 463.4},
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
