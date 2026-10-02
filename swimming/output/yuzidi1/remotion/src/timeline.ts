// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 413.80;
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
  'dip', // 1  There is a photo from Singapore that the swimming world keeps co
  'wipe', // 2  She is twelve years old.
  'dip', // 3  And three months after this meet, she would swim one race that e
  'whip', // 4  Her name is Yu Zidi. She was born in October 2012, in Baoding, i
  'whipDown', // 5  Here is how it actually started, in her own words. One summer th
  'push', // 6  That question changed everything.
  'wipe', // 7  She joined a swim class just to get through the summer. She figu
  'dip', // 8  Now here is the rule that makes her story so strange. To swim at
  'whip', // 9  There is one way around the age limit. If you swim fast enough t
  'whipDown', // 10  At the Chinese national championships in May 2025, she swam the 
  'push', // 11  Think about that for a second. A schoolgirl was posting times th
  'wipe', // 12  So she did not sneak into the 2025 World Championships. She earn
  'dip', // 13  Before we get to Singapore, you need to know one more name, beca
  'whip', // 14  Now, Singapore. The 2025 World Aquatics Championships. This is t
  'whipDown', // 15  The biggest names in the sport were all there. Summer McIntosh, 
  'push', // 16  Her first event was the 200 individual medley. To even reach the
  'wipe', // 17  But Yu did not come to make up the numbers. She came to fight fo
  'dip', // 18  In the 200 individual medley final, she finished fourth. She mis
  'whip', // 19  Then came the 200 butterfly. Same result. Fourth place again. Th
  'whipDown', // 20  Then the 400 individual medley, her strongest event. Fourth plac
  'push', // 21  Three finals against the best adults in the world. Three fourth-
  'wipe', // 22  You might think that is a heartbreak story. It is not. Because Y
  'dip', // 23  China needed her in the heats of the 4x200 meter freestyle relay
  'whip', // 24  That bronze made Yu Zidi the youngest World Championship medalis
  'whipDown', // 25  So she left Singapore as the youngest ever to reach a final, the
  'push', // 26  Remember I promised you a number. Here it is.
  'wipe', // 27  Three months later, in November 2025, Yu turned thirteen. Days a
  'dip', // 28  She touched the wall in 2 minutes, 7.41 seconds.
  'whip', // 29  That time shattered the Asian record. The old record was 2 minut
  'whipDown', // 30  Now let me put that time in context so you feel how big it is. H
  'push', // 31  Say that number one more time in your head. Two minutes, seven p
  'wipe', // 32  For all of that, she was named the best junior female swimmer in
  'dip', // 33  So the real question is the one the whole sport is now asking. W
  'whip', // 34  Here is why the answer is scary for her rivals. The next Olympic
  'whipDown', // 35  She is not a finished product. She is barely a beginning.
  'push', // 36  So let me leave you with this. When Yu Zidi first walked onto th
  'wipe', // 37  Was Singapore the ceiling, or was it the warning shot?
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 15.22},
  {n: 2, start: 15.22, end: 16.63},
  {n: 3, start: 16.63, end: 28.98},
  {n: 4, start: 28.98, end: 38.26},
  {n: 5, start: 38.26, end: 54.59},
  {n: 6, start: 54.59, end: 56.2},
  {n: 7, start: 56.2, end: 69.3},
  {n: 8, start: 69.3, end: 79.51},
  {n: 9, start: 79.51, end: 90.26},
  {n: 10, start: 90.26, end: 117.65},
  {n: 11, start: 117.65, end: 133.46},
  {n: 12, start: 133.46, end: 137.95},
  {n: 13, start: 137.95, end: 160.77},
  {n: 14, start: 160.77, end: 170.07},
  {n: 15, start: 170.07, end: 182.24},
  {n: 16, start: 182.24, end: 199.45},
  {n: 17, start: 199.45, end: 205.13},
  {n: 18, start: 205.13, end: 215.74},
  {n: 19, start: 215.74, end: 222.78},
  {n: 20, start: 222.78, end: 229.95},
  {n: 21, start: 229.95, end: 243.82},
  {n: 22, start: 243.82, end: 251.21},
  {n: 23, start: 251.21, end: 267.16},
  {n: 24, start: 267.16, end: 280.23},
  {n: 25, start: 280.23, end: 292.37},
  {n: 26, start: 292.37, end: 294.67},
  {n: 27, start: 294.67, end: 311.4},
  {n: 28, start: 311.4, end: 314.81},
  {n: 29, start: 314.81, end: 337.15},
  {n: 30, start: 337.15, end: 357.66},
  {n: 31, start: 357.66, end: 364.38},
  {n: 32, start: 364.38, end: 370.5},
  {n: 33, start: 370.5, end: 374.75},
  {n: 34, start: 374.75, end: 393.81},
  {n: 35, start: 393.81, end: 396.69},
  {n: 36, start: 396.69, end: 410.95},
  {n: 37, start: 410.95, end: 413.8},
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
