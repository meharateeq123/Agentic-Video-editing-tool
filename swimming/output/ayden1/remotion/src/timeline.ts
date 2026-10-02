// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 431.56;
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
  'dip', // 1  Last summer, a 12-year-old broke seven national age group record
  'wipe', // 2  Ayden Tan just answered that question. At 13 years old, he is no
  'dip', // 3  Tan aged out of the 11-12 group in September 2025, closing that 
  'whip', // 4  Moving up a bracket resets the record book against him. A swimme
  'whipDown', // 5  Tan wasted no time. At the Roseville Sectionals in February 2026
  'push', // 6  He beat an entire final of high schoolers, swimmers several year
  'wipe', // 7  Two months later, at Spring Age Group Championships in April 202
  'dip', // 8  To put the improvement in context, Tan had opened the year at 51
  'whip', // 9  The backstroke progress kept climbing through the summer. By Aug
  'whipDown', // 10  Records at this age typically fall by tenths of a second, someti
  'push', // 11  His improvement has not been limited to one stroke. In July 2026
  'wipe', // 12  In the same meet, he lowered his 50 yard backstroke to 27.54, an
  'dip', // 13  These are not marginal gains. A full second of improvement in a 
  'whip', // 14  It is worth remembering how demanding this schedule actually is 
  'whipDown', // 15  That pace has continued into his 13-14 season, with meets stacke
  'push', // 16  What makes Tan's 13-14 season different from his record-breaking
  'wipe', // 17  In the 13-14 bracket, he is now racing against swimmers up to tw
  'dip', // 18  It shows he can compete directly against older, more physically 
  'whip', // 19  That distinction matters more than it might sound. Age group swi
  'whipDown', // 20  Tan's results suggest the opposite pattern so far. Rather than t
  'push', // 21  Tan continues to train with San Ramon Valley Aquatics in Califor
  'wipe', // 22  He is not the only fast swimmer in his own house. His older sist
  'dip', // 23  Club stability matters more than casual fans often realize. Many
  'whip', // 24  Tan has stayed with the same program through his transition from
  'whipDown', // 25  The bigger question hanging over any swimmer this fast this youn
  'push', // 26  Tan has shown that range, posting best times and records across 
  'wipe', // 27  There are no guarantees in age group swimming. Puberty changes b
  'dip', // 28  What separates the two groups is rarely just talent. It is usual
  'whip', // 29  Tan's own numbers make the case for optimism. A swimmer whose ti
  'whipDown', // 30  Compare that to a swimmer who only improves in one narrow event.
  'push', // 31  So far, that is exactly what Tan has done. He did not just hold 
  'wipe', // 32  The pattern so far suggests Tan is not just a swimmer who peaked
  'dip', // 33  Does Ayden Tan keep climbing the rankings as he moves further in
  'whip', // 34  If you want to follow Ayden Tan's next chapter as he keeps chasi
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 14},
  {n: 2, start: 14, end: 22.9},
  {n: 3, start: 22.9, end: 36.1},
  {n: 4, start: 36.1, end: 46.26},
  {n: 5, start: 46.26, end: 55.5},
  {n: 6, start: 55.5, end: 70.74},
  {n: 7, start: 70.74, end: 88.29},
  {n: 8, start: 88.29, end: 101.64},
  {n: 9, start: 101.64, end: 112.92},
  {n: 10, start: 112.92, end: 122.05},
  {n: 11, start: 122.05, end: 137.08},
  {n: 12, start: 137.08, end: 145.5},
  {n: 13, start: 145.5, end: 158.95},
  {n: 14, start: 158.95, end: 168.11},
  {n: 15, start: 168.11, end: 184.3},
  {n: 16, start: 184.3, end: 195.95},
  {n: 17, start: 195.95, end: 211.7},
  {n: 18, start: 211.7, end: 217.81},
  {n: 19, start: 217.81, end: 232.81},
  {n: 20, start: 232.81, end: 244},
  {n: 21, start: 244, end: 250.9},
  {n: 22, start: 250.9, end: 271.11},
  {n: 23, start: 271.11, end: 282.91},
  {n: 24, start: 282.91, end: 302.59},
  {n: 25, start: 302.59, end: 320.92},
  {n: 26, start: 320.92, end: 329.99},
  {n: 27, start: 329.99, end: 342.82},
  {n: 28, start: 342.82, end: 351.63},
  {n: 29, start: 351.63, end: 364.65},
  {n: 30, start: 364.65, end: 378.58},
  {n: 31, start: 378.58, end: 396.74},
  {n: 32, start: 396.74, end: 410.43},
  {n: 33, start: 410.43, end: 421.44},
  {n: 34, start: 421.44, end: 431.56},
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
