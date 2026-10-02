/**
 * Scene -> bed clip. Every scene has a bed and the bed plays for the whole scene, first frame
 * to last. All beds are dense-verified (every ~0.1-0.2s of the exact span actually consumed,
 * not spot checks) before wiring in — the lesson from the Hamlin short, where a coarse pass
 * missed a bad few seconds inside an otherwise-clean clip.
 *
 *   - nem-s03.mp4:          Reused from the Nemechek project (its original "Legacy Motor Club
 *                            confirmed..." clip): night truck race finish into a No. 42 victory
 *                            lane celebration. Scene 1 only — scene 2 originally took a second
 *                            moment of this same continuous shot, but back-to-back it just read
 *                            as the same clip repeated, so scene 2 was moved to a different
 *                            source entirely (nem-pool05, the reaction/podcast bed).
 *   - nem-s01.mp4:           Reused from the Nemechek project (its original "just lost his
 *                            NASCAR..." clip): clean pack-racing broadcast footage, verified
 *                            clean across its entire 11.5s. Scenes 4 and 5 take disjoint moments.
 *   - nem-pool01.mp4:        Reused Nemechek bed-pool source (Xfinity race). Only its clean
 *                            pack-racing stretch (roughly 6-70s) is used — a wreck later in the
 *                            same file, past 72s, is avoided entirely.
 *   - nem-pool05.mp4:        Reused Nemechek bed-pool source (podcast/reaction studio) — used
 *                            for scene 2 only, a distinct source from scene 1's victory lane.
 *   - herbst-interview.mp4:  Riley Herbst's own post-win interview (Las Vegas), face clearly
 *                            visible throughout — the named-subject requirement for scene 3.
 *
 * Rejected at QC and deleted from disk: a Ford Mustang burnout (wrong manufacturer — Legacy
 * Motor Club fields Toyotas), a Michael Waltrip crash clip (unrelated driver/event), a podcast
 * host mistaken for on-topic commentary, a Teresa Earnhardt ownership-dispute clip, a Jimmie
 * Johnson interview, and — for scene 3 specifically — a "Riley Herbst onboard" clip that turned
 * out to be an unlabelled windshield POV with no visible driver, which doesn't actually show
 * the named person and was replaced with his real interview instead.
 *
 * All four sources are 16:9 broadcast footage being centre-cropped into this 9:16 canvas.
 * nem-s01's first ~3s is a "REPLAY" split-screen graphic on a solid blue background — content
 * that read as clean in a normal 16:9 contact sheet turned into a large dead blue panel once
 * centre-cropped to vertical, because the crop's 656-1264px window (of its 1920px frame) lands
 * inside that graphic instead of the racing action. Scenes 4 and 5 were moved past 3.2s to the
 * clean full-bleed racing footage; the exact vertical crop was re-verified with ffmpeg's own
 * crop filter (not just eyeballing the full 16:9 frame) before committing.
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
  1: {src: P('nem-s03.mp4'), startFrom: 2.0, span: 5.4, driftX: 1.0},
  2: {src: P('nem-pool05.mp4'), startFrom: 10.0, span: 3.0, zoom: 1.1, driftX: -1.0},
  3: {src: P('herbst-interview.mp4'), startFrom: 20, span: 5, driftX: 0.8},
  4: {src: P('nem-s01.mp4'), startFrom: 3.2, span: 5.0, driftX: -1.1},
  5: {src: P('nem-s01.mp4'), startFrom: 8.0, span: 3.0, zoom: 1.12},
  6: {src: P('nem-pool01.mp4'), startFrom: 30, span: 4.5, driftX: 1.2},
};

export const bed = (n: number): Bed => BEDS[n];
