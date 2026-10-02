// Builds the footage-review bundle Studio reads: copies every fetched clip into the Remotion
// public folder and writes a manifest pairing each clip with the narration line it was fetched
// for and the channel it came from — so the review pass is "does this clip match this line?",
// not just "what did we download?".
import {mkdir, readdir, copyFile, readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\cleetus1');
const srcDir = resolve(project, 'brand-assets', 'auto-footage');
const publicDir = resolve(project, 'remotion', 'public', 'auto-footage');
const dataDir = resolve(project, 'remotion', 'src', 'data');
await mkdir(publicDir, {recursive: true});
await mkdir(dataDir, {recursive: true});

const transcript = JSON.parse(await readFile(resolve(project, 'transcript.json'), 'utf8'));
const sources = JSON.parse(await readFile(resolve(srcDir, 'sources.json'), 'utf8').catch(() => '{}'));

const files = (await readdir(srcDir).catch(() => []))
  .filter((f) => /\.(mp4|jpg|jpeg|png|webp)$/i.test(f) && !f.endsWith('.part'))
  .sort();

const entries = [];
for (const file of files) {
  await copyFile(resolve(srcDir, file), resolve(publicDir, file));
  const scene = Number(file.match(/^(\d+)-/)?.[1] || 0);
  const segment = transcript.segments[scene - 1];
  entries.push({
    file,
    scene,
    isImage: /\.(jpg|jpeg|png|webp)$/i.test(file),
    narration: segment?.text ?? '',
    source: sources[String(scene)]?.source ?? 'unknown',
    title: sources[String(scene)]?.title ?? null,
  });
}
entries.sort((a, b) => a.scene - b.scene);

const graphicScenes = Object.entries(sources)
  .filter(([, v]) => v.source === 'motion-graphic')
  .map(([k]) => Number(k))
  .sort((a, b) => a - b);

await writeFile(
  resolve(dataDir, 'review-manifest.json'),
  JSON.stringify({clips: entries, graphicScenes, totalScenes: transcript.segments.length}, null, 2) + '\n'
);
console.log(`Review bundle: ${entries.length} clip(s), ${graphicScenes.length} scene(s) on motion graphics.`);
