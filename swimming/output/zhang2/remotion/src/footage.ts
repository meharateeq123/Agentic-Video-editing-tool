/**
 * Scene -> bed clips, baked 9:16 by ../bake.mjs with the crop window centred on Zhang Zhanshuo in
 * every shot that is his.
 *
 * Identity. This final had TWO Chinese swimmers - lane 2 ZHANG Zhanshuo and lane 7 XU Haibo - so a red
 * Team China tracksuit proves nothing on its own. What does: his own white Speedo cap has "ZHANG ZH"
 * printed on it (a1), the host broadcast's lane name bars read "ZHANG Zhanshuo / MURASA Tatsuya /
 * HWANG Sunwoo" over the closing metres (a2, d2), and the winner lower-third reads "WINNER - ZHANG
 * Zhanshuo - AR 1:43.49" over the celebration (c1). Xu Haibo's own walk-out (the broadcast names him
 * too) is deliberately unused, and the one Hwang Sun-woo beat (d1) is the line that names Hwang.
 *
 *   a1 a2 b1 b2 b3 c1 c2 d1 d2 e3   the host-broadcast feed of the Men's 200m Freestyle final,
 *                                   20th Asian Games, Aichi-Nagoya 2026
 *   e1 e2                           CGTN Sports Scene, Zhang in the mixed zone - no burned-in subtitles
 *
 * Every range is used once and no two overlap. playbackRate is pinned to 1: each bed is baked just
 * long enough for its cut plus the overlap.
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

// "The 19-year-old Chinese swimmer blasted a stunning 1:43.49"
export const SCENE1_CUTS: Bed[] = [bed('a1', 0.1), bed('a2', -0.08)];

// "in the 200-meter freestyle at the Asian Games, smashing the Asian record."
export const SCENE2_CUTS: Bed[] = [bed('b1', 0.1), bed('b2', -0.1), bed('b3', 0.08)];

// "Even crazier, he dropped more than a second from his previous best"
export const SCENE3_CUTS: Bed[] = [bed('c1', 0.1), bed('c2', -0.1)];

// "and beat reigning Asian Games champion, Hwang Sun-woo."
export const SCENE4_CUTS: Bed[] = [bed('d1', 0.1), bed('d2', -0.08)];

// "Zhang is now officially one of the biggest names to watch heading toward LA 2028."
export const SCENE5_CUTS: Bed[] = [bed('e1', 0.1), bed('e2', -0.1), bed('e3', 0.1)];
