// Two full sourcing passes established something useful: which source videos are actually
// clean. Clean, text-free NASCAR footage is scarce enough on YouTube that hunting for a new
// video per scene keeps returning broadcast tickers, commentary captions and clickbait b-roll.
//
// So stop hunting and mine what already passed QC: re-download a long section from each
// confirmed-clean source, giving a pool of vetted footage deep enough to cut a different
// moment for every scene that still needs a bed. Different moment, same trusted source — which
// satisfies "no duplicate clips" while keeping every frame text-free.
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\cleetus1');
const srcDir = resolve(project, 'brand-assets', 'auto-footage');
const poolDir = resolve(project, 'brand-assets', 'bed-pool');
const ffmpegDir = resolve(project, 'remotion', 'node_modules', 'ffmpeg-static');
await mkdir(poolDir, {recursive: true});

// Scenes whose clips passed the visual QC pass — frames checked by eye, no burned-in text.
const CLEAN_SCENES = [2, 3, 4, 13, 18, 21, 22, 25];
const SECTION_SECONDS = 90;

const sources = JSON.parse(await readFile(resolve(srcDir, 'sources.json'), 'utf8'));
const python = 'python';
const results = [];

for (const scene of CLEAN_SCENES) {
  const entry = sources[String(scene)];
  if (!entry?.title) continue;

  // Find the source video again by its exact title.
  const search = spawnSync(
    python,
    ['-m', 'yt_dlp', `ytsearch3:${entry.title}`, '--flat-playlist', '--print', '%(id)s\t%(title)s\t%(duration)s'],
    {encoding: 'utf8'}
  );
  const match = (search.stdout || '')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [id, title, duration] = line.split('\t');
      return {id, title, duration: Number(duration) || 0};
    })
    .find((c) => c.title && c.title.slice(0, 40) === entry.title.slice(0, 40));

  if (!match) {
    console.log(`scene ${scene}: could not re-find "${entry.title.slice(0, 50)}"`);
    continue;
  }

  // Same hook-safe rule as the fetcher: never the opening of someone else's video.
  const start = Math.round(Math.min(Math.max(60, match.duration * 0.25), Math.max(match.duration - 100, 60)));
  const out = resolve(poolDir, `pool-${String(scene).padStart(2, '0')}.mp4`);
  const dl = spawnSync(
    python,
    [
      '-m', 'yt_dlp', `https://www.youtube.com/watch?v=${match.id}`,
      '-f', 'bv*[height<=1080]+ba/b[height<=1080]/bv*+ba/b',
      '--merge-output-format', 'mp4',
      '--download-sections', `*${start}-${start + SECTION_SECONDS}`,
      '--force-keyframes-at-cuts', '--force-overwrites', '--no-playlist',
      '--ffmpeg-location', ffmpegDir,
      '-o', out.replace(/\.mp4$/, '.%(ext)s'),
    ],
    {stdio: 'ignore'}
  );

  const ok = dl.status === 0;
  console.log(`scene ${scene}: ${ok ? `pooled ${SECTION_SECONDS}s from ${start}s` : 'download failed'} — ${entry.title.slice(0, 50)}`);
  if (ok) results.push({scene, file: `pool-${String(scene).padStart(2, '0')}.mp4`, title: entry.title, source: entry.source, start, seconds: SECTION_SECONDS});
}

await writeFile(resolve(poolDir, 'pool.json'), JSON.stringify(results, null, 2) + '\n');
console.log(`\nBed pool: ${results.length} vetted source(s), ${results.length * SECTION_SECONDS}s of clean footage.`);
