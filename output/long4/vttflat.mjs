// Flattens a vtt to plain text lines with start times, no dedup collapsing of word-level cues.
// Usage: node vttflat.mjs <file.vtt> <fromSec> <toSec>
import {readFileSync} from 'node:fs';
const [file, fromS, toS] = process.argv.slice(2);
const from = Number(fromS ?? 0), to = Number(toS ?? 1e9);
const raw = readFileSync(file, 'utf8');
let t = null;
for (const line of raw.split(/\r?\n/)) {
  const m = /^(\d+):(\d+):([\d.]+) --> (\d+):(\d+):([\d.]+)/.exec(line);
  if (m) { t = +m[1] * 3600 + +m[2] * 60 + +m[3]; continue; }
  if (t === null || !line.trim()) continue;
  if (t >= from && t <= to) {
    const text = line.replace(/<[^>]+>/g, '').trim();
    if (text) console.log(`${t.toFixed(2)}  ${text}`);
  }
}
