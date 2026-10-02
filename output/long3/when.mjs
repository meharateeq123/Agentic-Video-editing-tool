// Finds when a phrase is spoken. Prints absolute VO time plus the scene it falls in and the
// scene-local frame, so overlay windows come from the recording, not estimates.
// Usage: node when.mjs "seven second" ["another phrase" ...]
import {readFileSync} from 'node:fs';

const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, '');
const words = JSON.parse(readFileSync('vo/words.json', 'utf8'));
const cuts = JSON.parse(readFileSync('cuts.json', 'utf8'));

for (const phrase of process.argv.slice(2)) {
  const q = phrase.split(/\s+/).map(norm).filter(Boolean);
  let found = 0;
  for (let i = 0; i + q.length <= words.length; i++) {
    if (!q.every((w, k) => words[i + k].w === w)) continue;
    const t0 = words[i].start, t1 = words[i + q.length - 1].end;
    const c = cuts.find((c) => t0 >= c.start && t0 < c.end);
    const f0 = Math.round((t0 - c.start) * 30), f1 = Math.round((t1 - c.start) * 30);
    console.log(`"${phrase}"  ${t0.toFixed(2)}-${t1.toFixed(2)}s  scene ${c.n}  local f${f0}-f${f1}`);
    found++;
  }
  if (!found) console.log(`"${phrase}"  NOT FOUND`);
}

