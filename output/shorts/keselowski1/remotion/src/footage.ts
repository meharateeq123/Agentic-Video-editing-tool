/**
 * Scene -> bed clips. Rule: no game/gameplay footage at all, and no clip reused from ANY earlier
 * short in this library — all four sources below are fresh downloads for this film.
 *
 *   - kes-brad.mp4            Brad Keselowski's own post-race interview at Darlington (Solomon
 *                             Plumbing suit/cap + Cup Series champion patch confirm identity).
 *                             Pre-cropped (ffmpeg crop=520:570:560:0, first 55s only) so he is
 *                             centred and both the channel logo and the burned-in hotel ad banner
 *                             are cut out of frame — the raw upload also runs a full commercial
 *                             after ~56s, which is why the file stops before it.
 *   - hocevar-reax.mp4        Carson Hocevar's own on-camera reaction after Darlington (Spire
 *                             Motorsports / Spectrum / Zeigler suit confirms identity). 46s.
 *   - hocevar-darlington.mp4  A second, visually different Hocevar interview at Darlington under
 *                             the lights — night, different framing, so the two Hocevar beats
 *                             don't look like the same shot. 64s.
 *   - darlington-race.mp4     Official "NASCAR Cup Series Highlights | 2026 Darlington Raceway",
 *                             120s section. Real on-track footage of the race the script is about;
 *                             the running leaderboard names both KESELOWSKI and HOCEVAR on screen.
 *                             USABLE 5-14s, 55-70s and 72-92s only — a driver-radio text box sits
 *                             over ~25-35s and a full-screen "LAP 111" card lands around ~95-105s.
 *
 * Both drivers' photos (id/keselowski-id.jpg, id/hocevar-id.jpg) are real stills cropped from
 * their own interviews above, shown in ID cards over real footage — this library's standard look.
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

const KES = P('kes-brad.mp4');
const HOC = P('hocevar-reax.mp4');
const HOCD = P('hocevar-darlington.mp4');
const DAR = P('darlington-race.mp4');

export const KESELOWSKI_ID = 'id/keselowski-id.jpg';
export const HOCEVAR_ID = 'id/hocevar-id.jpg';

// KES offsets are picked from windows where he is square to camera — at ~0-5s he is turned away.
export const SCENE1_CUTS: Bed[] = [
  {src: KES, startFrom: 8, span: 2.0, zoom: 1.1, driftX: 0.5},
  {src: DAR, startFrom: 60, span: 2.0, zoom: 1.1, driftX: -0.6},
];

// Both cuts come from the race reel, but they are deliberately opposite shot types — a cockpit
// pit-stop POV and a wide aerial of the pack — so the scene still cuts, it doesn't just sit.
export const SCENE2_CUTS: Bed[] = [
  {src: DAR, startFrom: 8, span: 2.5, zoom: 1.1, driftX: 0.6},
  {src: DAR, startFrom: 78, span: 2.4, zoom: 1.12, driftX: -0.7},
];

export const SCENE3_CUTS: Bed[] = [
  {src: KES, startFrom: 34, span: 2.2, zoom: 1.1, driftX: -0.5},
  {src: HOC, startFrom: 6, span: 2.2, zoom: 1.1, driftX: 0.5},
];

export const SCENE4_CUTS: Bed[] = [
  {src: DAR, startFrom: 62, span: 2.5, zoom: 1.1, driftX: 0.6},
  {src: HOCD, startFrom: 30, span: 2.5, zoom: 1.1, driftX: -0.5},
];

export const SCENE5_CUTS: Bed[] = [
  {src: HOC, startFrom: 30, span: 2.8, zoom: 1.12, driftX: 0.4},
];
