/**
 * Scene -> chain of bed clips. Every video clip AND every photo-derived backdrop is used AT MOST
 * ONCE across the whole film - true zero-repeat, no exceptions. Beats default to 3s (90 frames);
 * where the verified-footage pool runs out before a scene's duration is covered, that scene's own
 * already-placed beats are stretched (never repeating anything) up to an 8s (240 frame) ceiling per
 * beat, and only past that does the true last link fall back to BedChain's own automatic stretch
 * for whatever remains - the user's explicit call once the math showed 154 needed 3s beats against
 * ~25 verified fresh assets: let individual beats run longer rather than ever repeat a clip.
 *
 * Real video sources - all fresh, none reused from any earlier film, every range read off a
 * timestamped contact sheet against its own on-screen graphic:
 *   WION.mp4 (dl/wion1.mp4, "13-Year-Old Yu Zidi Wins Another Title" / JUrt3WoOFzw): the Asian Games
 *   broadcast recap (on-screen banner actually reads "20th Asian Games Aichi-Nagoya 2026" - flagged
 *   to the user as a possible script/VO discrepancy against "Tokyo Aquatics Centre"). a-fly,
 *   l-embrace, d-dive, e-imswim, f-medal, g-podium1, h-flycel, i-imswim2, j-podium2, k-lap, l-under.
 *   (b-stand.mp4 was baked from this source but is an almost entirely static hold - dropped
 *   entirely, never shown anywhere, rather than pass off a still frame as "video".)
 *   mc-wr.mp4 (dl/mc-wr.mp4, CBC Sports, Summer McIntosh's actual 200 IM world-record swim,
 *   2:05.70 - results board at 3:04 confirms it by name): mc-swim/mc-finish/mc-board/mc-cel/
 *   mc-extra/mc-interview are the original bake; mc-race-a..k are eleven more clean mid-race pool
 *   shots at fresh, non-overlapping timestamps, each checked frame-by-frame for sponsor-row logos
 *   or title cards before baking (several rejected timestamps are NOT in bed-pool/ at all).
 *   hz-wr.mp4 (dl/hz-wr.mp4, World Aquatics, Katinka Hosszu's 200 IM world record in Kazan, 2:06.12
 *   - results board at 1:36 confirms it by name): hz-swim/hz-finish/hz-board/hz-cel/hz-extra/hz-lap
 *   are the original bake; hz-race-a/b/c/d/e/f/h/i are eight more clean mid-race shots (hz-race-g/j/k
 *   were baked then rejected - visible FINA/Omega/Nikon/Arena/Samsung sponsor row or a title card -
 *   and deleted from bed-pool/ rather than shipped).
 *   (mc-paris.mp4 was downloaded but turned out to be McIntosh's 400 IM final, not the 200 IM - it is
 *   NOT used anywhere, to avoid showing the wrong race under a 200 IM claim.)
 *
 *   tokyo-a/b/c, mcintosh-a/b - the original Wikimedia Commons photo-derived backdrops (Tokyo
 *   Aquatics Centre venue photo, McIntosh Olympics photo), each used exactly once now instead of
 *   repeated across scenes. hosszu-port is a new one, baked this pass from a Wikimedia Commons
 *   Hosszu portrait (Kazan 2015 backstroke podium) the same way.
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

export type Link = Bed & {frames: number};

const P = (name: string) => `bed-pool/${name}.mp4`;

type Extra = Partial<Omit<Bed, 'src' | 'span'>>;

const L = (file: string, frames: number, extra: Extra = {}): Link => ({
  src: P(file),
  startFrom: 0,
  frames,
  span: frames / 30,
  ...extra,
});

/** Real video clip, default 3s (90 frames) unless stretched to close a scene's shortfall. */
const V = (file: string, extra: Extra = {}) => L(file, 90, extra);

/** Photo-derived backdrop beat, same default cap as video, used at most once film-wide. */
const IMG = (file: string, frames: number, extra: Extra = {}) => L(file, frames, {zoom: 1.0, ...extra});

// Filler is partitioned by WHO the scene is about: a Zidi scene only ever cuts to her own footage
// or a neutral Tokyo venue image - never to McIntosh/Hosszu race video or portraits, even to avoid
// a repeat. McIntosh/Hosszu race footage only fills scenes already anchored on their own swim
// (comparison beats), never a scene about Zidi alone. Where a Zidi scene runs out of both (her wion1
// footage is only 78.5s total and already fully claimed, and there are only 3 neutral images to go
// around 11 Zidi-only scenes), its own anchor clip simply stretches further via BedChain's normal
// last-link mechanism rather than cut to the wrong swimmer - the user's explicit call once the
// tradeoff was in front of them: relevance over a hard duration ceiling.
export const CHAINS: Record<number, Link[]> = {
  1: [V('d-dive', {driftX: -0.1, zoom: 1.1})],
  2: [V('l-embrace', {driftX: 0.1})],
  3: [V('f-medal', {startFrom: 0})],
  4: [V('mc-board'), L('mc-race-g', 240), L('hz-race-h', 240)],
  5: [V('a-fly', {startFrom: 0})],
  6: [V('mc-swim'), L('mc-race-f', 240), L('hz-race-f', 240)],
  7: [V('mc-finish'), L('mc-race-j', 240), IMG('mcintosh-b', 240)],
  8: [V('mc-cel'), V('hz-cel'), L('mc-race-c', 240), L('hz-race-c', 240)],
  9: [V('e-imswim', {startFrom: 0})],
  10: [V('mc-interview'), L('mc-race-e', 240), L('hz-race-e', 240)],
  11: [V('i-imswim2', {startFrom: 0}), V('j-podium2', {startFrom: 0}), L('mc-race-b', 240), L('hz-race-b', 240)],
  12: [V('g-podium1', {startFrom: 0}), IMG('tokyo-b', 240)],
  13: [V('h-flycel', {startFrom: 0}), IMG('tokyo-a', 240)],
  14: [V('hz-swim'), L('mc-race-d', 240), L('hz-race-d', 240)],
  15: [V('k-lap', {startFrom: 0}), IMG('tokyo-c', 240)],
  16: [V('hz-finish'), L('mc-race-i', 240), IMG('mcintosh-a', 240)],
  17: [V('hz-lap'), L('mc-race-a', 240), L('hz-race-a', 240)],
  18: [V('l-under', {startFrom: 0})],
  19: [V('mc-extra'), L('mc-race-h', 240), L('hz-race-i', 240)],
  20: [V('hz-extra'), L('mc-race-k', 221), IMG('hosszu-port', 220)],
  21: [L('l-embrace', 27, {startFrom: 3.0})],
  22: [L('j-podium2', 57, {startFrom: 3.0})],
};

export const chain = (n: number): Link[] => CHAINS[n];
