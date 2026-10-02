// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 419.40;
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
  'dip', // 1  Twenty-eight Olympic medals. Twenty-three of them gold. More tha
  'wipe', // 2  This is what life actually looks like for the greatest swimmer o
  'dip', // 3  Phelps retired following the 2016 Rio Olympics with 39 world rec
  'whip', // 4  Start with where he lives. Phelps and his family are based in Pa
  'whipDown', // 5  Phelps later sold that property and upgraded within the same are
  'push', // 6  Money is naturally part of this story. Estimates of Phelps's net
  'wipe', // 7  To put that prize money in perspective, his eight gold medals at
  'dip', // 8  At the height of his competitive career, Phelps was earning well
  'whip', // 9  But the most interesting part of Phelps's post-retirement life i
  'whipDown', // 10  In 2018, Phelps partnered with Talkspace, an online therapy comp
  'push', // 11  At the HIMSS Global Health Conference in 2022, Phelps told the a
  'wipe', // 12  His business interests outside advocacy have stayed close to the
  'dip', // 13  That kind of brand extension is common among retired Olympic cha
  'whip', // 14  He also stayed connected to competitive swimming itself. Phelps 
  'whipDown', // 15  Family life sits at the center of everything else. Phelps marrie
  'push', // 16  Phelps has described parenting as its own kind of demanding trai
  'wipe', // 17  His vehicles reflect the same theme as his home: comfortable rat
  'dip', // 18  What makes Phelps's post-retirement life stand out is not the si
  'whip', // 19  Phelps built one of the greatest athletic careers in history thr
  'whipDown', // 20  Do you think Michael Phelps has found more fulfillment after swi
  'push', // 21  If you want more stories on what happens to legendary athletes a
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 13.23},
  {n: 2, start: 13.23, end: 18.67},
  {n: 3, start: 18.67, end: 28.48},
  {n: 4, start: 28.48, end: 55.96},
  {n: 5, start: 55.96, end: 76.62},
  {n: 6, start: 76.62, end: 97.7},
  {n: 7, start: 97.7, end: 121.02},
  {n: 8, start: 121.02, end: 146.47},
  {n: 9, start: 146.47, end: 152.29},
  {n: 10, start: 152.29, end: 178.78},
  {n: 11, start: 178.78, end: 207.66},
  {n: 12, start: 207.66, end: 229.86},
  {n: 13, start: 229.86, end: 257.8},
  {n: 14, start: 257.8, end: 277.4},
  {n: 15, start: 277.4, end: 309.02},
  {n: 16, start: 309.02, end: 332.68},
  {n: 17, start: 332.68, end: 358.47},
  {n: 18, start: 358.47, end: 381.2},
  {n: 19, start: 381.2, end: 399.46},
  {n: 20, start: 399.46, end: 409.34},
  {n: 21, start: 409.34, end: 419.4},
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
