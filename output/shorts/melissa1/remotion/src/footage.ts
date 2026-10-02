/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from an earlier short
 * or long-form film in this library (this is the first athletics/track short - nothing to
 * collide with). All footage is pre-cropped to 9:16 (720x1280):
 *
 *   - s1-blocks / s2-100mid / s2-100finish   World Athletics official, "Melissa Jefferson-Wooden
 *                     comes from behind to win in 10.62" (Ly0Gyu6ZSLs, 2026-09-12). Real Women's
 *                     100m Final, World Athletics Ultimate Championship, Budapest: the starting
 *                     line close-up, mid-race pack action, and the real finish photo with the
 *                     on-screen "FINISH 100m | 10.62" broadcast graphic.
 *   - s2-200mid / s2-200finish   World Athletics official, "Melissa Jefferson-Wooden STORMS to
 *                     21.49 over 200m" (s4LUGlKrLf4, 2026-09-13). Real Women's 200m Final footage
 *                     from the same championship - mid-race and the finish stretch.
 *   - s3-celeb1 / s4-celeb2   APT Sports, "Jefferson-Wooden and Bednarek Strike 200m Gold to
 *                     Complete Sprint Double in Budapest" (ysp2MnpTF8w, 2026-09-14). Her real
 *                     post-race celebration in Budapest, with the on-screen "Melissa
 *                     JEFFERSON-WOODEN 21.47" name/time graphic.
 *
 * Facts on screen: 100m in 10.62, 200m in 21.47 (third on the world all-time list per World
 * Athletics), and the Budapest sprint double.
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

const S1_BLOCKS = P('s1-blocks.mp4');
const S2_100MID = P('s2-100mid.mp4');
const S2_100FINISH = P('s2-100finish.mp4');
const S2_200MID = P('s2-200mid.mp4');
const S2_200FINISH = P('s2-200finish.mp4');
const S3_CELEB1 = P('s3-celeb1.mp4');
const S4_CELEB2 = P('s4-celeb2.mp4');

export const SCENE1_CUTS: Bed[] = [{src: S1_BLOCKS, startFrom: 0.1, span: 3.3, zoom: 1.05, driftX: 0.15}];

export const SCENE2_CUTS: Bed[] = [
  {src: S2_100FINISH, startFrom: 0.1, span: 3.6, zoom: 1.07, driftX: -0.2},
  {src: S2_200MID, startFrom: 0.1, span: 3.2, zoom: 1.08, driftX: 0.3},
  {src: S2_200FINISH, startFrom: 0.1, span: 3.2, zoom: 1.07, driftX: -0.3},
  {src: S2_100MID, startFrom: 0.1, span: 3.0, zoom: 1.08, driftX: 0.3},
];

export const SCENE3_CUTS: Bed[] = [{src: S3_CELEB1, startFrom: 0.1, span: 2.2, zoom: 1.06, driftX: 0.2}];

export const SCENE4_CUTS: Bed[] = [{src: S4_CELEB2, startFrom: 0.1, span: 2.4, zoom: 1.06, driftX: -0.2}];
