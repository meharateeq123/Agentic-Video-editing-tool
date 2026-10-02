// node qcsheet.mjs -> sheets/qc_XX.jpg : middle frame of every baked beat, labelled with scene + id, 5 cols x 6 rows.
import {readFileSync, mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {PLAN} from './plan.mjs';

const ROOT = 'D:/flick/swimming/output/tsmith1';
const FF = `${ROOT}/remotion/node_modules/ffmpeg-static/ffmpeg.exe`;
mkdirSync(`${ROOT}/sheets`, {recursive: true});
const id = (b) => b.replace(/[@:]/g, '-').replace('IMG-', 'img-').toLowerCase();
const items = [];
for (const [n, list] of Object.entries(PLAN)) for (const b of list) items.push({n, name: id(b)});
const only = process.argv.slice(2).map((x) => new RegExp(x));
if (only.length) { const keep = items.filter((it) => only.some((r) => r.test(it.name))); items.length = 0; items.push(...keep); }
const W = 384, H = 216, COLS = 5, ROWS = 6, PER = COLS * ROWS;
for (let s = 0; s * PER < items.length; s++) {
  const chunk = items.slice(s * PER, (s + 1) * PER);
  const args = ['-y', '-v', 'error'];
  let f = '';
  chunk.forEach((it, i) => {
    args.push('-ss', '1.2', '-i', `${ROOT}/remotion/public/bed-pool/${it.name}.mp4`);
    f += `[${i}:v]scale=${W}:${H},drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='S${it.n} ${it.name}':x=4:y=4:fontsize=17:fontcolor=yellow:box=1:boxcolor=black@0.65[v${i}];`;
  });
  f += chunk.map((_, i) => `[v${i}]`).join('');
  f += `xstack=inputs=${chunk.length}:layout=${chunk.map((_, i) => `${(i % COLS) * W}_${Math.floor(i / COLS) * H}`).join('|')}[out]`;
  const r = spawnSync(FF, [...args, '-filter_complex', f, '-map', '[out]', '-frames:v', '1', `${ROOT}/sheets/qc${only.length ? 'x' : ''}_${String(s + 1).padStart(2, '0')}.jpg`], {encoding: 'utf8'});
  if (r.status !== 0) console.log('fail sheet', s, r.stderr.slice(0, 200));
}
console.log('sheets:', Math.ceil(items.length / PER));

