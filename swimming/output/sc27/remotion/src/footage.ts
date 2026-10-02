/**
 * Scene -> bed clips. Rules: no game footage, and no clip reused from any earlier film.
 * records2026 used World Aquatics' Budapest 2024 short course WR reel and Douglass's SC 200 breast
 * WR; yuzidi1 and phelps1 used other Beijing footage. None of the sources below appear in any of
 * them.
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1. Every race clip is World Aquatics'
 * own upload from the 2025 Swimming World Cup (25m pool); the names on screen are the broadcast's
 * own lane graphics and finish graphics - nothing here adds a name:
 *
 *   - liendo-start / liendo-cheer / liendo-finish   "Josh Liendo Shatters 100m Butterfly World
 *     Record with 47.68!" (OFbxcD5DuqE).
 *   - kos-wr / kos-race / kos-cheer   "World Record Alert! Hubert Kos Clocks 48.16 in the 100m
 *     Backstroke" (SF1PBwFQAI8).
 *   - douglass-race / douglass-smile / douglass-wr   "Kate Douglass Shatters Women's 100m
 *     Freestyle WR with 50.19" (i4sO7vHOT38).
 *   - beijing-cube   "Beijing's Water Cube and Bird's Nest at night" (One Flight Out, bWiFHfYHusg).
 *
 * Facts on screen (World Aquatics): Swimming World Cup 2026 - Baku 1-3 Oct, Tashkent 8-10 Oct,
 * Astana 15-17 Oct; World Aquatics Swimming Championships (25m), Beijing, 1-6 Dec 2026.
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
  // A World Cup final lining up, lane names on the water, into the start.
  bed('liendo-start', 2.4, 0.3),
];

export const SCENE2_CUTS: Bed[] = [
  // A touch with the WR flag up.
  bed('kos-wr', 2.0, -0.3),
  // A world-record holder celebrating, on "biggest stars".
  bed('liendo-cheer', 2.5, 0.3),
  // Another, on "the record books".
  bed('douglass-smile', 2.4, -0.3),
];

export const SCENE3_CUTS: Bed[] = [
  // World Cup racing, on "The World Cup begins in October".
  bed('douglass-race', 2.2, 0.3),
  bed('kos-race', 1.8, -0.3),
  // Beijing, on "arrive in Beijing".
  bed('beijing-cube', 2.5, 0.3),
];

export const SCENE4_CUTS: Bed[] = [
  bed('kos-cheer', 2.5, -0.3),
  bed('liendo-finish', 1.8, 0.3),
  // The WR flag again, on "how many records could fall?"
  bed('douglass-wr', 1.6, -0.3),
];
