/**
 * Scene -> bed clips. Rules: real footage only, and no clip reused from any earlier film or short.
 * Every source here is new to the library, and no two beds take overlapping ranges of one source.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - k1-k4, k5c, k6  World Athletics' own Day 3 livestream of the Ultimate Championship in Budapest,
 *          cut to the men's 1500m final. The broadcast puts a full-screen "JOSH KERR - Great Britain
 *          & N.I." card on his face at the start and the leader bug reads "1 KERR" through the race,
 *          so every shot is a proven face, and the SEIKO clock carries 1:42 (2 laps to go) and the
 *          3:29.36 finish itself - no built card has to state either number.
 *   - k5a1/k5a2  World Athletics' clip of the mile world record in London, where the stadium screen
 *          prints "NEW WR / GBR 3:42.66 / KERR JOSH" itself; k5b  the Commonwealth Games'
 *          own upload of the Glasgow 2026 mile, Kerr in the Scotland vest.
 *
 * `volume` is the one new thing here. Every bed under the voiceover is silent, exactly as in every
 * earlier short. k6 is not: it is the only bed in scene 6, it plays at full volume, and the
 * voiceover has already finished, so the film ends on the real commentary and the real crowd.
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
  volume?: number;
};

const P = (name: string) => `bed-pool/${name}.mp4`;

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number, zoom = 1.06): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  // The broadcast's own name card on his face, then the last 100m.
  bed('k1a', 3.0, 0.2),
  bed('k1b', 3.0, -0.2),
];

export const SCENE2_CUTS: Bed[] = [
  bed('k2a', 3.0, 0.25),
  // "KERR" on the bib, sitting on Nuguse's shoulder - he is waiting, which is the line.
  bed('k2b', 3.0, -0.2),
  bed('k2c', 3.0, 0.25),
];

export const SCENE3_CUTS: Bed[] = [
  // The "2 LAPS TO GO 1:42" bug is on screen: this is the exact point the last 800 begins.
  bed('k3a', 3.0, 0.25),
  bed('k3b', 3.0, -0.25),
];

export const SCENE4_CUTS: Bed[] = [
  bed('k4a', 3.0, 0.25),
  // The FINISH bug reads 3:29.36 - the line's number, on the broadcast's own clock.
  bed('k4b', 3.0, -0.2),
];

export const SCENE5_CUTS: Bed[] = [
  // One cut per thing the line names: London, the record board, Glasgow, Budapest.
  bed('k5a2', 3.0, 0.2),
  // The board is a static graphic already letterboxed over its own blur, so no zoom and no drift.
  {src: P('k5a1'), startFrom: 0, span: 0.8, zoom: 1.0},
  bed('k5b', 3.0, -0.2),
  bed('k5c', 3.0, 0.2),
];

/**
 * Scene 6 - the live finish. One continuous take, never speed-changed (SceneBed would pitch-shift
 * the commentary), full volume, no voiceover over it.
 */
export const SCENE6_CUTS: Bed[] = [{src: P('k6'), startFrom: 0, span: 8.4, zoom: 1.04, driftX: -0.12, volume: 1}];