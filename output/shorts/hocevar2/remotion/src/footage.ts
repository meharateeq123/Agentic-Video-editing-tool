/**
 * Scene -> bed clips. Rules: no game footage, and no clip reused from any earlier film or short.
 * keselowski1 used Darlington footage and a Gateway drone reel; blaney2 / elliott3 used other
 * stretches of the Gateway full race replay (TkeSuY3t6iY). Every stretch below is new (see
 * ../crop.ps1).
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - b-* / c-* / f-pack   Gateway replay: the No. 77 Spectrum Chevrolet racing and driving through
 *                           the late wreck around the spinning No. 97.
 *   - fs-*                 Frontstretch, "'It Was Fun' - Carson Hocevar on Battling Brad Keselowski
 *                           for the Lead" (nVoIowRAZog), Hocevar at Gateway after the race.
 *   - bms-c                Bristol Motor Speedway this week (WJHL).
 *
 * Facts on screen (motorsport.com / NASCAR.com): Hocevar finished 8th, his career-best 10th top-10
 * of the season; he entered Gateway 12th in the Chase and left 9th with 2,080 points, 88 behind
 * Hamlin (2,168).
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

const P = (name: string) => `bed-pool/${name}.mp4`;

export const HOCEVAR_ID = 'id/hocevar.jpg';

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  bed('b-77', 2.4, 0.3),
  // Smoke in the pack, on "absolute chaos".
  bed('c-wreck', 2.4, -0.4),
  bed('c-77a', 1.8, 0.4),
  // The No. 77 past the spinning No. 97, on "came away with a huge result".
  bed('c-77b', 1.2, -0.4),
];

export const SCENE2_CUTS: Bed[] = [
  bed('fs-a', 2.6, 0.3),
  bed('b-pack', 2.4, -0.4),
];

export const SCENE3_CUTS: Bed[] = [
  bed('c-97', 2.2, 0.4),
  bed('f-pack', 2.2, -0.4),
  bed('b-pack2', 2.4, 0.4),
];

export const SCENE4_CUTS: Bed[] = [
  bed('fs-b', 2.6, -0.3),
  bed('fs-c', 2.6, 0.3),
];

export const SCENE5_CUTS: Bed[] = [
  bed('bms-c', 2.2, 0.4),
  bed('fs-d', 2.6, -0.3),
];
