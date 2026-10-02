// Generates plan-generated.json. Two rules the first pass violated (per user feedback):
//   1. Never place 2+ consecutive beats from the same zone in a scene - even non-overlapping
//      timestamps from a single fixed-camera broadcast read as "the same clip" back to back.
//      Every multi-zone scene below is interleaved round-robin.
//   2. wion2g.mp4 / im400_wion.mp4 (YZI/YZM) turned out to be a WION photo-montage package, not
//      real broadcast video - checked frame-by-frame, almost every timestamp used was a static,
//      pillarboxed news photo with a blur pad, not motion footage. Dropped entirely. The only
//      other source of real Yu Zidi motion (fly_full.mp4) has a hard ceiling of ~170s to draw
//      from, so it's now used only in the scenes most directly about her; the rest lean on
//      Summer McIntosh's abundant clean broadcast footage, which is still on-topic since most of
//      those scenes are the comparison/context beats.
import {writeFileSync} from 'node:fs';

const ZONES = {
  YZF: [5, 177],    // fly_full.mp4 - Yu Zidi 200 fly, Asian Games (CCTV5, crop top 18%)
  YZH: [0, 12],     // cgtn_hist.mp4 - Yu Zidi post-race interview, Asian Games
  SMF: [10, 225],   // mac_200fly_wr.mp4 - McIntosh 200 fly WR, Canadian trials (CBC, crop top 20%)
  SMI: [10, 272],   // mac_400im_wa.mp4 - McIntosh 400 IM WR context, Budapest 2024 (World Aquatics)
  SMY: [10, 340],   // mac_yiting_200im_panpac.mp4 - McIntosh + Yu Yiting 200 IM, Pan Pacs 2026 (USA Swimming)
  SMR: [10, 442],   // mac_400free_wr.mp4 - McIntosh 400 free, Canadian trials (CBC, crop top 20%)
  SMB: [5, 240],    // mac_bowman.mp4 - McIntosh + Bob Bowman (CBC, crop top 20%)
};

// Per-zone step, chosen so every beat that zone supplies across the WHOLE film lands far enough
// apart to show a genuinely different moment (start/turn/finish/interview beat), not a near-repeat.
// YZF's step dropped from 7.7 to 4.7: scenes 3 and 4 turned out to need real Yu Zidi footage for
// EVERY beat (they're both about her alone, before McIntosh is even named - using McIntosh footage
// there was a relevance bug, not a variety fix), and fly_full.mp4's ~170s span can't support that
// extra demand at the wider spacing. 4.7s is still a real improvement on the original 3.4s.
const STEP = {YZF: 4.7, YZH: 4, SMF: 8.6, SMI: 8.2, SMY: 9.2, SMR: 13.9, SMB: 11.75};

const cursor = {};
for (const k of Object.keys(ZONES)) cursor[k] = ZONES[k][0];

function takeOne(zoneKey) {
  const [, end] = ZONES[zoneKey];
  const t = +cursor[zoneKey].toFixed(1);
  if (t + 3 > end) throw new Error(`zone ${zoneKey} exhausted (t=${t}, end=${end})`);
  cursor[zoneKey] += STEP[zoneKey];
  return `${zoneKey}@${t}`;
}

/** Interleaves zone picks round-robin so no two consecutive beats share a zone: [[zone,count],...] */
function mix(pairs) {
  const queues = pairs.map(([zone, n]) => ({zone, left: n}));
  const out = [];
  let guard = 0;
  while (queues.some((q) => q.left > 0)) {
    for (const q of queues) {
      if (q.left > 0) {
        out.push(takeOne(q.zone));
        q.left--;
      }
    }
    if (++guard > 100) throw new Error('mix() runaway');
  }
  return out;
}

const PLAN = {
  1: mix([['YZF', 3], ['SMF', 3]]),
  2: mix([['YZF', 5]]),
  // Scenes 3 and 4 are entirely about Yu Zidi (McIntosh isn't named yet) - real Yu Zidi footage
  // only, even though that means a single-zone run here (accepted trade-off: relevance over the
  // interleave-for-variety rule, since the alternative was showing an unintroduced swimmer).
  3: mix([['YZF', 8]]),
  4: mix([['YZF', 9]]),
  // Scene 5 opens on Yu Zidi's own swim ("Yu swam 2:06.10...") before naming McIntosh partway
  // through - needs her in the mix too, not McIntosh-only from frame 0.
  5: mix([['YZF', 2], ['SMY', 2], ['SMF', 2]]),
  6: mix([['SMF', 4], ['SMI', 4], ['SMR', 4]]),
  7: mix([['SMY', 5]]),
  8: mix([['YZF', 2], ['SMY', 7]]),
  9: mix([['SMI', 4], ['SMF', 4], ['SMR', 3]]),
  10: mix([['SMY', 5], ['SMR', 4]]),
  11: mix([['SMF', 2], ['SMI', 2], ['SMY', 2], ['SMR', 2]]),
  12: mix([['SMI', 12]]),
  13: mix([['SMR', 6], ['SMB', 5]]),
  14: mix([['SMB', 10]]),
  15: mix([['YZH', 3], ['YZF', 2], ['SMY', 4]]),
  16: mix([['SMR', 5], ['SMY', 5]]),
  17: mix([['SMF', 5], ['SMI', 5]]),
  18: mix([['SMY', 5], ['SMR', 4]]),
  19: mix([['SMR', 3], ['SMB', 3]]),
  20: mix([['SMB', 2], ['YZF', 2]]),
};

let total = 0;
for (const [n, list] of Object.entries(PLAN)) total += list.length;
console.log('total beats:', total);
for (const [n, list] of Object.entries(PLAN)) console.log(n, list.length, list.join(' '));

writeFileSync('plan-generated.json', JSON.stringify(PLAN, null, 2));
