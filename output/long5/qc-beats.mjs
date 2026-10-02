import {readFileSync, mkdirSync, rmSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const ff = 'D:\\flick\\output\\long2\\remotion\\node_modules\\ffmpeg-static\\ffmpeg.exe';
const src = readFileSync('remotion/src/footage.ts', 'utf8');
const [from, to] = [Number(process.argv[2] ?? 1), Number(process.argv[3] ?? 22)];
const chains = {}; let cur = null;
for (const line of src.split(/\r?\n/)) {
  const s = /^  (\d+): \[/.exec(line); if (s) { cur = +s[1]; chains[cur] = []; continue; }
  const l = /^    L\((\w+), ([\d.]+), (\d+)\),/.exec(line); if (l && cur) chains[cur].push({k: l[1], t: +l[2], f: +l[3]});
}
const tmp = join(tmpdir(), 'qc5_' + Date.now()); mkdirSync(tmp);
let i = 0;
for (let n = from; n <= to; n++) (chains[n] || []).forEach((l, j) => {
  for (const [tag, dt] of [['a', 0.3], ['b', Math.min(2.2, l.f / 30 - 0.2)]]) {
    i++;
    const t = (l.t + dt).toFixed(2);
    const lab = `${n}.${j + 1}${tag} ${l.k}@${t}`;
    try { execFileSync(ff, ['-y', '-loglevel', 'error', '-ss', t, '-i', `remotion/public/bed-pool/${l.k.toLowerCase()}.mp4`, '-frames:v', '1', '-vf', `scale=320:-1,drawtext=text='${lab}':x=4:y=4:fontsize=16:fontcolor=yellow:box=1:boxcolor=black@0.7`, join(tmp, `f${String(i).padStart(4, '0')}.jpg`)], {stdio: 'ignore'}); } catch (e) { console.log('fail', lab); }
  }
});
execFileSync(ff, ['-y', '-loglevel', 'error', '-framerate', '1', '-i', join(tmp, 'f%04d.jpg'), '-filter_complex', `tile=8x${Math.ceil(i / 8)}`, '-frames:v', '1', `qc/beats-${from}-${to}.jpg`], {stdio: 'ignore'});
rmSync(tmp, {recursive: true, force: true});
console.log('frames', i);
