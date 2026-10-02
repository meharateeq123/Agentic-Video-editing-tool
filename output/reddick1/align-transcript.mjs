import {spawnSync} from 'node:child_process';
import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\reddick1');
const vo = 'D:\\flick\\vo\\long.wav';
const ffmpeg = resolve('D:\\flick\\output\\nemechek1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe');

const paragraphs = (await readFile(resolve(project, 'source-script.txt'), 'utf8'))
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

const probe = spawnSync(ffmpeg, ['-i', vo, '-af', 'silencedetect=noise=-30dB:d=0.20', '-f', 'null', '-'], {encoding: 'utf8'});
const log = `${probe.stdout || ''}${probe.stderr || ''}`;

const durationMatch = log.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
const total = durationMatch
  ? Number(durationMatch[1]) * 3600 + Number(durationMatch[2]) * 60 + Number(durationMatch[3])
  : 0;
if (!total) throw new Error('Could not read voiceover duration.');

const silences = [];
const starts = [...log.matchAll(/silence_start:\s*([\d.]+)/g)].map((m) => Number(m[1]));
const ends = [...log.matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => Number(m[1]));
for (let i = 0; i < starts.length; i++) {
  const end = ends[i] ?? total;
  silences.push({start: starts[i], end, mid: (starts[i] + end) / 2, length: end - starts[i]});
}

const needed = paragraphs.length - 1;
const boundaries = silences
  .filter((s) => s.start > 0.5 && s.end < total - 0.5)
  .sort((a, b) => b.length - a.length)
  .slice(0, needed)
  .map((s) => s.mid)
  .sort((a, b) => a - b);

const words = paragraphs.map((p) => p.split(/\s+/).filter(Boolean).length);
const totalWords = words.reduce((a, b) => a + b, 0);
let cumulative = 0;
const proportional = words.slice(0, -1).map((w) => {
  cumulative += w;
  return (cumulative / totalWords) * total;
});

const cuts = proportional.map((target) => {
  let best = target;
  let bestGap = Infinity;
  for (const b of boundaries) {
    const gap = Math.abs(b - target);
    if (gap < bestGap) {
      bestGap = gap;
      best = b;
    }
  }
  return bestGap <= 3.5 ? best : target;
});

const segments = paragraphs.map((text, i) => {
  const start = i === 0 ? 0 : cuts[i - 1];
  const end = i === paragraphs.length - 1 ? total : cuts[i];
  return {start: Number(start.toFixed(2)), end: Number(end.toFixed(2)), text};
});

for (let i = 1; i < segments.length; i++) {
  if (segments[i].start < segments[i - 1].end) segments[i].start = segments[i - 1].end;
  if (segments[i].end <= segments[i].start) segments[i].end = Number((segments[i].start + 1).toFixed(2));
}

await writeFile(
  resolve(project, 'transcript.json'),
  JSON.stringify({source: 'vo-aligned', audio: vo, duration: total, text: paragraphs.join('\n'), segments, words: []}, null, 2) + '\n'
);

console.log(`VO ${total.toFixed(2)}s | ${silences.length} pauses found | ${boundaries.length}/${needed} used as paragraph breaks`);
for (const s of segments) console.log(`  ${s.start.toFixed(1)}-${s.end.toFixed(1)}s  ${s.text.slice(0, 58)}`);
