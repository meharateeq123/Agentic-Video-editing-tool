// The nineteen footage-only scenes are structurally identical — a bed, its own length, and a
// camera amplitude — so they are generated rather than hand-copied twenty-five times, which is
// how a wrong duration or a wrong bed number sneaks in. The six graphic scenes are written by
// hand and are not touched here.
import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\nemechek1');
const t = JSON.parse(await readFile(resolve(project, 'transcript.json'), 'utf8'));

const FPS = 30;
const startFrame = (n) => Math.round(t.segments[n - 1].start * FPS);
const endFrame = (n) => Math.round(t.segments[n - 1].end * FPS);
const frames = (n) => endFrame(n) - startFrame(n);

/** Hand-written scenes: the six motion graphics. */
const HAND_WRITTEN = new Set([6, 11, 13, 15, 17, 20]);

// Camera amplitude per scene, varied so no two consecutive scenes push in by the same amount.
const AMPS = [0.11, 0.09, 0.13, 0.1, 0.12, 0.09, 0.14, 0.1];

let written = 0;
for (let n = 1; n <= 25; n++) {
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
for (let n = 1; n <= 25; n++) {
  console.log(`  s${n}: ${frames(n)} frames${HAND_WRITTEN.has(n) ? '   <- graphic (hand-written)' : ''}`);
}
