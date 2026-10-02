/**
 * Scene -> bed clip.
 *
 * Every scene has a bed and the bed plays for the whole scene, first frame to
 * last. Broadcast graphics that come with real race coverage — score tickers,
 * standings panels, race-info banners, network bugs like REPLAY — are left
 * alone and framed normally; they are part of the footage. Excluded is
 * someone else's burned-in caption track, Subscribe / "Comment Below"
 * overlays, third-party recreations, and anything off-story.
 *
 * Two supplies feed the beds:
 *   - CLIPS: the per-scene clips auto-footage fetched (7–14s each).
 *   - POOL:  eight 90-second vetted sections (brand-assets/bed-pool). Long
 *            enough that a scene can run at normal speed, and long enough for
 *            two scenes to take genuinely different moments of one section.
 *
 * Scenes 5, 6, 9, 14, 23 and 24 came back as "motion-graphic" — no clip of
 * their own — so each takes a distinct moment from the pool. No two scenes
 * ever play the same moment of the same source.
 *
 * `startFrom` is seconds into the source; `span` is how many seconds of it
 * the scene consumes. The bed derives its playback rate from `span`, so the
 * clip covers the scene exactly and never runs out or freezes.
 */

export type Bed = {
  /** path under public/ */
  src: string;
  /** seconds into the source clip */
  startFrom: number;
  /** seconds of source this scene consumes (drives the playback rate) */
  span: number;
  /** overscan; keep >= 1.10 so the depth-of-field blur never samples an edge */
  zoom?: number;
  /** shifts the image, in % of frame: negative x crops the LEFT edge, positive crops the right */
  offX?: number;
  /** negative y crops the TOP edge, positive crops the bottom */
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
  /** true when this is a second, disjoint moment of a source another scene uses */
  borrowed?: boolean;
};

const F = (name: string) => `auto-footage/${name}`;
const P = (name: string) => `bed-pool/${name}`;

/* Per-scene clips. */
export const CLIPS = {
  s01: F('01-cleetus-mcfarland-just-crashed-his-super.mp4'), // 14.0s @FloRacing — the Berlin spin
  s07: F('07-that-honesty-didn-t-stop-the-backlash-on.mp4'), // 12.2s @NASCARonFOX
  s08: F('08-that-s-where-dale-earnhardt-jr-stepped-i.mp4'), // 10.1s @NASCARonFOX — Dale Jr
  s10: F('10-then-came-the-moment-that-summed-up-his-.mp4'), //  9.9s @NASCARonFOX
  s11: F('11-his-larger-point-spinning-out-and-making.mp4'), //  8.3s
  s12: F('12-earnhardt-also-pushed-back-on-the-online.mp4'), // 11.7s — Cleetus, ARCA
  s15: F('15-no-crash-no-late-spin-just-a-driver-mana.mp4'), //  8.9s
  s16: F('16-earnhardt-highlighted-that-second-run-as.mp4'), //  7.7s @NASCAR — Talladega presser
  s17: F('17-two-races-back-to-back-at-the-same-track.mp4'), // 14.0s
  s19: F('19-his-o-reilly-series-debut-at-rockingham-.mp4'), // 14.0s — O'Reilly Series tracks
  s25: F('25-the-road-to-daytona-doesn-t-run-in-a-str.mp4'), // 10.8s — the closing bed
} as const;

/* 90-second vetted sections. */
export const POOL = {
  p02: P('pool-02.mp4'), // @dirtymomedia — The Dale Jr. Download
  p03: P('pool-03.mp4'), // @NASCAR — Cleetus talks Michigan (77.8s)
  p04: P('pool-04.mp4'), // @NASCAR — in-car, Nashville
  p18: P('pool-18.mp4'), // @NASCAR — Richard Childress Racing
  p21: P('pool-21.mp4'), // @NASCAR — Cleetus in the FOX booth
  p22: P('pool-22.mp4'), // Dale Jr on the Berlin crash
} as const;

export const BEDS: Record<number, Bed> = {
  // The actual Berlin spin. Framed normally; the REPLAY bug stays.
  1: {src: CLIPS.s01, startFrom: 0.05, span: 13.9, zoom: 1.12, driftX: 0.6, exposure: 0.95, saturate: 1.06},

  // pool-02 — Dale Jr. Scene 2 near the head, scene 23 half a minute later.
  2: {src: POOL.p02, startFrom: 2.0, span: 8.0, zoom: 1.12, offY: -1.5, exposure: 0.93},
  23: {src: POOL.p02, startFrom: 34.0, span: 12.8, zoom: 1.16, driftX: -1, exposure: 0.93, borrowed: true},

  // pool-03 — Cleetus on camera. Scene 3 near the head, scene 6 much later.
  3: {src: POOL.p03, startFrom: 2.0, span: 17.0, zoom: 1.13, driftX: 0.8, exposure: 0.92},
  6: {src: POOL.p03, startFrom: 42.0, span: 10.0, zoom: 1.17, driftY: 0.9, exposure: 0.93, borrowed: true},

  // pool-04 — in-car racing. Scene 4 near the head, scene 14 much later.
  4: {src: POOL.p04, startFrom: 2.0, span: 10.8, zoom: 1.14, driftX: -1.1, exposure: 0.94},
  14: {src: POOL.p04, startFrom: 40.0, span: 14.3, zoom: 1.16, driftX: 1.1, exposure: 0.93, borrowed: true},

  // pool-13.mp4 turned out to be a mislabelled download — a Cup Series Rookie of the Year
  // rules explainer with a burned-in caption track running under every shot, nothing to do with
  // Berlin or a Super Late Model. Deleted. Scene 13 takes an untouched span of pool-04 (real
  // in-car short-track racing, already vetted clean); scene 5 — "he spun" — takes an untouched
  // span of pool-18 that happens to show a car spinning in tyre smoke, also already vetted.
  13: {src: POOL.p04, startFrom: 14.0, span: 10.5, zoom: 1.14, driftX: 1, exposure: 0.94, borrowed: true},
  5: {src: POOL.p18, startFrom: 29.0, span: 7.8, zoom: 1.18, driftY: -0.9, exposure: 0.93, borrowed: true},

  7: {src: CLIPS.s07, startFrom: 0.05, span: 12.1, zoom: 1.13, driftY: -1, exposure: 0.93},
  8: {src: CLIPS.s08, startFrom: 0.05, span: 10.0, zoom: 1.12, offY: -2, exposure: 0.93},

  // pool-22 — Dale Jr on the crash. Scene 22 near the head, scene 9 much later.
  22: {src: POOL.p22, startFrom: 2.0, span: 20.4, zoom: 1.13, driftY: 0.9, exposure: 0.93},
  9: {src: POOL.p22, startFrom: 40.0, span: 20.7, zoom: 1.16, driftX: -1, exposure: 0.94, borrowed: true},

  10: {src: CLIPS.s10, startFrom: 0.05, span: 9.8, zoom: 1.14, driftX: -1.2, exposure: 0.93},
  11: {src: CLIPS.s11, startFrom: 0.05, span: 8.2, zoom: 1.13, driftY: 1, exposure: 0.93},
  12: {src: CLIPS.s12, startFrom: 0.05, span: 11.6, zoom: 1.13, offY: -1.5, exposure: 0.93},
  15: {src: CLIPS.s15, startFrom: 0.05, span: 8.8, zoom: 1.14, driftY: -1, exposure: 0.94},
  16: {src: CLIPS.s16, startFrom: 0.05, span: 7.6, zoom: 1.13, offY: -1, exposure: 0.93},
  17: {src: CLIPS.s17, startFrom: 0.05, span: 13.9, zoom: 1.15, driftX: 1.2, exposure: 0.93},

  // pool-18 — RCR. Scene 18 near the head, scene 19 three quarters of a minute later.
  18: {src: POOL.p18, startFrom: 2.0, span: 26.2, zoom: 1.14, driftX: 1, exposure: 0.93},

  // Scene 19's own clip was a schedule/track-list upload — every shot carried the round,
  // venue and date burned across it in large yellow type, which is the source's caption
  // layer, not broadcast furniture. Dropped, and no clean replacement existed for the line,
  // so it takes a distinct later moment of the vetted RCR section instead.
  19: {src: POOL.p18, startFrom: 48.0, span: 17.1, zoom: 1.16, driftY: -1, exposure: 0.93, borrowed: true},

  // pool-21 — Cleetus in the FOX booth. Scene 21 near the head, scene 24 later.
  21: {src: POOL.p21, startFrom: 2.0, span: 19.4, zoom: 1.13, driftX: 1.1, exposure: 0.94},
  24: {src: POOL.p21, startFrom: 45.0, span: 13.6, zoom: 1.17, driftX: -1.1, exposure: 0.94, borrowed: true},

  // Scene 20's own clip ("20-that-pattern-tells-you-something...") had a persistent red
  // "Subscribe" bug burned into every frame, start to end — not caught before because the
  // validator checks crop/bitrate/freeze, not for a small corner overlay. Deleted; the scene
  // takes a third, untouched span of pool-21's pack racing instead.
  20: {src: POOL.p21, startFrom: 60.0, span: 10.6, zoom: 1.15, driftX: -1.1, exposure: 0.93, borrowed: true},

  // pool-25 downloaded as an audio-only mp4 — no video stream at all, which is why it survived
  // every title and duration check and only surfaced when the CFR pass had no video to encode.
  // The closing scene takes its own fetched clip instead.
  25: {src: CLIPS.s25, startFrom: 0.05, span: 10.7, zoom: 1.1, driftY: -0.7, exposure: 0.92, saturate: 1.06},
};

export const bed = (n: number): Bed => BEDS[n];
