// One row per bed link: first, middle and last source frame it plays, as baked 9:16.
// node qc-links.cjs  ->  qc/links.jpg
const {execFileSync} = require('child_process');
const ff = 'remotion/node_modules/ffmpeg-static/ffmpeg.exe';
const links = [
  ['S1a larson-victory-lane', 3.0, 64],
  ['S1b hamlin-gateway-presser-a', 0.5, 92],
  ['S1c larson-gateway-presser', 2.0, 36],
  ['S2a bristol-stands', 1.0, 34],
  ['S2b bristol-building', 0.3, 42],
  ['S3a larson-trophy-interview', 1.0, 60],
  ['S3b hamlin-gateway-presser-b', 0.5, 69],
  ['S4a hamlin-bristol-flag', 0.2, 45],
  ['S4b larson-filmroom', 1.0, 42],
  ['S4c hamlin-bristol-interview', 0.5, 100],
];
const rows = [];
links.forEach(([label, start, frames], i) => {
  const [tag, name] = label.split(' ');
  const ts = [start + 0.05, start + frames / 60, start + frames / 30 - 0.05];
  const tiles = ts.map((t, j) => {
    const out = `qc/l${i}_${j}.png`;
    execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', t.toFixed(2), '-i', `remotion/public/bed-pool/${name}.mp4`, '-frames:v', '1',
      '-vf', `scale=240:427,drawtext=fontfile=C\\\\:/Windows/Fonts/arial.ttf:text='${tag} ${t.toFixed(1)}s':x=6:y=6:fontsize=20:fontcolor=yellow:box=1:boxcolor=black@0.6`, out]);
    return out;
  });
  rows.push(...tiles);
});
const args = ['-hide_banner', '-loglevel', 'error', '-y'];
rows.forEach((f) => args.push('-i', f));
const layout = rows.map((_, i) => `${(i % 6) * 240}_${Math.floor(i / 6) * 427}`).join('|');
args.push('-filter_complex', `${rows.map((_, i) => `[${i}]`).join('')}xstack=inputs=${rows.length}:layout=${layout}`, '-frames:v', '1', 'qc/links.jpg');
execFileSync(ff, args);
console.log('wrote qc/links.jpg', rows.length, 'tiles');
