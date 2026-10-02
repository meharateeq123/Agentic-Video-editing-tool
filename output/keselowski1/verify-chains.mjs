// Checks the three rules the chains are supposed to satisfy, so a violation is caught here
// rather than in a two-hour render:
//   1. no link longer than 7s (210 frames)
//   2. each scene's links add up to exactly its mounted length
//   3. no two links anywhere in the film use overlapping ranges of the same source
import {readFileSync} from 'node:fs';

const FPS = 30;
const OVERLAP = 16;

const src = readFileSync('remotion/src/footage.ts', 'utf8');
const tl = readFileSync('remotion/src/timeline.ts', 'utf8');

const cuts = [...tl.matchAll(/\{n: (\d+), start: ([\d.]+), end: ([\d.]+)\}/g)].map((m) => ({
  n: +m[1],
  start: +m[2],
  end: +m[3],
}));
const mounted = (n) =>
  Math.round(cuts[n - 1].end * FPS) -
  Math.round(cuts[n - 1].start * FPS) +
  (n === cuts.length ? 0 : OVERLAP);

const files = Object.fromEntries(
  [...src.matchAll(/^const ([A-J]) = '([^']+)';$/gm)].map((m) => [m[1], m[2]]),
);

const body = src.slice(src.indexOf('export const CHAINS'));
const chains = {};
// The `\r?\n` matters: without it a one-line scene like `7: [L(...)],` matches non-greedily all
// the way to the *next* scene's closing bracket and swallows it whole.
for (const block of body.matchAll(/^  (\d+): \[\r?\n([\s\S]*?)^  \],$/gm)) {
  const n = +block[1];
  chains[n] = [...block[2].matchAll(/L\((\w), ([\d.]+), (\d+)/g)].map((m) => ({
    file: files[m[1]] ?? m[1],
    start: +m[2],
    frames: +m[3],
  }));
}
// the single-link scenes are written on one line
for (const one of body.matchAll(/^  (\d+): \[L\((\w), ([\d.]+), (\d+)/gm)) {
  chains[+one[1]] = [{file: files[one[2]] ?? one[2], start: +one[3], frames: +one[4]}];
}

let bad = 0;
const spans = [];

for (let n = 1; n <= cuts.length; n++) {
  const links = chains[n];
  if (!links || links.length === 0) {
    console.log(`SCENE ${n}: no links parsed`);
    bad++;
    continue;
  }
  const total = links.reduce((t, l) => t + l.frames, 0);
  const want = mounted(n);
  if (total !== want) {
    console.log(`SCENE ${n}: links total ${total} frames, scene is ${want}`);
    bad++;
  }
  for (const l of links) {
    if (l.frames > 210) {
      console.log(`SCENE ${n}: link ${l.file} is ${(l.frames / FPS).toFixed(2)}s — over 7s`);
      bad++;
    }
    spans.push({n, ...l, end: l.start + l.frames / FPS});
  }
}

for (let i = 0; i < spans.length; i++) {
  for (let j = i + 1; j < spans.length; j++) {
    const a = spans[i];
    const b = spans[j];
    if (a.file !== b.file) continue;
    if (a.start < b.end && b.start < a.end) {
      console.log(
        `OVERLAP ${a.file}: scene ${a.n} [${a.start}-${a.end.toFixed(2)}] and ` +
          `scene ${b.n} [${b.start}-${b.end.toFixed(2)}]`,
      );
      bad++;
    }
  }
}

const byFile = {};
for (const s of spans) byFile[s.file] = (byFile[s.file] ?? 0) + 1;

const longest = Math.max(...spans.map((s) => s.frames));
console.log(
  `\n${spans.length} links across ${Object.keys(chains).length} scenes\n` +
    `longest link ${(longest / FPS).toFixed(2)}s\n` +
    `total ${(spans.reduce((t, s) => t + s.frames, 0) / FPS).toFixed(2)}s\n` +
    Object.entries(byFile)
      .sort((a, b) => b[1] - a[1])
      .map(([f, c]) => `  ${c.toString().padStart(2)}x ${f}`)
      .join('\n'),
);
console.log(bad === 0 ? '\nALL CHECKS PASS' : `\n${bad} PROBLEM(S)`);
process.exit(bad === 0 ? 0 : 1);
