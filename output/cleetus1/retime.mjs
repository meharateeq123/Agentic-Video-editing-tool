// The voiceover was replaced (335.64s -> 291.96s), so every timing baked into the build is
// stale. transcript.json has already been re-aligned to the new track by pause detection; this
// propagates those timings into the code: the CUTS table, each scene's duration constant, and
// each scene's overlay windows — scaled in proportion so an overlay still lands on the words it
// was written for and never runs past the end of a scene that just got shorter.
import {readFile, writeFile, readdir} from 'node:fs/promises';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\cleetus1');
const src = resolve(project, 'remotion', 'src');
const FPS = 30;

const transcript = JSON.parse(await readFile(resolve(project, 'transcript.json'), 'utf8'));
const segs = transcript.segments;
const total = transcript.duration;

// --- timeline.ts -------------------------------------------------------------
const tlPath = resolve(src, 'timeline.ts');
let tl = await readFile(tlPath, 'utf8');

const cuts = segs
  .map((s, i) => `  {n: ${i + 1}, start: ${s.start}, end: ${s.end}},`)
  .join('\n');

tl = tl.replace(/export const FILM_SECONDS = [\d.]+;/, `export const FILM_SECONDS = ${total};`);
tl = tl.replace(/export const CUTS: Cut\[\] = \[[\s\S]*?\n\];/, `export const CUTS: Cut[] = [\n${cuts}\n];`);
await writeFile(tlPath, tl);
console.log(`timeline.ts: FILM_SECONDS ${total}s, ${segs.length} cuts`);

// --- per-scene duration + overlay windows -----------------------------------
const frames = (n) =>
  Math.round(segs[n - 1].end * FPS) - Math.round(segs[n - 1].start * FPS);

const files = (await readdir(resolve(src, 'scenes'))).filter((f) => /^Scene\d\d\.tsx$/.test(f));
for (const file of files.sort()) {
  const n = Number(file.match(/Scene(\d\d)/)[1]);
  const p = resolve(src, 'scenes', file);
  let code = await readFile(p, 'utf8');

  const oldDur = Number(code.match(/export const S\d\d_DUR = (\d+)/)?.[1]);
  const newDur = frames(n);
  if (!oldDur || !newDur) continue;

  code = code.replace(/(export const S\d\d_DUR = )\d+/, `$1${newDur}`);

  // Windows are [in-start, in-end, out-start, out-end] in frames. Scale them by how much the
  // scene changed, then clamp so the tail of the window still fits inside the new duration.
  const k = newDur / oldDur;
  code = code.replace(/(const W\w*: Win = \[)([^\]]+)(\])/g, (_m, a, nums, b) => {
    const scaled = nums
      .split(',')
      .map((v) => Math.max(0, Math.round(Number(v.trim()) * k)));
    const last = Math.min(scaled[scaled.length - 1], newDur - 4);
    const span = scaled[3] - scaled[0];
    if (scaled[3] > last) {
      const shift = scaled[3] - last;
      for (let i = 0; i < scaled.length; i++) scaled[i] = Math.max(0, scaled[i] - shift);
    }
    void span;
    return a + scaled.join(', ') + b;
  });

  await writeFile(p, code);
  console.log(`${file}: ${oldDur} -> ${newDur} frames (x${k.toFixed(3)})`);
}
