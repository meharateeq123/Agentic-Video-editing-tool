/**
 * Scene -> bed clips. Rules: no game footage, no clip reused from any earlier film. records2026
 * already used "walsh-100fly-wr-5433.mp4" (World Aquatics feed of this exact race) across several
 * scenes there, so this short sources the same race from two different, fresh uploads instead:
 *
 *   - s1-dive / s2-fly / s4-crowd1 / s5-crowd2   Social Kick / Swim Culture & Stories, "HISTORY!
 *           Gretchen Walsh SMASHES 100m Butterfly World Record!" (koUeGqq7mro, 2026-05-02).
 *           Fort Lauderdale Aquatic Center, TYR Pro Swim Series - the real dive, mid-race
 *           butterfly stroke, and the sunset crowd (diving tower + results board visible).
 *   - s3-pack / s2-board   SwimSwam, "Gretchen Walsh WORLD RECORD 100 Fly - 54.33"
 *           (Yd_FNXA_nhk, 2026-05-04). Same meet, a different broadcast angle - the pack mid-race
 *           and the real, legible results board: "E029/H2 F 100 Fly ... 5 Walsh, G NYAC 29.24
 *           54.33 1". That board IS the on-screen proof for the 54.33 line - no synthetic stat
 *           card needed for this short.
 *
 * No named-person ID card is used anywhere here: none of these wide/CU shots carry a confirmable
 * lane number, name lower-third, or cap text on a single identifiable swimmer, so per the
 * swimming rules this stays real b-roll under the caption rather than a card claiming an identity.
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

const bed = (name: string, span: number, driftX: number): Bed => ({
  src: P(name),
  startFrom: 0.1,
  span,
  zoom: 1.06,
  driftX,
});

export const SCENE1_CUTS: Bed[] = [bed('s1-dive', 2.3, 0.3)];

export const SCENE2_CUTS: Bed[] = [bed('s2-fly', 2.3, -0.3), bed('s2-board', 2.3, 0.1)];

export const SCENE3_CUTS: Bed[] = [bed('s3-pack', 2.4, 0.3)];

export const SCENE4_CUTS: Bed[] = [bed('s4-crowd1', 3.6, -0.2)];

export const SCENE5_CUTS: Bed[] = [bed('s5-crowd2', 2.4, 0.3)];
