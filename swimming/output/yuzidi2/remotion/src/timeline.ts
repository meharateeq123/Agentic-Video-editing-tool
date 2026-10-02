// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 430.60;
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
  'dip', // 1  A year ago, a 12-year-old walked onto a World Championship pool 
  'wipe', // 2  This is the story of Yu Zidi, the swimmer who became the younges
  'dip', // 3  Yu Zidi's swimming journey started almost by accident. At age si
  'whip', // 4  The signs that she was different from other young swimmers showe
  'whipDown', // 5  In July 2025, at the World Aquatics Championships in Singapore, 
  'push', // 6  Then came the moment that made her a household name. Swimming in
  'wipe', // 7  She was not finished. Later in that same meet, Yu finished fourt
  'dip', // 8  World Aquatics rules normally require swimmers to be at least 14
  'whip', // 9  Her age group numbers before Singapore already hinted at what wa
  'whipDown', // 10  The months after Singapore only built on that momentum. In Novem
  'push', // 11  Every one of those swims came against domestic competition. That
  'wipe', // 12  It is worth noting how these achievements compare across events 
  'dip', // 13  The 2026 Asian Games begin in Japan's Aichi Prefecture, running 
  'whip', // 14  The stakes are different this time. In Singapore, Yu was a surpr
  'whipDown', // 15  There is also a psychological dimension to this test that has no
  'push', // 16  That mindset will be tested directly at these Asian Games. A you
  'wipe', // 17  Her path forward already looks mapped out. On her current trajec
  'dip', // 18  Her competitors this time are not the same mix of established se
  'whip', // 19  What makes this test genuinely uncertain is that nobody, includi
  'whipDown', // 20  Does Yu Zidi medal individually at the 2026 Asian Games? Does sh
  'push', // 21  If you want to be here when Yu Zidi takes on her toughest field 
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 12.3},
  {n: 2, start: 12.3, end: 22.04},
  {n: 3, start: 22.04, end: 38.18},
  {n: 4, start: 38.18, end: 52.83},
  {n: 5, start: 52.83, end: 74.59},
  {n: 6, start: 74.59, end: 96},
  {n: 7, start: 96, end: 118.56},
  {n: 8, start: 118.56, end: 129.9},
  {n: 9, start: 129.9, end: 158.61},
  {n: 10, start: 158.61, end: 195.42},
  {n: 11, start: 195.42, end: 200.85},
  {n: 12, start: 200.85, end: 226.3},
  {n: 13, start: 226.3, end: 253.21},
  {n: 14, start: 253.21, end: 277.67},
  {n: 15, start: 277.67, end: 311.31},
  {n: 16, start: 311.31, end: 329.72},
  {n: 17, start: 329.72, end: 356.46},
  {n: 18, start: 356.46, end: 382.83},
  {n: 19, start: 382.83, end: 410.41},
  {n: 20, start: 410.41, end: 422.31},
  {n: 21, start: 422.31, end: 430.6},
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
