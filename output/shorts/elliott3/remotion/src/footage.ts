/**
 * Scene -> bed clips. Rules: no game footage, and no clip reused from any earlier film or short.
 * blaney1 used NASCAR's Gateway highlight reel; blaney2 used other stretches of the full race
 * replay (TkeSuY3t6iY) and the start of the Frontstretch Elliott/Briscoe video; gibbs3 used WJHL's
 * ILrjTEsY-bg at 12-14s and 44-46s. Every stretch below is different (see ../crop.ps1).
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - e-*   Chase Elliott: his No. 9 ("ELLIOTT" on the windshield), the spin with the No. 19, the
 *           Hendrick crew on pit road, and his USA Sports and Frontstretch interviews.
 *   - b-*   Chris Buescher's No. 17 ("BUESCHER" on the windshield) into the wall on Lap 238.
 *   - bl-car  Ryan Blaney's No. 12 with its right-front corner destroyed.
 *   - bms-*   Bristol Motor Speedway this week (WJHL).
 *
 * Facts on screen (NASCAR.com / Frontstretch / motorsport.com): Elliott's rotor failed on Lap 214
 * and he finished 31st; Blaney's on Lap 155; Buescher's on Lap 238. Chase standings after
 * Gateway: Hamlin 2,168, Elliott 2,075 (-93).
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

export const ELLIOTT_ID = 'id/elliott.jpg';

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  bed('e-int', 3.0, 0.3),
  // The spin, on "when disaster struck".
  bed('e-spin', 2.0, -0.4),
];

export const SCENE2_CUTS: Bed[] = [
  // The broken No. 9, on "His brake rotor failed".
  bed('e-car', 3.0, 0.3),
  // The No. 9 limping, on "ending his race".
  bed('e-limp', 2.5, -0.4),
  // Crew on the brakes, on "all the way to 31st".
  bed('e-crew', 2.2, 0.3),
  // Elliott, on "this wasn't an isolated problem".
  bed('e-fs', 2.5, -0.3),
];

export const SCENE3_CUTS: Bed[] = [
  bed('bl-car', 2.2, 0.4),
  bed('b-wall', 1.6, -0.4),
  bed('b-close', 1.4, 0.4),
  bed('b-out', 1.4, -0.4),
];

export const SCENE4_CUTS: Bed[] = [
  bed('e-int2', 3.0, 0.3),
];

// The closing question is about Bristol, so the last scene runs Bristol night-race action, not the
// empty-grandstand WJHL b-roll it used before (bms-a/bms-b, now unused).
export const SCENE5_CUTS: Bed[] = [
  bed('br-a', 2.2, 0.35),
  bed('br-b', 2.2, -0.35),
  bed('br-c', 2.2, 0.35),
];
