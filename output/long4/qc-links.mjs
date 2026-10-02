// Contact sheets of every link (first frame + a frame 1.2s in), labelled scene.link src@time.
// Usage: node qc-links.mjs <fromScene> <toScene>  ->  qc/links-<from>-<to>.jpg
import {readFileSync, mkdirSync, rmSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {join} from 'node:path';
import {tmpdir} from 'node:os';

const ff = 'D:\\flick\\output\\rainrule1\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const src = readFileSync('remotion/src/footage.ts', 'utf8');
const [from, to] = [Number(process.argv[2] ?? 1), Number(process.argv[3] ?? 28)];
const names = {};
for (const m of src.matchAll(/^const (\w+) = '([\w-]+\.mp4)';/gm)) names[m[1]] = m[2];
const chains = {};
let cur = null;
for (const line of src.split(/\r?\n/)) {
  const s = /^  (\d+): \[/.exec(line);
  if (s) { cur = Number(s[1]); chains[cur] = []; continue; }
  const l = /^    L\((\w+), ([\d.]+), (\d+)\),/.exec(line);
  if (l && cur) chains[cur].push({code: l[1], file: names[l[1]], t: Number(l[2]), f: Number(l[3])});
}
const tmp = join(tmpdir(), 'qclinks_' + Date.now());
mkdirSync(tmp);
let i = 0;
for (let n = from; n <= to; n++) {
  (chains[n] || []).forEach((l, k) => {
    for (const [tag, dt] of [['a', 0.15], ['b', Math.min(1.4, l.f / 30 - 0.2)]]) {
      i++;
      const t = (l.t + dt).toFixed(2);
      const lab = `${n}.${k + 1}${tag} ${l.code}@${t}`;
      try {
        execFileSync(ff, ['-y', '-loglevel', 'error', '-ss', t, '-i', `remotion/public/bed-pool/${l.file}`, '-frames:v', '1', '-vf',
          `scale=320:-1,drawtext=text='${lab}':x=4:y=4:fontsize=17:fontcolor=yellow:box=1:boxcolor=black@0.7`, join(tmp, `f${String(i).padStart(4, '0')}.jpg`)]);
      } catch (e) { console.log('fail', lab); }
    }
  });
}
const out = `qc/links-${from}-${to}.jpg`;
execFileSync(ff, ['-y', '-loglevel', 'error', '-framerate', '1', '-i', join(tmp, 'f%04d.jpg'), '-filter_complex', `tile=8x${Math.ceil(i / 8)}`, '-frames:v', '1', out]);
rmSync(tmp, {recursive: true, force: true});
console.log(out, i, 'frames');
