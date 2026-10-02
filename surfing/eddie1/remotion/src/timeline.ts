// Scene timing aligned to the Whisper word timestamps of vo/eddie1.wav (48.92s). Each boundary sits in
// the gap before a scene's first spoken word. Written by hand from ../vo/eddie1.json (10 scenes).

export const FPS = 30;
export const FILM_SECONDS = 48.92;
export const OVERLAP = 16;
export const BLEED = 20;

// No cold open - the VO starts at frame 0.
export const HOOK_SECONDS = 0;
export const HOOK_FRAMES = 0;
export const VO_ALIGNED = true;

export type Cut = {n: number; start: number; end: number};
export type TKind = 'dip' | 'whip' | 'whipDown' | 'push' | 'wipe';

export const TRANSITION_IN: TKind[] = ['dip', 'wipe', 'push', 'whip', 'dip', 'whipDown', 'wipe', 'push', 'whip', 'dip'];

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 5.89},      // March 1978 ... capsized
  {n: 2, start: 5.89, end: 11.28},  // sixteen crew ... Hawaii still remembers
  {n: 3, start: 11.28, end: 14.16}, // Eddie Aikau was Waimea Bay's first lifeguard
  {n: 4, start: 14.16, end: 18.66}, // pulled 500 ... not one drowned
  {n: 5, start: 18.66, end: 25.2},  // crew needed saving ... far from help
  {n: 6, start: 25.2, end: 30.4},   // life vest, surfboard, paddled
  {n: 7, start: 30.4, end: 35.1},   // airliner, flares, rescued
  {n: 8, start: 35.1, end: 41.2},   // except Eddie ... He was 31
  {n: 9, start: 41.2, end: 45.4},   // what happened ... what he chose
  {n: 10, start: 45.4, end: 48.92}, // three words ... Eddie Would Go
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const mountedFrames = (n: number) => sceneFrames(n) + (n === CUTS.length ? 0 : OVERLAP);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS) + HOOK_FRAMES;
