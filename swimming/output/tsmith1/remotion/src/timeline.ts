// Scene timing. Aligned word-by-word to the voiceover by align-timeline.mjs.
// Generated; nothing here is hand-edited.
//
// Each boundary is the gap after the last word of its paragraph in source-script.txt, found by
// matching the paragraph's closing words against Whisper's word-level timestamps and then nudged
// onto the nearest real pause. Proportional word-count splitting was tried first and drifted by a
// full sentence over a film this long, so scene text and picture no longer agreed.

export const FPS = 30;
export const FILM_SECONDS = 427.48;
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
  'dip', // 1  She stood on the podium in Paris with an Olympic gold medal arou
  'wipe', // 2  Tatjana Smith retired the moment her final race at the 2024 Pari
  'dip', // 3  For two years, that retirement held. Smith stepped fully away fr
  'whip', // 4  Her career before that retirement was already one of the most de
  'whipDown', // 5  Then, in late September 2026, everything changed. Smith confirme
  'push', // 6  Smith is not targeting the 100 or 200 meter breaststroke, the tw
  'wipe', // 7  Here is why that detail matters. The 50 meter breaststroke has n
  'dip', // 8  She has described the difference between her old races and this 
  'whip', // 9  That difference is not just about distance. It is about a comple
  'whipDown', // 10  This is not a hopeless long shot, either. Smith already has a pe
  'push', // 11  That history makes the target of her comeback even more striking
  'wipe', // 12  Why walk away from swimming entirely, only to come back for a ra
  'dip', // 13  The comeback comes with real changes behind the scenes. Smith ha
  'whip', // 14  Smith has also been clear about what this comeback is not. It is
  'whipDown', // 15  That honesty matters, because the road back to an Olympic final 
  'push', // 16  The competitive field she is walking back into has also changed 
  'wipe', // 17  There is also a bigger prize sitting at the end of this comeback
  'dip', // 18  What makes this story different from a typical athlete comeback 
  'whip', // 19  Does Tatjana Smith make the South African Olympic team in this b
  'whipDown', // 20  If you want to follow Tatjana Smith's comeback from her first ra
];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 12.45},
  {n: 2, start: 12.45, end: 39.25},
  {n: 3, start: 39.25, end: 49.23},
  {n: 4, start: 49.23, end: 82.05},
  {n: 5, start: 82.05, end: 97.15},
  {n: 6, start: 97.15, end: 107.71},
  {n: 7, start: 107.71, end: 128.62},
  {n: 8, start: 128.62, end: 146.39},
  {n: 9, start: 146.39, end: 164.91},
  {n: 10, start: 164.91, end: 194.69},
  {n: 11, start: 194.69, end: 221.07},
  {n: 12, start: 221.07, end: 252.12},
  {n: 13, start: 252.12, end: 281.33},
  {n: 14, start: 281.33, end: 298.53},
  {n: 15, start: 298.53, end: 323.55},
  {n: 16, start: 323.55, end: 355.75},
  {n: 17, start: 355.75, end: 379.79},
  {n: 18, start: 379.79, end: 403.47},
  {n: 19, start: 403.47, end: 414.96},
  {n: 20, start: 414.96, end: 427.48},
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
