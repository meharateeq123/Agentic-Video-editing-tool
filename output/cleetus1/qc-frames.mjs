// Contact sheet for the visual QC pass. A title tells you nothing about how much text is
// burned into the picture, so pull real frames from every fetched clip and tile them into one
// image per batch — then the whole set can be eyeballed at once for burned-in captions, score
// bugs, watermarks, or a shot that is really a title card.
import {mkdir, readdir, readFile, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\cleetus1');
const srcDir = resolve(project, 'brand-assets', 'auto-footage');
const outDir = resolve(project, 'qc');
const ffmpeg = resolve(project, 'remotion', 'node_modules', 'ffmpeg-static', 'ffmpeg.exe');
await mkdir(outDir, {recursive: true});

const sources = JSON.parse(await readFile(resolve(srcDir, 'sources.json'), 'utf8').catch(() => '{}'));
const clips = (await readdir(srcDir)).filter((f) => f.endsWith('.mp4')).sort();

// Three frames per clip — start, middle, end — so a caption that only appears for part of the
// clip still gets caught.
const tiles = [];
for (const clip of clips) {
  const scene = Number(clip.match(/^(\d+)-/)?.[1] || 0);
  for (const [i, pos] of [1, 5, 10].entries()) {
    const out = resolve(outDir, `s${String(scene).padStart(2, '0')}-${i}.jpg`);
    const r = spawnSync(ffmpeg, ['-y', '-ss', String(pos), '-i', resolve(srcDir, clip), '-frames:v', '1', '-vf', 'scale=480:270:force_original_aspect_ratio=decrease,pad=480:270:(ow-iw)/2:(oh-ih)/2', out], {stdio: 'ignore'});
    if (r.status === 0) tiles.push({scene, file: out});
  }
}

// Tile them in batches so each sheet stays readable.
const perSheet = 6;
const sheets = [];
for (let i = 0; i < tiles.length; i += perSheet) {
  const batch = tiles.slice(i, i + perSheet);
  // Index by batch, not by successes — otherwise a failed batch makes the next one overwrite
  // the previous sheet and most of the set silently disappears.
  const sheet = resolve(outDir, `sheet-${Math.floor(i / perSheet) + 1}.jpg`);
  const args = ['-y'];
  for (const t of batch) args.push('-i', t.file);
  args.push('-filter_complex', `${batch.map((_, n) => `[${n}:v]`).join('')}xstack=inputs=${batch.length}:layout=${layoutFor(batch.length)}[v]`, '-map', '[v]', sheet);
  const r = spawnSync(ffmpeg, args, {stdio: 'ignore'});
  if (r.status === 0) sheets.push({sheet, scenes: [...new Set(batch.map((t) => t.scene))]});
}

function layoutFor(n) {
  const cols = 3;
  return Array.from({length: n}, (_, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    return `${c === 0 ? '0' : Array.from({length: c}, (_, k) => `w${k}`).join('+')}_${r === 0 ? '0' : Array.from({length: r}, (_, k) => `h${k * cols}`).join('+')}`;
  }).join('|');
}

await writeFile(
  resolve(outDir, 'index.json'),
  JSON.stringify({sheets: sheets.map((s) => ({sheet: s.sheet, scenes: s.scenes})), clips: clips.map((c) => ({clip: c, scene: Number(c.match(/^(\d+)-/)?.[1] || 0), source: sources[String(Number(c.match(/^(\d+)-/)?.[1] || 0))]?.source ?? '?', title: sources[String(Number(c.match(/^(\d+)-/)?.[1] || 0))]?.title ?? null}))}, null, 2) + '\n'
);

console.log(`${clips.length} clip(s) -> ${tiles.length} frames -> ${sheets.length} contact sheet(s) in ${outDir}`);
for (const s of sheets) console.log(`  ${s.sheet}  scenes ${s.scenes.join(', ')}`);
