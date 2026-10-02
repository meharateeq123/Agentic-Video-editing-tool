// Builds qc/sceneNN_links.jpg: one frame from the middle of every bed link in footage.ts, so a
// scene's picture can be checked against its line without rendering.
//   node qc-links.cjs 3 11 13      (no args = every scene)
const fs = require('fs');
const {execFileSync} = require('child_process');

const ff = 'remotion/node_modules/ffmpeg-static/ffmpeg.exe';
const src = fs.readFileSync('remotion/src/footage.ts', 'utf8');
const decl = {};
for (const m of src.matchAll(/const (\w+) = '([^']+)';/g)) decl[m[1]] = m[2];
const scenes = {};
let cur = null;
for (const line of src.split('\n')) {
  const s = line.match(/^\s+(\d+): \[/);
  if (s) {
    cur = +s[1];
    scenes[cur] = [];
    continue;
  }
  const l = line.match(/L\((\w+), ([\d.]+), (\d+)/);
  if (l && cur) scenes[cur].push({k: l[1], t: +l[2], f: +l[3]});
}
fs.mkdirSync('qc/links', {recursive: true});
const want = process.argv.slice(2).map(Number);
for (const [n, links] of Object.entries(scenes)) {
  if (want.length && !want.includes(+n)) continue;
  const files = links.map((L, i) => {
    const t = (L.t + L.f / 60).toFixed(2);
    const out = `qc/links/s${n}_${i}.png`;
    execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', t, '-i', 'remotion/public/bed-pool/' + decl[L.k], '-frames:v', '1', '-vf', 'scale=384:216', out], {stdio: 'ignore'});
    return out;
  });
  const cols = Math.min(4, files.length);
  const args = ['-hide_banner', '-loglevel', 'error', '-y'];
  files.forEach((f) => args.push('-i', f));
  const layout = files.map((_, i) => `${(i % cols) * 384}_${Math.floor(i / cols) * 216}`).join('|');
  const graph = files.length > 1 ? `${files.map((_, i) => `[${i}]`).join('')}xstack=inputs=${files.length}:layout=${layout}:fill=gray` : '[0]copy';
  args.push('-filter_complex', graph, '-frames:v', '1', `qc/scene${String(n).padStart(2, '0')}_links.jpg`);
  execFileSync(ff, args, {stdio: 'ignore'});
  console.log('scene', n, links.map((l) => `${l.k}@${l.t}x${l.f}`).join(' '));
}
