/**
 * Scene -> bed clips. Rules: real footage only, and no clip reused from any earlier film or short -
 * and within THIS short, no scene leans on a single source clip for every one of its cuts (scene 2
 * originally ran all four cuts off one aw-injury-reveal.mp4 take; fixed by adding a second, separate
 * interview for variety).
 *
 * All beds are baked 9:16 (720x1280, 30fps) by ../crop.ps1:
 *   - h1a/h1b/h2a/h2b/h4a/h5  Athletics Weekly's interview with Hodgkinson backstage at the Ultimate
 *          Championship in Budapest (2026-09-12), where she reveals the injury herself - her GB kit
 *          and the Budapest backdrop are the identity proof, and this is her own account of the fall
 *          and the hamstring tear, so no card is needed to state it. h5 keeps this clip's own audio -
 *          see below.
 *   - h2c/h2d  CITIUS MAG's separate injury interview (different reporter, different backdrop angle) -
 *          this is scene 2's second source, so the four cuts are not one interview repeated.
 *   - h3a/h3b  World Athletics' Day 2 Extended Highlights, the women's 800m final in Budapest
 *          (2026-09-13): h3b is the moment her "GREAT..." bib is unmistakable next to Netherlands'
 *          Broeders-Bol.
 *   - h3c/h3d/h4b  FloTrack's interview at Athlos London (uploaded 2026-09-18, after she raced there)
 *          - the ATHLOS LDN26 backdrop is the venue's own graphic, so it carries the location without
 *          a built card. It is used only for the venue, never for the result, since the script's "is
 *          now set for Athlos" is forward-looking relative to when it was written.
 *   - h5  THE REAL-VOICE PAYOFF. The voiceover ends after scene 4; scene 5 has no VO at all and is
 *         instead her own sync audio from the injury interview, at full volume, saying "I'm actually
 *         proud of my team and me and how we've handled it and come back." Same pattern as kerr1's
 *         live commentary handoff.
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
  bed('h1a', 2.4, 0.2),
  bed('h1b', 2.4, -0.2),
];

export const SCENE2_CUTS: Bed[] = [
  bed('h2a', 2.6, 0.2),
  bed('h2b', 2.6, -0.2),
  bed('h2c', 2.6, 0.2),
  bed('h2d', 2.6, -0.2),
];

/** The real-voice payoff bed. Never speed-changed - it carries her own sync audio. */
export const SCENE5_CUTS: Bed[] = [
  {src: P('h5'), startFrom: 0, span: 4.2, zoom: 1.04, driftX: -0.1, volume: 1},
];

export const SCENE3_CUTS: Bed[] = [
  bed('h3a', 2.4, 0.2),
  bed('h3b', 1.0, -0.1),
  bed('h3c', 2.4, 0.2),
  bed('h3d', 2.4, -0.2),
];

export const SCENE4_CUTS: Bed[] = [
  bed('h4a', 2.4, 0.2),
  bed('h4b', 2.6, -0.2),
];