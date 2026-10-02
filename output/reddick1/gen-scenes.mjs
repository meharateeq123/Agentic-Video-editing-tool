import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\reddick1');
const t = JSON.parse(await readFile(resolve(project, 'transcript.json'), 'utf8'));

const FPS = 30;
const startFrame = (n) => Math.round(t.segments[n - 1].start * FPS);
const endFrame = (n) => Math.round(t.segments[n - 1].end * FPS);
const frames = (n) => endFrame(n) - startFrame(n);

/** Hand-written scenes: the three motion graphics. */
const HAND_WRITTEN = new Set([3, 7, 11]);

const AMPS = [0.1, 0.08, 0.12, 0.09, 0.11, 0.08, 0.13, 0.09, 0.1, 0.08];

let written = 0;
for (let n = 1; n <= 21; n++) {
  if (HAND_WRITTEN.has(n)) continue;
  const pad = String(n).padStart(2, '0');
  const dur = frames(n);
  const amp = AMPS[(n - 1) % AMPS.length];
  const line = t.segments[n - 1].text.slice(0, 88).replace(/\*/g, '');

  const src = `import React from 'react';
import {SceneBed} from '../components/Bed';
import {bed} from '../footage';

export const S${pad}_DUR = ${dur}; // ${t.segments[n - 1].start.toFixed(2)} -> ${t.segments[n - 1].end.toFixed(2)}s

/**
 * Scene ${n} — "${line}${t.segments[n - 1].text.length > 88 ? '…' : ''}"
 *
 * The clip carries this line on its own: it runs sharp, first frame to last, with a slow camera
 * push and no overlay. Nothing is added that the narration does not ask for.
 */
export const Scene${pad}: React.FC = () => (
  <SceneBed {...bed(${n})} dur={S${pad}_DUR} wins={[]} amp={${amp}} />
);
`;

  await writeFile(resolve(project, 'remotion', 'src', 'scenes', `Scene${pad}.tsx`), src);
  written++;
}

console.log(`${written} footage-only scenes written; ${HAND_WRITTEN.size} graphic scenes left for hand authoring.`);
for (let n = 1; n <= 21; n++) {
  console.log(`  s${n}: ${frames(n)} frames${HAND_WRITTEN.has(n) ? '   <- graphic (hand-written)' : ''}`);
}
