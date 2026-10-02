// Builds remotion/public/hook-audio-mix.m4a - the hook's own real audio track, exactly HOOK_SECONDS
// (15.0s) long, mirroring HookOpen.tsx's RUN timeline segment-for-segment so picture and sound
// never drift. Chunks render --muted (see render.ps1), so this track has to exist standalone and
// gets concatenated onto the front of the VO at mux time, the same way larson1 did it with
// hook.mp4's own sound.
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const ffmpeg = require('./remotion/node_modules/ffmpeg-static');
const HA = 'remotion/public/hook-audio';

// Mirrors HookOpen.tsx's RUN array exactly: [file, startFrom(s), durFrames].
const RUN = [
  [`${HA}/hit-flash.mp4`, 0, 15],
  [`${HA}/hit-flash.mp4`, 2, 15],
  [`${HA}/victory-call.mp4`, 0, 15],
  [`${HA}/bristol-drone.mp4`, 0, 15],
  [`${HA}/victory-call.mp4`, 0, 120],
  [`${HA}/swagger.mp4`, 3, 150],
  [`${HA}/hit-flash.mp4`, 0, 15],
  [`${HA}/bristol-drone.mp4`, 2, 105],
];

const inputs = [];
const filters = [];
RUN.forEach(([file, startFrom, frames], i) => {
  const dur = frames / 30;
  inputs.push('-i', file);
  filters.push(
    `[${i}:a]atrim=${startFrom}:${startFrom + dur},asetpts=PTS-STARTPTS,aresample=48000,` +
      `aformat=sample_fmts=fltp:channel_layouts=stereo[a${i}]`
  );
});

// Riser underscore under the closing beat only (frames 345-450 = 11.5s-15.0s), ramping to 0.3
// over its first 20 frames (0.667s) exactly like HookOpen.tsx's Audio volume callback.
const riserIdx = RUN.length;
inputs.push('-i', 'remotion/public/sfx/riser.mp3');
filters.push(
  `[${riserIdx}:a]atrim=0:3.5,asetpts=PTS-STARTPTS,` +
    `volume='min(0.3,(t/0.667)*0.3)':eval=frame,adelay=11500|11500,aresample=48000,` +
    `aformat=sample_fmts=fltp:channel_layouts=stereo[riser]`
);

const concatIn = RUN.map((_, i) => `[a${i}]`).join('');
filters.push(`${concatIn}concat=n=${RUN.length}:v=0:a=1[real]`);
filters.push(`[real][riser]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[out]`);

const args = [
  '-y', '-loglevel', 'error',
  ...inputs,
  '-filter_complex', filters.join(';'),
  '-map', '[out]',
  '-t', '15.0',
  '-c:a', 'aac', '-b:a', '192k',
  'remotion/public/hook-audio-mix.m4a',
];

const res = spawnSync(ffmpeg, args, {stdio: 'inherit'});
if (res.status !== 0) {
  console.error('FAILED building hook-audio-mix.m4a');
  process.exit(1);
}
console.log('Wrote remotion/public/hook-audio-mix.m4a');
