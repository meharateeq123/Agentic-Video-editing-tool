/**
 * Scene -> bed clip.
 *
 * Every scene has a bed and the bed plays for the whole scene, first frame to last. Broadcast
 * graphics that come with real race coverage — score tickers, standings panels, driver
 * lower-thirds, network bugs — are left alone and framed normally; they are part of the
 * footage. Excluded, and deleted at QC rather than merely avoided: another creator's burned-in
 * headlines, their talking-head show set, screen recordings of tweets, and anything off-domain.
 *
 * Two supplies feed the beds:
 *   - CLIPS: the eight per-scene clips that survived the full-duration QC pass.
 *   - POOL:  eight 90-second sections from those same vetted sources. Long enough that a scene
 *            can run at normal speed, and long enough for several scenes to take genuinely
 *            different moments of one section.
 *
 * `startFrom` is seconds into the source; `span` is how many seconds of it the scene consumes.
 * The bed derives its playback rate from `span`, so the clip covers the scene exactly and never
 * runs out or freezes. No two scenes ever play the same moment of the same source.
 */

export type Bed = {
  /** path under public/ */
  src: string;
  /** seconds into the source clip */
  startFrom: number;
  /** seconds of source this scene consumes (drives the playback rate) */
  span: number;
  /** overscan; only applied while the bed is blurred, so a sharp bed keeps its full frame */
  zoom?: number;
  /** shifts the image, in % of frame: negative x crops the LEFT edge, positive crops the right */
  offX?: number;
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

/* Per-scene clips — all eight passed frame-by-frame QC. */
export const CLIPS = {
  s01: F('01-john-hunter-nemechek-just-lost-his-nasca.mp4'), // @NASCARonFOX — FS1 race, ticker
  s03: F('03-on-september-2-legacy-motor-club-confirm.mp4'), // truck night race + victory lane
  s04: F('04-that-s-the-official-version-but-the-stor.mp4'), // @MMCS07 — pack racing
  s05: F('05-the-athletic-s-jordan-bianchi-first-brok.mp4'), // @dirtymomedia — studio
  s08: F('08-that-response-tells-you-a-lot-this-wasn-.mp4'), // SportsCenter desk
  s16: F('16-this-is-where-the-story-actually-gets-in.mp4'), // @NASCAR — grid / pit lane
  s19: F('19-that-s-what-makes-this-situation-differe.mp4'), // road course, marshals
  s25: F('25-for-john-hunter-nemechek-the-2027-silly-.mp4'), // FS2 truck practice
} as const;

/**
 * 90-second vetted sections. pool-02, 09, 18 and 24 were fetched and then deleted at QC:
 * a screen recording of tweets, two other creators' talking-head shows, and one whose every
 * frame carried a burned-in yellow headline.
 */
export const POOL = {
  p01: P('pool-01.mp4'), // FS1 Xfinity race — clean throughout
  p03: P('pool-03.mp4'), // FS1 truck night race — clean throughout
  p04: P('pool-04.mp4'), // crashes under caution — USABLE 9-80s ONLY (F1 ticker after 80s)
  p05: P('pool-05.mp4'), // NASCAR podcast studio — clean throughout
  p08: P('pool-08.mp4'), // SportsCenter studio — clean, kept as spare
  p16: P('pool-16.mp4'), // pre-race grid and pit lane — no on-screen graphics at all
  p19: P('pool-19.mp4'), // road course race 0-50s, interview 51-90s
  p25: P('pool-25.mp4'), // FS2 truck practice — clean throughout
} as const;

export const BEDS: Record<number, Bed> = {
  // --- scenes with their own clip -------------------------------------------------
  1: {src: CLIPS.s01, startFrom: 0.05, span: 11.5, zoom: 1.12, driftX: 0.6, exposure: 0.95, saturate: 1.06},
  3: {src: CLIPS.s03, startFrom: 0.05, span: 13.9, zoom: 1.13, driftX: 0.8, exposure: 0.93},
  4: {src: CLIPS.s04, startFrom: 0.05, span: 5.4, zoom: 1.12, driftY: -0.8, exposure: 0.94},
  5: {src: CLIPS.s05, startFrom: 0.05, span: 13.9, zoom: 1.12, offY: -1.5, exposure: 0.93},
  8: {src: CLIPS.s08, startFrom: 0.05, span: 10.7, zoom: 1.13, driftX: -1, exposure: 0.93},
  16: {src: CLIPS.s16, startFrom: 0.05, span: 10.1, zoom: 1.13, driftX: 1, exposure: 0.94},
  19: {src: CLIPS.s19, startFrom: 0.05, span: 12.2, zoom: 1.14, driftY: 0.9, exposure: 0.93},
  25: {src: CLIPS.s25, startFrom: 0.05, span: 9.8, zoom: 1.1, driftY: -0.7, exposure: 0.92, saturate: 1.06},

  // --- pool-01: FS1 Xfinity race ---------------------------------------------------
  2: {src: POOL.p01, startFrom: 2.0, span: 7.7, zoom: 1.12, driftX: 1, exposure: 0.94, borrowed: true},
  13: {src: POOL.p01, startFrom: 20.0, span: 21.4, zoom: 1.14, driftX: -1.1, exposure: 0.93, borrowed: true},
  21: {src: POOL.p01, startFrom: 50.0, span: 11.5, zoom: 1.13, driftY: 0.9, exposure: 0.93, borrowed: true},

  // --- pool-03: FS1 truck night race -----------------------------------------------
  9: {src: POOL.p03, startFrom: 2.0, span: 13.5, zoom: 1.13, driftX: 0.9, exposure: 0.93, borrowed: true},
  15: {src: POOL.p03, startFrom: 25.0, span: 29.8, zoom: 1.15, driftX: -1, exposure: 0.93, borrowed: true},
  20: {src: POOL.p03, startFrom: 60.0, span: 21.1, zoom: 1.14, driftY: -0.9, exposure: 0.93, borrowed: true},

  // --- pool-04: crashes under caution. Never past 80s — an F1 ticker runs after that.
  11: {src: POOL.p04, startFrom: 12.0, span: 20.3, zoom: 1.15, driftX: 1.1, exposure: 0.92, borrowed: true},

  // --- pool-05: podcast studio -----------------------------------------------------
  18: {src: POOL.p05, startFrom: 2.0, span: 10.7, zoom: 1.12, offY: -1.5, exposure: 0.93, borrowed: true},
  22: {src: POOL.p05, startFrom: 25.0, span: 12.9, zoom: 1.14, driftX: 0.9, exposure: 0.93, borrowed: true},

  // --- pool-16: pre-race grid and pit lane -----------------------------------------
  6: {src: POOL.p16, startFrom: 2.0, span: 18.3, zoom: 1.13, driftX: 1, exposure: 0.94, borrowed: true},
  12: {src: POOL.p16, startFrom: 28.0, span: 14.1, zoom: 1.14, driftY: 0.9, exposure: 0.93, borrowed: true},
  17: {src: POOL.p16, startFrom: 48.0, span: 24.8, zoom: 1.15, driftX: -1.1, exposure: 0.93, borrowed: true},
  24: {src: POOL.p16, startFrom: 75.0, span: 13.9, zoom: 1.13, driftX: 1.1, exposure: 0.93, borrowed: true},

  // --- pool-19: road course race up front, interview after 51s ---------------------
  7: {src: POOL.p19, startFrom: 55.0, span: 14.0, zoom: 1.12, offY: -1, exposure: 0.93, borrowed: true},
  23: {src: POOL.p19, startFrom: 2.0, span: 19.2, zoom: 1.14, driftX: 1, exposure: 0.93, borrowed: true},

  // --- pool-25: FS2 truck practice -------------------------------------------------
  10: {src: POOL.p25, startFrom: 2.0, span: 7.4, zoom: 1.13, driftX: -1, exposure: 0.94, borrowed: true},
  14: {src: POOL.p25, startFrom: 20.0, span: 8.2, zoom: 1.14, driftY: -0.9, exposure: 0.93, borrowed: true},
};

export const bed = (n: number): Bed => BEDS[n];
