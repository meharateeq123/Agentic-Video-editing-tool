// Contact sheet with timestamps: node sheet.cjs <file> <start> <end> <step> <out.jpg>
// One tile every <step> seconds, 5 across, each labelled with its source time.
const {execFileSync} = require('child_process');
const ff = 'remotion/node_modules/ffmpeg-static/ffmpeg.exe';
const [file, a, b, step, out] = process.argv.slice(2);
const s = +a, e = +b, st = +step;
const n = Math.floor((e - s) / st) + 1;
const cols = 5, rows = Math.ceil(n / cols);
const vf = `fps=1/${st},scale=384:216,drawtext=fontfile=C\\\\:/Windows/Fonts/arial.ttf:text='%{eif\\:t+${s}\\:d}s':x=6:y=6:fontsize=22:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=${cols}x${rows}`;
execFileSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(s), '-t', String(e - s), '-i', file, '-vf', vf, '-frames:v', '1', out], {stdio: 'inherit'});
console.log('wrote', out, n, 'tiles');
