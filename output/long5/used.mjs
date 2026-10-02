import {readFileSync} from 'node:fs';
const out = {};
for (const p of ['long3', 'long4']) {
  const src = readFileSync(`D:/flick/output/${p}/remotion/src/footage.ts`, 'utf8');
  const codes = {};
  for (const m of src.matchAll(/^const (\w+) = '([\w.-]+\.mp4)';/gm)) codes[m[1]] = m[2];
  for (const m of src.matchAll(/L\((\w+), ([\d.]+), (\d+)\)/g)) {
    const f = codes[m[1]];
    if (!f) continue;
    (out[`${p}:${f}`] ??= []).push([+m[2], +(+m[2] + +m[3] / 30).toFixed(1)]);
  }
}
for (const [k, v] of Object.entries(out)) {
  v.sort((a, b) => a[0] - b[0]);
  // merge
  const merged = [];
  for (const [a, b] of v) { const l = merged[merged.length - 1]; if (l && a <= l[1] + 0.5) l[1] = Math.max(l[1], b); else merged.push([a, b]); }
  console.log(k.padEnd(20), merged.map(([a, b]) => `${a}-${b}`).join('  '));
}
