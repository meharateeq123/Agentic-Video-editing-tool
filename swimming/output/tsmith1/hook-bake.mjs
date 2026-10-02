// Bakes the 15s cold-open cuts (picture, silent, 1920x1080) into remotion/public/bed-pool/hook-*.mp4 and
// writes hook-audio.json (the same ranges' REAL audio, cut by render.ps1 from ./dl) + remotion/src/hook.ts.
import {writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

const ROOT = 'D:/flick/swimming/output/tsmith1';
const FF = `${ROOT}/remotion/node_modules/ffmpeg-static/ffmpeg.exe`;
const POOL = `${ROOT}/remotion/public/bed-pool`;

// frames sum to 180 (6.0s). `at` = frame from the cut's start that a spoken word begins (Whisper word
// timestamps on the clip itself: 39.10 "I'm", 40.06 "peace", ... - see tr/*.json).
const CUTS = [
  {id: 'hook-a', src: 'paris-100br-inspires.mp4', from: 296.0, frames: 18, source: '@Olympics', crop: 'crop=iw*0.88:ih*0.88:0:ih*0.12'},
  {
    id: 'hook-b', src: 'cgtn-noregrets.mp4', from: 39.0, frames: 102, source: '@cgtnsportsscene',
    words: [['I’m', 3], ['really', 23], ['at', 28], ['peace.', 32, 1], ['I', 53], ['gave', 55], ['22', 59], ['years', 68], ['for', 83], ['the', 89], ['sport.', 92, 1]],
  },
  {
    id: 'hook-e', src: 'news24-retire.mp4', from: 93.0, frames: 60, source: '@News24Video', crop: 'crop=iw*0.75:ih*0.75:0:ih*0.25',
    words: [['now', 5], ['going', 11], ['to', 17], ['carry', 20], ['me', 28], ['into', 34], ['the', 43], ['next', 47], ['season.', 55, 1]],
  },
];
const total = CUTS.reduce((t, c) => t + c.frames, 0);
if (total !== 180) throw new Error('hook frames ' + total);

const audio = [];
for (const c of CUTS) {
  const dur = c.frames / 30;
  const vf = `${c.crop ? c.crop + ',' : ''}scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30`;
  const r = spawnSync(FF, ['-y', '-v', 'error', '-ss', String(c.from), '-t', String(dur + 0.3), '-i', `${ROOT}/dl/${c.src}`, '-vf', vf, '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', `${POOL}/${c.id}.mp4`], {encoding: 'utf8'});
  if (r.status !== 0) console.log('FAIL', c.id, r.stderr.slice(0, 200));
  audio.push({src: c.src, from: c.from, dur});
}
writeFileSync(`${ROOT}/hook-audio.json`, JSON.stringify(audio, null, 2));

const ts = `// The 6-second cold-open. Boxed montage on a blurred backdrop, cutting hard between real moments; every
// cut's SOUND is the clip's own real audio (laid by render.ps1 from hook-audio.json - ranges identical to
// the picture), never the narrator. Words are Tatjana's own, timed from Whisper word timestamps taken on
// the clips themselves. The last cut carries one suspense line, then hard cut to black and the film starts.
//
// Picture files are pre-cut (bake in hook-bake.mjs), so every cut plays from frame 0 of its own file.

export const HOOK_SECONDS = 6;
export const HOOK_FRAMES = HOOK_SECONDS * 30;

export type HookWord = {t: string; at: number; hot?: boolean};

export type HookCut = {
  file: string;
  frames: number;
  /** the uploading channel's real YouTube handle */
  source: string;
  words?: HookWord[];
};

export const HOOK_CUTS: HookCut[] = [
${CUTS.map((c) => {
  const w = c.words ? `, words: [${c.words.map(([t, at, hot]) => `{t: ${JSON.stringify(t)}, at: ${at}${hot ? ', hot: true' : ''}}`).join(', ')}]` : '';
  return `  {file: '${c.id}.mp4', frames: ${c.frames}, source: '${c.source}'${w}},`;
}).join('\n')}
];

/** Shown bottom-centre over the last cut, right before the hard cut to black. */
export const HOOK_SUSPENSE_LINE = 'She closed the door. A new race pulled her back.';
`;
writeFileSync(`${ROOT}/remotion/src/hook.ts`, ts);
console.log('hook baked, frames', total);



