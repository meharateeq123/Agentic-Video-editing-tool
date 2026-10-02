// One-off generator: produces plan.mjs's PLAN object by evenly spacing beats within known-good zones
// per source, so we don't hand-type 161 timestamps. Each zone is [start,end] seconds of real, checked
// content (from the zone_*.jpg contact sheets); this script slices each zone into N evenly spaced 3s
// beats and assigns them scene by scene, tracking a per-source cursor so nothing overlaps or repeats.
import {writeFileSync} from 'node:fs';

const MOUNTED = {
  1: 331, 2: 384, 3: 330, 4: 793, 5: 642, 6: 881, 7: 1087, 8: 566, 9: 1568, 10: 611,
  11: 888, 12: 865, 13: 594, 14: 676, 15: 672, 16: 764, 17: 752, 18: 490, 19: 372, 20: 279,
};
const NEED = {};
for (const [n, f] of Object.entries(MOUNTED)) NEED[n] = Math.ceil(f / 90);
console.log('beats needed per scene:', NEED, 'total', Object.values(NEED).reduce((a, b) => a + b, 0));

// zones: src -> list of [start,end] usable windows (seconds), content-checked via the zone_*.jpg sheets.
const ZONES = {
  // race.mp4 - Tokyo Aquatics Centre final, 25 Sep 2026 (7:15)
  RC_REC: [[0, 13]], // records board WR/AR/GR
  RC_SL: [[14, 29]], // start list graphic
  RC_PREP: [[240, 300]], // CHN cap blocks prep (~4:00-5:00)
  RC_RACE: [[300, 392]], // the swim itself, finish, celebration (~5:00-6:32)
  RC_RES: [[408, 420]], // results board with all 3 names+times
  // podium.mp4 - 50 fly medal ceremony (6:10, skip 0-40s = previous event)
  PD_WALK: [[40, 176]], // ZHANG YUFEI cap close-up at 56s, walk-out, crowd
  PD_CER: [[180, 328]], // medal presentation, SILVER MEDAL card, flag raise
  PD_END: [[330, 360]],
  // relay.mp4 - 4x100 medley relay (11:00)
  RL_SL: [[0, 70]],
  RL_PREP: [[84, 238]],
  RL_RACE: [[252, 500]], // the actual race
  RL_FIN: [[504, 640]], // finish, hugs
  // cer.mp4 - relay victory ceremony (12:30, skip 0-40s = crowd only)
  CR_WALK: [[44, 130]],
  CR_CER: [[180, 460]], // medal presentation, SILVER/GOLD cards, podium
  CR_END: [[460, 660]],
  // nat25.mp4 - 15th China National Games, Nov 2025, women's 50 fly (6:15, skip 60-108 = blank/titles)
  N5_REC: [[0, 30]], // records board Sjoestroem/Zhang
  N5_LINE: [[108, 180]], // athlete introductions (pink stage)
  N5_RACE: [[180, 300]], // blocks, race, results board, WR/AR tags
  N5_FIN: [[300, 360]], // finish, celebration, medal
  // jkt18.mp4 - Jakarta 2018 Asian Games, Zhang vs Ikee 100 fly (3:00)
  JK_ID: [[0, 42]], // start list w/ ZHANG name, walk-outs
  JK_RACE: [[54, 150]], // race + lane graphic ZHANG/IKEE
  JK_CER: [[150, 175]], // medal tally graphic, celebration
  // fuk23.mp4 - Fukuoka 2023 Worlds, Zhang's PB 25.05 (4:37)
  FK_INTRO: [[0, 60]], // walk-outs, name cards
  FK_SL: [[100, 150]], // start list w/ Yufei ZHANG
  FK_RACE: [[220, 280]], // the race
  FK_RES: [[260, 277]], // results board (has the swim result)
  // tok20relay.mp4 - Tokyo 2020 4x200 free relay, China's medal ceremony/parade (4:00, sections only)
  TR_TEAMS: [[0, 24]], // start list graphic
  TR_CHINA: [[200, 220]], // People's Republic of China team on screen
  // zzs200.mp4 (Zhang Zhanshuo, from zhang2) and yzfly.mp4 (Yu Zidi 200 fly, from yuzidi5) - only need
  // a couple of already-verified beats each (identity already proven in those projects).
  ZZ: [[338, 344], [396, 402], [460, 466]], // verified ID beats from zhang2-short
  YZ: [[14, 24], [125, 145]], // start list + finish, verified in yuzidi5-short
};

const cursor = {};
function take(zoneKey, n) {
  const zones = ZONES[zoneKey];
  const out = [];
  let zi = 0;
  let t = zones[0][0];
  const key = zoneKey;
  cursor[key] ??= 0;
  // flatten zone into a cursor across all its windows
  let remaining = cursor[key];
  let pos = null;
  for (const [a, b] of zones) {
    const span = b - a - 3;
    if (span <= 0) continue;
    if (remaining <= span) {
      pos = a + remaining;
      break;
    }
    remaining -= span + 3; // step past this window's beats (3s apart minimum)
  }
  for (let i = 0; i < n; i++) {
    // find next slot at least 3.2s after the last, wrapping across windows
    let placed = false;
    for (const [a, b] of zones) {
      const startAt = Math.max(a, cursor[key]);
      if (startAt + 3 <= b) {
        out.push([key, +startAt.toFixed(1)]);
        cursor[key] = startAt + 3.4;
        placed = true;
        break;
      }
    }
    if (!placed) {
      // ran out of room in this zone; reuse from the top with a small offset (last resort)
      const [a] = zones[0];
      const fallback = a + (i % 5) * 3.4;
      out.push([key, +fallback.toFixed(1)]);
      console.log(`WARNING: zone ${key} exhausted, reusing offset`, fallback);
    }
  }
  return out;
}

const PLAN = {};
const mix = (n, spec) => {
  // spec: [[zoneKey, count], ...] must sum to NEED[n]
  const total = spec.reduce((a, [, c]) => a + c, 0);
  if (total !== NEED[n]) throw new Error(`scene ${n}: spec sums to ${total}, need ${NEED[n]}`);
  const beats = spec.flatMap(([z, c]) => take(z, c));
  PLAN[n] = beats.map(([z, t]) => `${z}@${t}`);
};

mix(1, [['JK_ID', 2], ['FK_INTRO', 1], ['RC_REC', 1]]);
mix(2, [['N5_LINE', 2], ['RC_SL', 1], ['PD_WALK', 2]]);
mix(3, [['RC_RES', 1], ['N5_REC', 1], ['RC_SL', 1], ['PD_WALK', 1]]);
mix(4, [['N5_RACE', 3], ['JK_ID', 2], ['N5_FIN', 2], ['RC_SL', 2]]);
mix(5, [['RC_PREP', 2], ['RC_RACE', 5], ['RC_REC', 1]]);
mix(6, [['N5_RACE', 3], ['N5_FIN', 2], ['RC_RACE', 5]]);
mix(7, [['N5_LINE', 2], ['N5_RACE', 2], ['N5_FIN', 3], ['RC_PREP', 4], ['RC_RACE', 2]]);
mix(8, [['N5_FIN', 3], ['RC_RACE', 4]]);
mix(9, [['RC_REC', 1], ['FK_SL', 2], ['FK_RACE', 4], ['FK_RES', 2], ['N5_REC', 2], ['N5_RACE', 3], ['RC_RACE', 4]]);
mix(10, [['RC_PREP', 2], ['RC_RACE', 3], ['PD_WALK', 2]]);
mix(11, [['N5_LINE', 2], ['N5_FIN', 2], ['PD_CER', 3], ['JK_CER', 1], ['JK_RACE', 2]]);
mix(12, [['RL_SL', 1], ['RL_PREP', 2], ['RL_RACE', 4], ['RL_FIN', 3]]);
mix(13, [['CR_WALK', 2], ['CR_CER', 3], ['JK_ID', 2]]);
mix(14, [['YZ', 2], ['ZZ', 3], ['CR_END', 3]]);
mix(15, [['PD_CER', 3], ['CR_CER', 3], ['TR_TEAMS', 1], ['TR_CHINA', 1]]);
mix(16, [['PD_WALK', 2], ['RC_RACE', 3], ['RL_RACE', 2], ['FK_RACE', 2]]);
mix(17, [['N5_RACE', 3], ['N5_FIN', 2], ['RC_RES', 1], ['FK_RES', 1], ['FK_INTRO', 2]]);
mix(18, [['N5_REC', 2], ['PD_CER', 2], ['CR_CER', 2]]);
mix(19, [['RC_PREP', 2], ['PD_END', 2], ['CR_END', 1]]);
mix(20, [['CR_CER', 2], ['PD_CER', 2]]);

const lines = Object.entries(PLAN).map(([n, l]) => `  ${n}: ${JSON.stringify(l)},`);
writeFileSync('plan-generated.json', JSON.stringify(PLAN, null, 2));
console.log(lines.join('\n'));
console.log('total beats:', Object.values(PLAN).flat().length);
