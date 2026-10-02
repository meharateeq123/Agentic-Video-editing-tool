/**
 * Scene -> bed clips. All primary footage is real Ayden Tan race/behind-the-scenes video the
 * user supplied directly (Downloads/.../extra clips) — the actual subject of the film, not
 * sourced footage standing in for him.
 *
 * Hard rule: no single clip is ever held longer than 5 seconds. Every scene is generated as a
 * sequence of short (<=5s) disjoint-offset cuts, cycling round-robin through the real source
 * pool below so the same clip isn't reused back-to-back and every offset is unique across the
 * whole film — nothing repeats.
 *
 * Two named record-holders get a real full-frame cutaway instead of a small card, per the
 * project's "full-frame image when a person is named" rule: Thomas Heilman (heilman-raw.mp4,
 * USA Swimming) and Ronald Dalmacio (dalmacio-raw.mp4, his own team channel) — each placed as the
 * final cut of their scene. No real footage of Richard Poplawski could be found — his beat uses
 * Ayden's own footage instead of showing an unverified/wrong person.
 *
 * (The multi-swimmer "DESTROYING National Records" compilation was dropped entirely after QC —
 * see the earlier fix: it wasn't Ayden-exclusive and one offset was a plain black title card
 * about a different swimmer.)
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

const IM200 = {path: P('11 Year Old Boys 200 IM.mp4'), dur: 264};
const FREE400 = {path: P('400 LCM freestyle.mp4'), dur: 268.8};
const BUTTERFLY = {path: P('11 Year Old Boys 100 Butterfly.mp4'), dur: 142};
const FLY100 = {path: P('100 LCM fly.mp4'), dur: 63.6};
const FREE200 = {path: P('200 SCY free.mp4'), dur: 111.36};
const BACK100 = {path: P('100 LCM back.mp4'), dur: 70.31};
const BROTHERS = {path: P('Brothers Ayden Tan and Zach Tan Race 50M Backstroke.mp4'), dur: 70.03};
const PHOTOSHOOT = {path: P('PHOTOSHOOT DAY!!!.mp4'), dur: 286};
const FREE50P = {path: P('SNS LCM Junior Olympics Ayden Tan 50 Meter Freestyle Prelim.mp4'), dur: 60};
const BREAST50P = {path: P('SNS LCM Junior Olympics Ayden Tan 50 Meter Breast Prelim.mp4'), dur: 61};

const HEILMAN = P('named/heilman-raw.mp4');
const DALMACIO = P('named/dalmacio-raw.mp4');

const POOL = [IM200, FREE400, BUTTERFLY, FLY100, FREE200, BACK100, BROTHERS, PHOTOSHOOT, FREE50P, BREAST50P];

// Per-clip cursor, advanced every time a span is taken — guarantees every offset used across the
// whole 22-scene film is unique, never repeating the same seconds of the same clip twice.
const cursor = POOL.map(() => 2);
let poolIdx = 0;

const MAX_SPAN = 5; // seconds — the hard cap

function nextBed(span: number, driftSign: number): Bed {
  for (let tries = 0; tries < POOL.length; tries++) {
    const i = poolIdx % POOL.length;
    poolIdx++;
    const clip = POOL[i];
    if (cursor[i] + span + 1.5 <= clip.dur) {
      const startFrom = cursor[i];
      cursor[i] += span + 1.5;
      return {src: clip.path, startFrom, span, driftX: driftSign * 0.7, zoom: 1.12};
    }
  }
  // Pool exhausted (shouldn't happen at this film length) — wrap the largest clip.
  cursor[7] = 2;
  return {src: PHOTOSHOOT.path, startFrom: 2, span, driftX: driftSign * 0.7, zoom: 1.12};
}

/** Builds N disjoint <=5s cuts covering a scene of `frames` length at 30fps. */
function beds(frames: number): Bed[] {
  const totalSec = frames / 30;
  const n = Math.max(1, Math.ceil(totalSec / MAX_SPAN));
  const span = totalSec / n;
  return Array.from({length: n}, (_, i) => nextBed(Math.min(span, MAX_SPAN), i % 2 === 0 ? 1 : -1));
}

/** Same as `beds`, but the final cut is a named person's own real clip instead of Ayden's. */
function bedsWithNamedClose(frames: number, namedSrc: string): Bed[] {
  const base = beds(frames);
  const last = base[base.length - 1];
  base[base.length - 1] = {src: namedSrc, startFrom: 3, span: last.span, driftX: -0.6, zoom: 1.1};
  return base;
}

// Scene frame lengths, from each Scene0N.tsx's S0N_DUR.
export const BEDS: Record<number, Bed[]> = {
  1: beds(237),
  2: beds(488),
  3: beds(472),
  4: beds(337),
  5: beds(837),
  6: bedsWithNamedClose(883, HEILMAN),
  7: bedsWithNamedClose(923, DALMACIO),
  8: beds(485),
  9: beds(721),
  10: beds(298),
  11: beds(580),
  12: beds(568),
  13: beds(263),
  14: beds(926),
  15: beds(914),
  16: beds(575),
  17: beds(878),
  18: beds(473),
  19: beds(746),
  20: beds(782),
  21: beds(870),
  22: beds(664),
};
