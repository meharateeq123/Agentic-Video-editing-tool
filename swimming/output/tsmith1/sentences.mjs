// Prints every sentence of the VO with its scene number and scene-relative time, so footage beats and
// overlays can be placed on the exact line. node sentences.mjs > sentences.txt
import {readFileSync} from 'node:fs';

const vo = JSON.parse(readFileSync('vo-words.json', 'utf8').replace(/^﻿/, ''));
const tl = readFileSync('remotion/src/timeline.ts', 'utf8');
const cuts = [...tl.matchAll(/\{n: (\d+), start: ([\d.]+), end: ([\d.]+)\}/g)].map((m) => ({n: +m[1], s: +m[2], e: +m[3]}));

const sents = [];
let cur = [];
for (const w of vo.words) {
  cur.push(w);
  if (/[.?!]["”']?$/.test(w.text.trim()) && !/^\d+\.?$/.test(w.text.trim())) {
    sents.push(cur);
    cur = [];
  }
}
if (cur.length) sents.push(cur);

let lastScene = 0;
for (const s of sents) {
  const t0 = s[0].startMs / 1000;
  const t1 = s[s.length - 1].endMs / 1000;
  const c = cuts.find((x) => t0 >= x.s - 0.05 && t0 < x.e) ?? cuts[cuts.length - 1];
  if (c.n !== lastScene) {
    console.log(`\n=== SCENE ${c.n}  ${c.s.toFixed(2)} -> ${c.e.toFixed(2)}  (${(c.e - c.s).toFixed(1)}s, ${Math.round((c.e - c.s) * 30) + 16}f mounted)`);
    lastScene = c.n;
  }
  console.log(`  [${(t0 - c.s).toFixed(1).padStart(5)} - ${(t1 - c.s).toFixed(1).padStart(5)}]  ${s.map((w) => w.text).join(' ').slice(0, 150)}`);
}
