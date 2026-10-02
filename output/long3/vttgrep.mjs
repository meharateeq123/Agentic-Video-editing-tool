// Flattens a YouTube auto-caption .vtt into "mm:ss  text" lines (rolling duplicates removed) and
// prints the ones matching a regex. Usage: node vttgrep.mjs <file.vtt> "<regex>" [context]
import {readFileSync} from 'node:fs';

const [file, pattern, ctxArg] = process.argv.slice(2);
const ctx = Number(ctxArg ?? 0);
const raw = readFileSync(file, 'utf8');
const cues = [];
let t = null;
for (const line of raw.split(/\r?\n/)) {
  const m = /^(\d+):(\d+):([\d.]+) -->/.exec(line);
  if (m) {
    t = +m[1] * 3600 + +m[2] * 60 + +m[3];
    continue;
  }
  if (t === null || !line.trim() || line.includes('<c>')) continue;
  const text = line.replace(/<[^>]+>/g, '').trim();
  if (!text || (cues.length && cues[cues.length - 1].text === text)) continue;
  cues.push({t, text});
}
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')} (${s.toFixed(1)}s)`;
const re = new RegExp(pattern, 'i');
const hits = new Set();
cues.forEach((c, i) => {
  if (re.test(c.text)) for (let j = Math.max(0, i - ctx); j <= Math.min(cues.length - 1, i + ctx); j++) hits.add(j);
});
[...hits].sort((a, b) => a - b).forEach((i) => console.log(`${fmt(cues[i].t)}  ${cues[i].text}`));
