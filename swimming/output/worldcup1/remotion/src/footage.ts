/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs.
 *
 * This short is a schedule preview, not an athlete story, so the meets, cities and dates are carried by
 * the two OFFICIAL World Aquatics promos' own title cards rather than by any graphic of ours - which is
 * also why the film has no stamp or card at all. It matters here: the 2026 World Cup starts the day
 * after this was cut, so no footage of it exists; nothing on screen pretends otherwise.
 *
 *   a1 "WELCOME TO THE SWIMMING WORLD CUP 2026"   a2 World Cup racing   a3 the BAKU card
 *   b1 the globe listing BAKU 01-03 OCT / TASHKENT 08-10 OCT / ASTANA 15-17 OCT
 *   c1 c2 Josh Liendo's World Cup 2025 100 fly world record   c3 the Aichi-Nagoya venue
 *   d1 "AT THE WORLD SWIMMING CHAMPIONSHIPS 2026"   d2 "BEIJING 2026"   e1 the WORLD RECORD board
 *
 * Every text beat is baked 'fill' - these cards are laid out for 16:9 and a tight crop cuts the words
 * in half.
 */

export type Bed = {
  src: string;
  startFrom: number;
  span?: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
  volume?: number;
  playbackRate?: number;
};

const P = (name: string) => `bed-pool/${name}.mp4`;

const bed = (name: string, driftX = 0.1): Bed => ({
  src: P(name),
  startFrom: 0,
  zoom: 1.0,
  driftX,
  playbackRate: 1,
});

// "But the 2026 Swimming World Cup begins October 1 in Baku, Azerbaijan,"
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.06), bed('a2', -0.1), bed('a3', 0.06)];

// "before moving to Tashkent and Astana."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.06)];

// "It's the first major chance for many swimmers to race again after the Asian Games."
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.1), bed('c3', 0.08)];

// "And with the World Short Course Championships in Beijing coming in December,"
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.06), bed('d2', -0.06)];

// "more records could be coming."
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.06)];
