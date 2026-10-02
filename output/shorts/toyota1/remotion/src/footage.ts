/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from ANY earlier short.
 * This film covers the same race as bell1/gibbs1/keselowski1, so their Darlington sources
 * (bell-battle-raw, bell-playoffs-raw, bell-burnout-raw, gibbs-nbc-raw, darlington-race) are all
 * off-limits — both clips below are fresh downloads of different official uploads.
 *
 *   - darlington-finish.mp4  "FINAL LAPS: Christopher Bell takes the checkered flag at the Cook
 *                            Out Southern 500 | NASCAR on FOX", 120s section. The broadcast's own
 *                            running order reads "1 BELL / 2 GIBBS / 3 REDDICK" on screen — real,
 *                            on-air confirmation of the exact 1-2-3 the script describes — and an
 *                            onboard cut carries a "54 GIBBS" driver box.
 *   - postrace.mp4           "POST-RACE INTERVIEWS: Christopher Bell, Ty Gibbs, Denny Hamlin &
 *                            more from Cook Out Southern 500", 140s section. Victory lane and
 *                            Bell's own interview beside the winning No. 20 Mobil 1 Toyota; the
 *                            lower banner even runs the Chase standings the script quotes.
 *
 * Christopher Bell's photo (id/bell-id.jpg) is a real still from that interview — he is the one
 * driver here identified individually, so he is the only one who gets a name-and-face card.
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

const FIN = P('darlington-finish.mp4');
const POST = P('postrace.mp4');

export const BELL_ID = 'id/bell-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  {src: FIN, startFrom: 20, span: 1.5, zoom: 1.12, driftX: 0.5},
  {src: POST, startFrom: 95, span: 1.5, zoom: 1.1, offY: 5, driftX: -0.5},
];

export const SCENE2_CUTS: Bed[] = [
  // Bell's own interview — the cut the name-and-face card rides.
  {src: POST, startFrom: 45, span: 2.7, zoom: 1.1, offY: 5, driftX: 0.5},
  // Onboard with the "54 GIBBS" driver box burned into the broadcast.
  {src: FIN, startFrom: 84, span: 2.7, zoom: 1.1, driftX: -0.6},
];

export const SCENE3_CUTS: Bed[] = [
  // The running order itself: 1 BELL, 2 GIBBS, 3 REDDICK, four laps to go.
  {src: FIN, startFrom: 24, span: 1.6, zoom: 1.1, driftX: 0.5},
  {src: POST, startFrom: 12, span: 1.6, zoom: 1.1, offY: 5, driftX: -0.5},
];

export const SCENE4_CUTS: Bed[] = [
  {src: FIN, startFrom: 60, span: 2.0, zoom: 1.12, driftX: -0.5},
];

export const SCENE5_CUTS: Bed[] = [
  {src: POST, startFrom: 60, span: 2.2, zoom: 1.1, offY: 5, driftX: 0.5},
  {src: FIN, startFrom: 100, span: 2.2, zoom: 1.1, driftX: -0.6},
];

export const SCENE6_CUTS: Bed[] = [
  {src: FIN, startFrom: 108, span: 2.5, zoom: 1.12, driftX: 0.5},
  {src: POST, startFrom: 120, span: 2.5, zoom: 1.1, offY: 5, driftX: -0.5},
];
