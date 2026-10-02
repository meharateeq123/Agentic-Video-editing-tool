/**
 * Scene -> chain of bed clips.
 *
 * Same three rules as every film before this one:
 *   1. No link over 7s (200 frames used here, under the 210 hard cap for margin).
 *   2. No two links anywhere in this file share overlapping ranges of the same source.
 *   3. Relevancy stays at 100% - including time of day. This is the same Darlington night race as
 *      bell1/hamlin1, so the same rule applies: anything from the race's final stage (the red flag,
 *      the stay-out call, Bell's pass, the finish) must be night footage; early-race beats
 *      (qualifying, the green flag, stages 1-2) can be daylight, since the Southern 500 itself
 *      starts in daylight and runs into full dark.
 *
 * Sources, reused from hamlin1's already-cropped pool (same broadcast, same race):
 *   A final-laps.mp4              554s, all-night. Confirmed Larson (#5, Hendrick) running just
 *                                  ahead of Ty Gibbs' onboard camera at ~258-280s - the clearest shot
 *                                  of him actually leading. **Clean windows only: 16-100, 116-148,
 *                                  168-236, 240-332, 452-534.** Everything else is either FOX's
 *                                  speed-comparison telemetry (336-430s), a picture-in-picture
 *                                  (432-452s), or the closing bumper (534s+).
 *   B southern500-highlights.mp4  1621s. Daylight until ~1120-1150s, night from there on (confirmed
 *                                  by scan). Used for daylight early-race beats and, past 1150s, as
 *                                  a second night source alongside A for variety.
 *   D postrace-interviews.mp4     857s. Larson's own interview is confirmed running from ~360s to
 *                                  at least 480s (Hendrick Cars.com cap, blue firesuit, a
 *                                  "KYLE ... FINISHED 5th ... 7th" caption at ~360s that matches
 *                                  this film's own numbers exactly). Only this block is used from D
 *                                  - the file also carries Bell's and Hamlin's own interviews
 *                                  earlier, which have no business in a Larson film.
 *
 * hook.mp4 (the cold open, Bell passing Larson with original sound) is played once, directly, by
 * FinalFilm.tsx before any scene starts - it isn't a footage.ts link and isn't reused here.
 */

export type Bed = {
  src: string;
  startFrom: number;
  span: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
};

export type Link = Bed & {frames: number};

const P = (name: string) => `bed-pool/${name}`;

const L = (
  file: string,
  startFrom: number,
  frames: number,
  extra: Omit<Bed, 'src' | 'startFrom' | 'span'> = {},
): Link => ({src: P(file), startFrom, frames, span: frames / 30, ...extra});

const A = 'final-laps.mp4';
const B = 'southern500-highlights.mp4';
const D = 'postrace-interviews.mp4';

// Trimmed to the VO-aligned timeline (2026-09-10): the chains below were originally sized for the
// provisional word-count timeline (443s total). Real VO came in shorter (309s), so every scene's
// mounted duration dropped - these lists are cut down (never extended) to match exactly, always
// dropping from the end of a scene's list first so the earliest, most-deliberately-chosen shot in
// each scene survives untouched.
export const CHAINS: Record<number, Link[]> = {
  // 1 (529f) - the setup: started 25th, led more laps than anyone, still didn't win.
  1: [
    L(B, 20, 190, {driftX: 0.6}),
    L(B, 1200, 190, {driftX: -0.6}),
    L(A, 300, 149, {zoom: 1.05}),
  ],

  // 2 (555f) - qualifying wiped by weather, points-based grid drops him to 25th. Pre-race, daylight.
  2: [
    L(B, 60, 190, {driftX: 0.6}),
    L(B, 140, 190, {driftX: -0.5}),
    L(B, 220, 175, {zoom: 1.05}),
  ],

  // 3 (349f) - 24 cars between him and the front row. Green-flag daylight.
  3: [
    L(B, 470, 190, {driftX: -0.6}),
    L(B, 550, 159, {zoom: 1.05}),
  ],

  // 4 (593f) - working forward, 16th to 2nd by the end of Stage 2. Still daylight.
  4: [
    L(B, 830, 190, {driftX: 0.6}),
    L(B, 910, 190, {driftX: -0.5}),
    L(B, 990, 190, {zoom: 1.05}),
    L(B, 1060, 23, {driftX: -0.5}),
  ],

  // 5 (332f) - final stage, fastest car on track, led 99 laps. Night. Both links are the confirmed
  // shot of Larson's #5 running right in front of Gibbs' onboard camera.
  5: [
    L(A, 258, 190, {driftX: 0.5}),
    L(A, 265, 142, {zoom: 1.05}),
  ],

  // 6 (401f) - "not a coincidence, it's a signal." Night, no graphic - the line carries itself.
  6: [
    L(A, 168, 190, {driftX: -0.5}),
    L(A, 180, 190, {zoom: 1.05}),
    L(A, 190, 21, {driftX: 0.5}),
  ],

  // 7 (406f) - the red flag, seven-plus minutes for rain. Night.
  7: [
    L(A, 452, 190, {driftX: 0.5}),
    L(A, 460, 190, {zoom: 1.05}),
    L(A, 470, 26, {driftX: -0.5}),
  ],

  // 8 (514f) - the stay-out call: Daniels, then Cindric/Logano/Preece also staying out. Night.
  8: [
    L(A, 480, 190, {driftX: -0.5}),
    L(A, 490, 190, {zoom: 1.05}),
    L(A, 500, 134, {driftX: 0.5}),
  ],

  // 9 (572f) - Bell closes the gap and makes the pass. The scene the hook already showed once; this
  // is different footage from the same closing stretch, not a repeat of hook.mp4.
  9: [
    L(A, 240, 190, {driftX: 0.5}),
    L(A, 270, 190, {zoom: 1.05}),
    L(A, 307, 192, {driftX: -0.5}),
  ],

  // 10 (320f) - Daniels defends the call after the race. Night (this B window is past the ~1150s
  // day/night boundary, so it's genuine night footage, not a second daylight source).
  10: [
    L(B, 1300, 190, {driftX: 0.5}),
    L(B, 1350, 130, {zoom: 1.05}),
  ],

  // 11 (527f) - Larson's own quote: "No, I don't..." His confirmed interview block.
  11: [
    L(D, 360, 190, {driftX: -0.5}),
    L(D, 367, 190, {zoom: 1.05}),
    L(D, 374, 147, {driftX: 0.5}),
  ],

  // 12 (581f) - damage control, older tires, crossed the line 5th. Night.
  12: [
    L(A, 116, 190, {driftX: 0.5}),
    L(A, 123, 150, {zoom: 1.05}),
    L(A, 20, 190, {driftX: -0.5}),
    L(A, 30, 51, {driftX: 0.4}),
  ],

  // 13 (98f) - second Larson quote: "Really happy with the day."
  13: [L(D, 383, 98, {driftX: 0.5})],

  // 14 (824f) - the three-race Darlington drought this result ended.
  14: [
    L(B, 700, 190, {driftX: 0.6}),
    L(B, 850, 190, {driftX: -0.5}),
    L(B, 1000, 190, {zoom: 1.05}),
    L(D, 392, 190, {driftX: 0.5}),
    L(D, 399, 64, {zoom: 1.04}),
  ],

  // 15 (443f) - standings graphic: P7, -49. Footage stays neutral underneath.
  15: [
    L(B, 900, 190, {driftX: 0.5}),
    L(B, 950, 190, {zoom: 1.05}),
    L(B, 972, 63, {driftX: -0.5}),
  ],

  // 16 (507f) - nine races left, not insurmountable.
  16: [
    L(A, 196, 190, {driftX: 0.5}),
    L(A, 203, 190, {zoom: 1.05}),
    L(A, 210, 127, {driftX: -0.5}),
  ],

  // 17 (602f) - the streak: winless in 51 races.
  17: [
    L(B, 100, 190, {driftX: 0.5}),
    L(B, 180, 190, {zoom: 1.05}),
    L(B, 255, 190, {driftX: -0.5}),
    L(B, 262, 32, {driftX: 0.4}),
  ],

  // 18 (732f) - the longest scene: speed vs. results all summer, then Darlington lining up. Keeps
  // the closing stretch of the Larson interview intact and trims the daylight B footage instead.
  18: [
    L(B, 300, 190, {driftX: 0.6}),
    L(B, 330, 190, {driftX: -0.5}),
    L(B, 500, 16, {zoom: 1.05}),
    L(D, 406, 190, {driftX: -0.4}),
    L(D, 413, 146, {zoom: 1.05}),
  ],

  // 19 (685f) - the close. Night.
  19: [
    L(B, 600, 190, {driftX: 0.5}),
    L(B, 630, 190, {zoom: 1.05}),
    L(A, 60, 190, {driftX: -0.5}),
    L(B, 660, 115, {driftX: 0.4}),
  ],
};

export const chain = (n: number): Link[] => CHAINS[n];
