// node when.mjs "phrase one" "phrase two" ...  -> absolute VO time (s) of each phrase's first word,
// plus the scene it falls in and the scene-relative frame. Used to place beats/overlays on the exact word.
import {readFileSync} from 'node:fs';

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const vo = JSON.parse(readFileSync('vo-words.json', 'utf8').replace(/^﻿/, ''));
const words = vo.words.map((w) => ({k: norm(w.text), t0: w.startMs / 1000, t1: w.endMs / 1000, raw: w.text}));
const tl = readFileSync('remotion/src/timeline.ts', 'utf8');
const cuts = [...tl.matchAll(/\{n: (\d+), start: ([\d.]+), end: ([\d.]+)\}/g)].map((m) => ({n: +m[1], s: +m[2], e: +m[3]}));

for (const phrase of process.argv.slice(2)) {
  const ks = phrase.split(/\s+/).map(norm).filter(Boolean);
  let found = -1;
  for (let i = 0; i + ks.length <= words.length; i++) {
    if (ks.every((k, j) => words[i + j].k === k)) {
      found = i;
      break;
    }
  }
  if (found < 0) {
    console.log(`?? "${phrase}" not found`);
    continue;
  }
  const t = words[found].t0;
  const c = cuts.find((x) => t >= x.s && t < x.e) ?? cuts[cuts.length - 1];
  const rel = t - c.s;
  console.log(`"${phrase}"  t=${t.toFixed(2)}s  scene ${c.n} +${rel.toFixed(2)}s (frame ${Math.round(rel * 30)})  end=${words[found + ks.length - 1].t1.toFixed(2)}s`);
}
