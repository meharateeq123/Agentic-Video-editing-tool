/**
 * Scene -> bed clip. Every scene has a bed and the bed plays for the whole scene, first frame
 * to last.
 *
 * Rule for this project: no game/gameplay clips at all, even though the script talks about
 * iRacing and NASCAR 25. Every bed here is real footage of the real person, Cleetus McFarland —
 * interviews, garage/paddock stills-in-motion, cockpit POV, and real racing action. The caption
 * text carries the specific "in the game" meaning; the footage is always him or his world, for
 * real. Spread across 3 distinct source videos, 2 scenes each, for variety rather than leaning
 * on one clip.
 *
 *   - real-racing-01.mp4:    cleetus1's verified pool-03.mp4 ("Cleetus McFarland Talks
 *                             'Frustrating' Michigan Race | NASCAR ARCA Menards Series",
 *                             official @NASCAR), full length. Two disjoint spans (2s, 40s).
 *   - real-cleetus-suit.mp4: cleetus1's verified pool-22.mp4 ("CLEETUS GOT WRECKED - DALE JR.
 *                             JUST FIRED BACK AT EVERYONE", reaction-style title, but the exact
 *                             spans used here were hand-checked clean of any burned-in caption:
 *                             a close-up of Cleetus in his "CLEETUS" flag-patch suit smiling
 *                             (~10.5s) and him standing by a garage race truck (~70s).
 *   - real-racing-02.mp4:    cleetus1's verified pool-21.mp4 ("Cleetus McFarland in the FOX
 *                             booth: Watch @CleetusM in his broadcast debut | NASCAR"), full
 *                             length. Cockpit POV (18s) and a generic pack-racing aerial moment
 *                             (55s) for the two scenes that use it.
 *
 * Rejected at QC: pool-13.mp4 turned out to be a "top rookies" reaction-commentary video with
 * burned-in captions and mostly unrelated drivers throughout (checked at six different offsets,
 * clean nowhere) — dropped entirely, not just re-spanned. The original NASCAR 25 gameplay clip
 * and the iRacing Dev Diary clip were also dropped outright per the no-game-clips rule, even
 * though the Dev Diary one was real (not gameplay) — simplest to keep this project 100% real
 * footage across every scene.
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

const P = (name: string) => `bed-pool/${name}`;

export const BEDS: Record<number, Bed> = {
  1: {src: P('real-cleetus-suit.mp4'), startFrom: 10.5, span: 5.2, zoom: 1.14, driftX: 0.8},
  2: {src: P('real-racing-01.mp4'), startFrom: 2, span: 3.6, driftX: -1.0},
  3: {src: P('real-racing-02.mp4'), startFrom: 55, span: 3.0, zoom: 1.1, driftX: 1.0},
  4: {src: P('real-cleetus-suit.mp4'), startFrom: 70, span: 2.5, zoom: 1.14, driftX: -0.9},
  5: {src: P('real-racing-01.mp4'), startFrom: 40, span: 4.0, driftX: 1.0},
  6: {src: P('real-racing-02.mp4'), startFrom: 18, span: 1.9, zoom: 1.12, driftX: 0.6},
};

export const bed = (n: number): Bed => BEDS[n];
