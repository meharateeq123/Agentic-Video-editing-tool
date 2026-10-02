// yt-dlp's --download-sections cuts leave an mp4 whose index doesn't line up with its frames:
// Remotion's compositor then fails outright with "No frame found at position ..." the moment a
// scene asks for a timestamp between keyframes. Re-encode every bed once, with a keyframe every
// second and no audio, so any timestamp is seekable and the render can't trip over the source.
import {readdir, rename, unlink, stat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve, join} from 'node:path';

const pub = resolve('D:\\flick\\output\\cleetus1\\remotion\\public');
const ffmpeg = resolve('D:\\flick\\output\\cleetus1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe');
const dirs = ['auto-footage', 'bed-pool', 'maps'];

let done = 0;
let failed = 0;
for (const d of dirs) {
  const dir = join(pub, d);
  const files = (await readdir(dir).catch(() => [])).filter((f) => f.endsWith('.mp4'));
  for (const f of files) {
    const src = join(dir, f);
    const tmp = join(dir, `__re_${f}`);
    const r = spawnSync(
      ffmpeg,
      [
        '-y', '-i', src,
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
        '-g', '30', '-keyint_min', '30', '-sc_threshold', '0',
        '-pix_fmt', 'yuv420p',
        '-an',
        '-movflags', '+faststart',
        tmp,
      ],
      {stdio: 'ignore'}
    );
    if (r.status === 0) {
      const info = await stat(tmp).catch(() => null);
      if (info && info.size > 0) {
        await unlink(src);
        await rename(tmp, src);
        done++;
        console.log(`ok   ${d}/${f}`);
        continue;
      }
    }
    await unlink(tmp).catch(() => {});
    failed++;
    console.log(`FAIL ${d}/${f}`);
  }
}
console.log(`\n${done} re-encoded, ${failed} failed.`);
