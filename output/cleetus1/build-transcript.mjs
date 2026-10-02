import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\cleetus1');
const raw = await readFile(resolve(project, 'source-script.txt'), 'utf8');
const paragraphs = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

const WPS = 2.5; // ~150 wpm narration pace
const GAP = 0.3;
let t = 0;
const segments = paragraphs.map((text) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const dur = words / WPS;
  const start = t;
  const end = t + dur;
  t = end + GAP;
  return {start: Number(start.toFixed(2)), end: Number(end.toFixed(2)), text};
});

const transcript = {
  source: 'pasted-transcript',
  text: paragraphs.join('\n'),
  segments,
  words: [],
};

await writeFile(resolve(project, 'transcript.json'), JSON.stringify(transcript, null, 2) + '\n');
console.log(`Wrote ${segments.length} segments, total duration ~${t.toFixed(1)}s`);
