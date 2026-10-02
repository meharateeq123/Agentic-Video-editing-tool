#!/usr/bin/env node
// Copies whatever has been downloaded so far into remotion/public/auto-footage/ and writes a
// manifest.json Studio's live-preview composition reads. Safe to re-run repeatedly while
// auto-footage.mjs is still downloading in the background — each run picks up new files.
import {mkdir, readdir, copyFile, writeFile, stat} from 'node:fs/promises';
import {resolve, extname} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined);
const project = resolve(valueAfter('--project') || 'flick-output');

const srcDir = resolve(project, 'brand-assets', 'auto-footage');
const destDir = resolve(project, 'remotion', 'public', 'auto-footage');
await mkdir(destDir, {recursive: true});

const files = (await readdir(srcDir).catch(() => []))
  .filter((f) => /\.(mp4|jpg|jpeg|png|webp)$/i.test(f) && !f.endsWith('.part'))
  .sort();

const manifest = [];
for (const file of files) {
  await copyFile(resolve(srcDir, file), resolve(destDir, file));
  const isImage = /\.(jpg|jpeg|png|webp)$/i.test(file);
  const match = file.match(/^(\d+)-(.+)\.\w+$/);
  manifest.push({
    file,
    scene: match ? Number(match[1]) : 0,
    label: match ? match[2].replace(/-/g, ' ') : file,
    isImage,
  });
}
manifest.sort((a, b) => a.scene - b.scene);

await writeFile(resolve(project, 'remotion', 'public', 'footage-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`Synced ${manifest.length} clip(s)/image(s) into remotion/public/auto-footage/ and wrote footage-manifest.json.`);
