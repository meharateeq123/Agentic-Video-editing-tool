// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 451.32;
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
  'dip', // 1  A scoreboard flashes red. Then it happens again. And again. By m
  'wipe', // 2  Here are the records that shocked the world in 2026, and why the
  'dip', // 3  Start in the water where speed matters most: the sprint freestyl
  'whip', // 4  That record did not last. Eight days later, on June 27, 2026, at
  'whipDown', // 5  Walsh's 2026 season did not stop there. She had already rewritte
  'push', // 6  At that same Rome meet in June, Walsh also posted a 24.51 in the
  'wipe', // 7  While American sprinters rewrote freestyle and butterfly records
  'dip', // 8  McIntosh called it the record she thought she would never break.
  'whip', // 9  The men's side of the pool delivered its own history in 2026. At
  'whipDown', // 10  These record swims were not accidents from a single hot week. Th
  'push', // 11  Versatility like that comes with a cost, and 2026 exposed it. At
  'wipe', // 12  That tension, between chasing world records and surviving a brut
  'dip', // 13  McIntosh faced a version of the same tension at Pan Pacs. After 
  'whip', // 14  So where does that leave the record book heading into the short 
  'whipDown', // 15  History backs that expectation up. Short course seasons have his
  'push', // 16  Every one of these swims shares a common thread. None of them ca
  'wipe', // 17  That is what makes this year different from a normal record-brea
  'dip', // 18  Which record from 2026 do you think will stand the longest? Do y
  'whip', // 19  If you want to be here for the next record to fall, subscribe no
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 15.87},
  {n: 2, start: 15.87, end: 22.84},
  {n: 3, start: 22.84, end: 56.6},
  {n: 4, start: 56.6, end: 76.42},
  {n: 5, start: 76.42, end: 111.12},
  {n: 6, start: 111.12, end: 130.12},
  {n: 7, start: 130.12, end: 169.48},
  {n: 8, start: 169.48, end: 189.07},
  {n: 9, start: 189.07, end: 232.63},
  {n: 10, start: 232.63, end: 262.25},
  {n: 11, start: 262.25, end: 291.31},
  {n: 12, start: 291.31, end: 309.7},
  {n: 13, start: 309.7, end: 335.75},
  {n: 14, start: 335.75, end: 361.79},
  {n: 15, start: 361.79, end: 389.13},
  {n: 16, start: 389.13, end: 413.57},
  {n: 17, start: 413.57, end: 432.9},
  {n: 18, start: 432.9, end: 443.74},
  {n: 19, start: 443.74, end: 451.32},
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
