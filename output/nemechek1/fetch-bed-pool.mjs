// Bed pool for the Nemechek film.
//
// Clean, text-free NASCAR footage is scarce enough that hunting a fresh video per scene keeps
// coming back empty (7 of 18 scenes found nothing on the first pass). So mine the sources that
// already passed: re-download a long section from each confirmed source, giving a pool deep
// enough to cut a different moment for every scene that still needs a bed — and for the six
// graphic scenes, which ride on a blurred bed rather than sitting on black.
//
// Every section is normalised to constant 30fps here, not later: a variable-frame-rate source
// fails the Remotion compositor at render time with "No frame found at position N", which is
// invisible until the render and reads as a corrupt file. And every section is checked for an
// actual video stream — an audio-only download passes every title and duration check and only
// surfaces when there is nothing to encode.
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {renameSync, statSync, unlinkSync} from 'node:fs';
import {resolve} from 'node:path';

const project = resolve('D:\\flick\\output\\nemechek1');
const srcDir = resolve(project, 'brand-assets', 'auto-footage');
const poolDir = resolve(project, 'brand-assets', 'bed-pool');
const ffmpegDir = resolve('D:\\flick\\output\\cleetus1\\remotion\\node_modules\\ffmpeg-static');
const ffmpeg = resolve(ffmpegDir, 'ffmpeg.exe');
await mkdir(poolDir, {recursive: true});

const SECTION_SECONDS = 90;
const python = 'python';

const sources = JSON.parse(await readFile(resolve(srcDir, 'sources.json'), 'utf8'));
const scenes = Object.keys(sources)
  .map(Number)
  .filter((n) => sources[String(n)]?.title)
  .sort((a, b) => a - b);

const results = [];

for (const scene of scenes) {
  const entry = sources[String(scene)];

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

  if (dl.status !== 0) {
    console.log(`scene ${scene}: download failed — ${entry.title.slice(0, 50)}`);
    continue;
  }

  // Must actually contain a picture.
  const probe = spawnSync(ffmpeg, ['-i', out, '-f', 'null', '-'], {encoding: 'utf8'});
  const probeText = `${probe.stdout || ''}${probe.stderr || ''}`;
  if (!/Stream #\d+:\d+.*: Video:/.test(probeText)) {
    console.log(`scene ${scene}: NO VIDEO STREAM (audio-only download) — discarded`);
    try {
      unlinkSync(out);
    } catch {
      // already gone
    }
    continue;
  }

  // Constant 30fps, keyframe every second, no audio.
  const tmp = out.replace(/\.mp4$/, '.__cfr.mp4');
  const cfr = spawnSync(
    ffmpeg,
    [
      '-y', '-i', out,
      '-r', '30', '-fps_mode', 'cfr',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
      '-g', '30', '-keyint_min', '30', '-sc_threshold', '0',
      '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart',
      tmp,
    ],
    {stdio: 'ignore'}
  );
  if (cfr.status === 0 && statSync(tmp).size > 0) {
    unlinkSync(out);
    renameSync(tmp, out);
  } else {
    try {
      unlinkSync(tmp);
    } catch {
      // never written
    }
    console.log(`scene ${scene}: CFR pass failed — kept original`);
  }

  console.log(`scene ${scene}: pooled ${SECTION_SECONDS}s from ${start}s — ${entry.title.slice(0, 50)}`);
  results.push({
    scene,
    file: `pool-${String(scene).padStart(2, '0')}.mp4`,
    title: entry.title,
    source: entry.source,
    start,
    seconds: SECTION_SECONDS,
  });
}

await writeFile(resolve(poolDir, 'pool.json'), JSON.stringify(results, null, 2) + '\n');
console.log(`\nBed pool: ${results.length} vetted source(s), ${results.length * SECTION_SECONDS}s of footage.`);
