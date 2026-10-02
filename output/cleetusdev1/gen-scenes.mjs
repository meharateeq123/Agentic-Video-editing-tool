import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\cleetusdev1');
const t = JSON.parse(await readFile(resolve(project, 'transcript.json'), 'utf8'));

const FPS = 30;
const startFrame = (n) => Math.round(t.segments[n - 1].start * FPS);
const endFrame = (n) => Math.round(t.segments[n - 1].end * FPS);
const frames = (n) => endFrame(n) - startFrame(n);

/** Scenes carrying a graphic are hand-authored; this script owns the rest. */
const HAND_WRITTEN = new Set([1, 2, 6, 8, 10, 11, 14, 17, 19]);

const AMPS = [0.1, 0.08, 0.12, 0.09, 0.11, 0.08, 0.13, 0.09, 0.1, 0.08];

let written = 0;
for (let n = 1; n <= 19; n++) {
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

console.log(`${written} footage-only scenes written; ${HAND_WRITTEN.size} graphic scenes hand-authored.`);
for (let n = 1; n <= 19; n++) {
  console.log(`  s${n}: ${frames(n)} frames (${(frames(n) / FPS).toFixed(2)}s)${HAND_WRITTEN.has(n) ? '   <- graphic' : ''}`);
}
