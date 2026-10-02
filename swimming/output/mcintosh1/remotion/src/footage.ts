/**
 * Scene -> bed clips. Rules: real footage only, and no clip reused from any earlier film.
 *
 * Both sources were already on disk from `records2026`, which used PP 0-4.0s / 286-298.67s and
 * WR 266-280s. Every bed below is baked from outside those windows (see ../crop.ps1).
 *
 *   pp-*  USA Swimming's official upload of the Pan Pacs 400 IM final (Irvine, Aug 2026): the
 *         broadcast replay of her swim, her at the wall, and the post-race interview.
 *   wr-*  CBC's coverage of the 2025 Canadian Trials, where she swam the 4:23.65 world record.
 *
 * Identity: at 299s the Pan Pacs feed carries a "CAN | Summer McINTOSH | 4:28.01 | WINNER -
 * WOMEN'S 400M INDIVIDUAL MEDLEY - FINAL A" lower-third over the shot `pp-wall` is cut from, and
 * her cap reads "McINTOSH / CAN" in that same frame. Every pp-* bed is from that one continuous
 * post-race sequence or the interview that follows it.
 *
 * Facts (worldathletics-equivalent sources: USA Swimming, olympic.ca, swimswam): 4:28.01 is a
 * championship record, beating Elizabeth Beisel's 4:31.99 from 2014; Jenna Forrester was second in
 * 4:31.50; the world record 4:23.65 was set at the Canadian Trials in June 2025.
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

/** `span` is the baked clip's full length; SceneBed slows it only if the cut needs more. */
const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [
  bed('pp-fly', 2.6, 0.3),
  bed('pp-back', 2.6, -0.3),
];

export const SCENE2_CUTS: Bed[] = [
  // The wall, where the broadcast itself put her name and 4:28.01 on screen.
  bed('pp-wall', 2.6, 0.25),
  bed('pp-smile', 2.6, -0.25),
];

export const SCENE3_CUTS: Bed[] = [bed('pp-rope', 2.6, 0.3)];

export const SCENE4_CUTS: Bed[] = [
  // "She wasn't satisfied" is a thing she said, so this runs over her saying it.
  bed('pp-int1', 2.6, -0.25),
  bed('pp-int2', 2.6, 0.25),
  bed('pp-int3', 2.6, -0.25),
];

export const SCENE5_CUTS: Bed[] = [
  // The world record swim itself, not Pan Pacs.
  bed('wr-water', 2.6, 0.25),
  bed('wr-smile', 2.2, -0.25),
];

export const SCENE6_CUTS: Bed[] = [
  bed('pp-hug', 2.6, 0.25),
  bed('pp-int4', 2.6, -0.25),
  // Ends back on her swimming — "she can go much faster".
  bed('pp-fly2', 2.6, 0.3),
];
