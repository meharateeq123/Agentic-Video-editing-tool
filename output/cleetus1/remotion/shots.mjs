// Bundle once, then grab many stills — far faster than repeated `remotion still`.
import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const outDir = process.argv[2];
const compId = process.argv[3] ?? 'final-film';
const frames = process.argv.slice(4).map(Number);

fs.mkdirSync(outDir, {recursive: true});

const serveUrl = await bundle({
  entryPoint: path.resolve('src/index.tsx'),
  onProgress: (p) => {
    if (p % 25 === 0) console.log('bundling', p + '%');
  },
});

const composition = await selectComposition({serveUrl, id: compId, inputProps: {}});

for (const f of frames) {
  const out = path.join(outDir, `${compId}-${String(f).padStart(5, '0')}.png`);
  await renderStill({
    composition,
    serveUrl,
    output: out,
    frame: f,
    overwrite: true,
    inputProps: {},
    scale: 0.5,
  });
  console.log('frame', f, '->', out);
}
console.log('done');
