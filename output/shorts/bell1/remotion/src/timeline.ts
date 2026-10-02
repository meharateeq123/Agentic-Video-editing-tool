// Scene timing comes from the voiceover's own words (Whisper word-level timestamps on
// vo/short1-nascar.wav), snapped onto the script's own sentence/clause boundaries — not estimated.
// Cut boundaries between scenes sit at the midpoint of each VO pause so no scene inherits dead
// air. Source segments (ms): [0,5000] [5400,10060] [10400,13120] [13480,16880].

export const FPS = 30;
export const FILM_SECONDS = 16.88;

export type Cut = {n: number; start: number; end: number};

export const CUTS: Cut[] = [
  {n: 1, start: 0, end: 5.2},
  {n: 2, start: 5.2, end: 8.04},
  {n: 3, start: 8.04, end: 10.23},
  {n: 4, start: 10.23, end: 13.3},
  {n: 5, start: 13.3, end: 16.88},
];

export const startFrame = (n: number) => Math.round(CUTS[n - 1].start * FPS);
export const endFrame = (n: number) => Math.round(CUTS[n - 1].end * FPS);
export const sceneFrames = (n: number) => endFrame(n) - startFrame(n);
export const TOTAL_FRAMES = Math.round(FILM_SECONDS * FPS);

/** Overlap window used by every transition. */
export const OVERLAP = 10;

export type TKind = 'dip' | 'whip' | 'push' | 'wipe' | 'whipDown';

/** Transition INTO each scene. Index 0 is scene 1 (film open — no transition). */
export const TRANSITION_IN: (TKind | null)[] = [
  null, // 1  Bell won the Southern 500 at Darlington, taking the very first race of the 2026 Chase.
  'whip', // 2  He held off the field when the pressure was at its highest
  'dip', // 3  and grabbed a huge win when it mattered most.
  'push', // 4  Now Bell has the momentum, and nine Chase races remain.
  'wipe', // 5  Could Christopher Bell be the driver nobody saw coming for the championship?
];
