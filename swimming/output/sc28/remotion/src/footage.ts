/**
 * Scene -> bed clips. Rules: no game footage, and no clip reused from any earlier film.
 * records2026 used Walsh's Rome/Fort Lauderdale 2026 WRs, the Budapest SC reel, Marchand's 200 IM
 * WR and his Paris races; sc27 used the 2025 World Cup WR clips. None of the sources below appear
 * in any of them.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *
 *   - w-*   World Aquatics, "Gretchen Walsh Breaks Championship Record in Women's 100m Butterfly!"
 *           (UA7BjGI4xV0, Singapore 2025). "WALSH" + US flag on her cap; her name on the water.
 *   - m-*   USA Swimming, "Matheny Charges but Marchand Gets Win in 200M Breaststroke | 2026 TYR Pro
 *           Swim Series Westmont" (uJCImUmVRus, 720p). "MARCHAND" on his cap in m-cap.
 *   - t-*   USA Swimming, "Foster Charges but Matsushita Gets Win in 400M IM | 2026 Pan Pacific
 *           Swimming Championships" (ND_sPfabFic, 720p). t-face follows the broadcast's
 *           "Tomoyuki MATSUSHITA / WINNER" lower-third on the same swimmer (JPN cap).
 *   - sofi-* / young-swimmers   7NEWS Australia, "Australian swimmers tour LA 2028 Olympic venue"
 *           (g6zkjbQCmqs, 720p), cropped above the 7NEWS lower-third.
 *
 * Facts on screen (LA28 / ABC7 / KTLA): LA 2028 Olympic swimming at SoFi Stadium, July 22-30,
 * 40,000+ spectators.
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

export const ID = {
  walsh: 'id/walsh.jpg',
  marchand: 'id/marchand.jpg',
  matsushita: 'id/matsushita.jpg',
};

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  bed('m-dive', 1.4, 0.4),
  bed('w-race', 1.3, -0.4),
  bed('m-race', 1.3, 0.4),
  bed('t-race', 1.3, -0.4),
  // A name and a "1" on the water, on "challenging champions".
  bed('w-board', 1.8, 0.4),
];

export const SCENE2_CUTS: Bed[] = [
  // Walsh, on "Gretchen Walsh".
  bed('w-cheer', 1.6, -0.3),
  // Marchand, on "Léon Marchand".
  bed('m-cap', 2.1, 0.3),
  // Matsushita, on "Tomoyuki Matsushita".
  bed('t-face', 2.2, -0.3),
];

export const SCENE3_CUTS: Bed[] = [
  bed('t-race2', 1.2, 0.5),
  bed('m-over', 1.2, -0.5),
];

export const SCENE4_CUTS: Bed[] = [
  // SoFi Stadium, on "LA 2028".
  bed('sofi-bowl', 2.5, 0.3),
  bed('sofi-sign', 2.2, -0.3),
  // Young swimmers in the SoFi stands, on "could a new generation".
  bed('young-swimmers', 1.8, 0.3),
  // Walsh's splash, on "take control of swimming?"
  bed('w-splash', 1.6, -0.3),
];
