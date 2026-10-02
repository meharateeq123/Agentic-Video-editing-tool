/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from an earlier short
 * or long-form film in this library. All footage is pre-cropped to 9:16 (720x1280):
 *
 *   - buescher-portrait / gateway-pack1/2/3   SportsWire USA, "NASCAR's Brake Problem Just
 *                     WRECKED the Playoffs" (l-PFbWLiexw, 2026-09-15). Real Gateway race
 *                     coverage: pack racing action (41-43.3s, 59-61.3s, 63-65.3s of the source)
 *                     and Buescher's own portrait right as the narration names him (54.3-56.6s).
 *   - briscoe-portrait   Same source (51.3-53.5s) - Chase Briscoe, the other driver named in the
 *                     same brake-failure chain that caution.
 *   - buescher-bristol-win   NASCAR ON FOX HIGHLIGHTS, "Chris Buescher snaps 222-race winless
 *                     streak after victory at Bristol" (E-tpcuo-XnU, 2022-09-18). His real
 *                     Bristol win, with the on-screen "2nd career Cup Series win" graphic.
 *   - bristol-aerial-a   Holston Aerial Vistas, "Bristol Motor Speedway" (rqsSNfIvQRY,
 *                     2026-05-16). Clean drone shot of the real track.
 *
 * Facts on screen: Buescher's brake failure at Gateway dropped him to a 27th-place finish, 13th
 * in the Chase and 111 points behind Hamlin - but he has a real prior Bristol Night Race win
 * heading into the next round.
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

const BUESCHER_PORTRAIT = P('buescher-portrait.mp4');
const BRISCOE_PORTRAIT = P('briscoe-portrait.mp4');
const PACK1 = P('gateway-pack1.mp4');
const PACK2 = P('gateway-pack2.mp4');
const PACK3 = P('gateway-pack3.mp4');
const BRISTOL_WIN = P('buescher-bristol-win.mp4');
const BRISTOL_AERIAL = P('bristol-aerial-a.mp4');

export const SCENE1_CUTS: Bed[] = [{src: BUESCHER_PORTRAIT, startFrom: 0.1, span: 2.1, zoom: 1.06, driftX: 0.2}];

export const SCENE2_CUTS: Bed[] = [
  {src: PACK1, startFrom: 0.1, span: 2.1, zoom: 1.08, driftX: 0.3},
  {src: BRISCOE_PORTRAIT, startFrom: 0.1, span: 2.0, zoom: 1.06, driftX: -0.2},
  {src: PACK2, startFrom: 0.1, span: 2.1, zoom: 1.08, driftX: 0.3},
  {src: PACK3, startFrom: 0.1, span: 2.0, zoom: 1.08, driftX: -0.3},
];

export const SCENE3_CUTS: Bed[] = [{src: BRISTOL_WIN, startFrom: 0.2, span: 2.9, zoom: 1.06, driftX: -0.3}];

export const SCENE4_CUTS: Bed[] = [{src: BRISTOL_AERIAL, startFrom: 0.2, span: 2.7, zoom: 1.06, driftX: 0.3}];
