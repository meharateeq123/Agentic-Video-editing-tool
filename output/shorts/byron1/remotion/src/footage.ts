/**
 * Scene -> bed clips. Rule: no game/gameplay footage, and no clip reused from ANY earlier short.
 * Darlington has now carried bell1, gibbs1, keselowski1 and toyota1, so every Darlington source
 * those films used (bell-battle-raw, bell-playoffs-raw, bell-burnout-raw, gibbs-nbc-raw,
 * darlington-race, darlington-finish, postrace) is off-limits here. Both beds below are fresh
 * downloads of uploads none of those films touched.
 *
 *   - byron-onboard.mp4  William Byron's in-car camera from the Cook Out Southern 500, the run
 *                        that ended 37th. The broadcast burns a "WILLIAM BYRON / 24" driver box
 *                        into the feed, which is what identifies the car as his — and the spin
 *                        the script describes is right there at t=10-16, tyre smoke over the
 *                        windshield. Derived from byron-interview.mp4 (see crop note below).
 *   - byron-face.mp4     "William Byron's full availability | NASCAR Playoffs Media Day" from the
 *                        official NASCAR channel. Byron is identified in frame several times over:
 *                        the 24 on his cap, RAPTOR / AXALTA / HendrickCars.com on the firesuit
 *                        (Hendrick Motorsports No. 24) and the NASCAR Cup Series Playoffs
 *                        backdrop. Derived from byron-media.mp4 (see crop note below).
 *   - southern500-night.mp4  "NASCAR Official Extended Highlights: Darlington Southern 500", the
 *                        night portion. Used once, for a wide pack shot only — no driver in it is
 *                        named or implied to be Byron. Needs no crop: the broadcast's leaderboard
 *                        sidebar sits far enough left that the 9:16 centre window misses it.
 *
 * Both beds are PRE-CROPPED with ffmpeg rather than recentred with offX. A 9:16 cover-fit of a
 * 1920x1080 frame only ever shows ~607px of source width, so offX cannot move a subject far, and
 * SceneBed's minScale compensation runs away into heavy zoom past roughly |offX| = 15. Baking the
 * crop into the file is the only clean fix:
 *   byron-onboard.mp4  crop=700:1080:880:0  — pushes past the burned-in driver box, which sits at
 *                      x 32-840 and would otherwise hang into frame as a sliced-off graphic.
 *   byron-face.mp4     crop=700:1080:470:0  — centres Byron, who sits left of centre in the wide
 *                      media-day shot, and drops the reporter standing at the right edge.
 *
 * byron-onboard.mp4 carries the uploader's own large white play-triangle graphic at roughly
 * t = 26-31, 66-70, 98-106, 130-138 and 158-166, plus trackside ad banners around t = 82-94.
 * Every startFrom below is chosen to sit inside a verified-clean window with span to spare.
 *
 * Byron's photo (id/byron-id.jpg) is a still lifted from byron-face.mp4 at t=62 — the same
 * verified footage, so the face on the card is provably the driver the card names.
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

const ONB = P('byron-onboard.mp4');
const FACE = P('byron-face.mp4');
const NIGHT = P('southern500-night.mp4');

export const BYRON_ID = 'id/byron-id.jpg';

export const SCENE1_CUTS: Bed[] = [
  // Byron on camera — the cut the name-and-face card rides.
  {src: FACE, startFrom: 56, span: 2.1, zoom: 1.06, driftX: 0.4},
  // Straight into his own onboard at Darlington, under the lights.
  {src: ONB, startFrom: 4, span: 2.1, zoom: 1.1, driftX: -0.5},
];

export const SCENE2_CUTS: Bed[] = [
  // The spin itself: smoke coming up over the windshield of the 24.
  {src: ONB, startFrom: 10.5, span: 1.9, zoom: 1.08, driftX: 0.5},
  {src: ONB, startFrom: 14, span: 1.9, zoom: 1.12, driftX: -0.6},
];

export const SCENE3_CUTS: Bed[] = [
  {src: ONB, startFrom: 20, span: 1.5, zoom: 1.1, driftX: 0.5},
  // Track crew out under the resulting caution.
  {src: ONB, startFrom: 44, span: 1.5, zoom: 1.08, driftX: -0.5},
];

export const SCENE4_CUTS: Bed[] = [
  // A wide pack shot rather than the onboard: the line is about where Byron sits relative to the
  // whole Chase field, and no car in this frame is claimed to be his.
  {src: NIGHT, startFrom: 70, span: 2.3, zoom: 1.08, driftX: -0.5},
];

export const SCENE5_CUTS: Bed[] = [
  {src: ONB, startFrom: 120, span: 1.9, zoom: 1.08, driftX: 0.5},
  // Blurred and dimmed under the standings card.
  {src: FACE, startFrom: 96, span: 1.9, zoom: 1.06, driftX: -0.4},
];

export const SCENE6_CUTS: Bed[] = [
  {src: ONB, startFrom: 170, span: 1.9, zoom: 1.1, driftX: 0.5},
  // Byron again for the closing bookend card.
  {src: FACE, startFrom: 136, span: 1.9, zoom: 1.06, driftX: -0.4},
  {src: ONB, startFrom: 50, span: 1.9, zoom: 1.12, driftX: 0.5},
];
