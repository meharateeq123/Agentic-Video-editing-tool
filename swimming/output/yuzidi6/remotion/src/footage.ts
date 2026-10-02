/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs. The user's three rules for this short: her FACE in
 * frame, no clip carrying a channel logo or a burned-in banner, and no clip shown twice.
 *
 * Every crop uses s <= 0.80 with cy low, which pushes the top ~20% of the source out of frame - that is
 * where hattrick's "SPORTS ROUNDUP" bug and fly_full's CCTV-5 bug and Chinese banner sit. WION's two
 * sources are unused entirely (a two-line headline strap is burned across every frame), and cgtn3g is
 * unused because it is a Chinese domestic meet, not the Asian Games. Every range is also disjoint from
 * the fly_full ranges yuzidi5 already used.
 *
 *   a1 a3 c1 c3 e1 f1 f2   hattrick - the cleanest close-ups of her at the wall, and the podium
 *   a2 b1 c2 d1 d2         fly_full - the host-broadcast Women's 200m Butterfly final; her lane bar
 *                          and her cap both read "YU Zidi"
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

// "The Chinese teenager won the 200 fly, 200 IM, and 400 IM,"
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.1), bed('a3', 0.08)];

// "setting a Games record in all three."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1)];

// "Her biggest swim came in the 400 IM, where she clocked an incredible 4:28.56,"
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.1), bed('c3', 0.08)];

// "making her the fifth-fastest performer in history."
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.1)];

// "Three golds. Three records."
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.1)];

// "What can this 13-year-old do next?"
export const SCENE6_CUTS: Bed[] = [bed('f1', 0.1), bed('f2', -0.1)];
