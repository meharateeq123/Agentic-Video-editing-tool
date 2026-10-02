// One row per bed link: first, middle and last source frame it plays, as baked 9:16.
// node qc-links.cjs  ->  qc/links.jpg
const {execFileSync} = require('child_process');
const ff = 'remotion/node_modules/ffmpeg-static/ffmpeg.exe';
const links = [
  ['S1a cleetus-interview-a', 1.0, 70],
  ['S1b cleetus-helmet', 2.0, 59],
  ['S1c mcnutt-rockingham', 1.0, 43],
  ['S2a cleetus30-track', 0.5, 36],
  ['S2b cleetus30-pit', 0.2, 38],
  ['S3a cleetus-incar-pov', 1.0, 50],
  ['S3b cleetus33-track', 0.5, 48],
  ['S4a cleetus-incar-pov', 6.5, 42],
  ['S4b cleetus-helmet-close', 1.0, 45],
  ['S4c cleetus-interview-b', 1.0, 58],
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
