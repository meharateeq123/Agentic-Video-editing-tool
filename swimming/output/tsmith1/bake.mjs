// node bake.mjs        -> validates plan (no overlapping windows per source), bakes every beat to
// remotion/public/bed-pool/<id>.mp4 (1920x1080, 30fps, 3.0s, silent, faststart), and writes
// remotion/src/footage.ts. Photos are baked as slow zoompan beds (blurred-backdrop pad for portrait).
import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {PLAN, SRC} from './plan.mjs';

const ROOT = 'D:/flick/swimming/output/tsmith1';
const FF = `${ROOT}/remotion/node_modules/ffmpeg-static/ffmpeg.exe`;
const POOL = `${ROOT}/remotion/public/bed-pool`;
mkdirSync(POOL, {recursive: true});

const ts = (s) => {
  if (!s.includes(':')) return Number(s);
  const [m, x] = s.split(':').map(Number);
  return m * 60 + x;
};
const MOUNTED = {};
{
  const tl = readFileSync(`${ROOT}/remotion/src/timeline.ts`, 'utf8');
  const cuts = [...tl.matchAll(/\{n: (\d+), start: ([\d.]+), end: ([\d.]+)\}/g)].map((m) => ({n: +m[1], s: +m[2], e: +m[3]}));
  cuts.forEach((c, i) => {
    MOUNTED[c.n] = Math.round(c.e * 30) - Math.round(c.s * 30) + (i === cuts.length - 1 ? 0 : 16);
  });
}

// --- validate ---------------------------------------------------------------------------------
const used = {}; // src -> [[t0, t1, scene]]
const usedImg = {};
let bad = 0;
for (const [n, list] of Object.entries(PLAN)) {
  const need = Math.ceil(MOUNTED[n] / 90);
  if (list.length !== need) {
    console.log(`scene ${n}: ${list.length} beats, needs ${need} (mounted ${MOUNTED[n]}f)`);
    bad++;
  }
  for (const b of list) {
    if (b.startsWith('IMG:')) {
      if (usedImg[b]) {
        console.log(`IMAGE REUSED ${b}: scenes ${usedImg[b]} and ${n}`);
        bad++;
      }
      usedImg[b] = n;
      continue;
    }
    const [src, t] = b.split('@');
    if (!SRC[src]) {
      console.log(`unknown source ${src}`);
      bad++;
      continue;
    }
    const t0 = ts(t);
    for (const [a, z, sc] of used[src] ?? []) {
      if (t0 < z && t0 + 3 > a) {
        console.log(`OVERLAP ${b} (scene ${n}) with ${src}@${a}-${z} (scene ${sc})`);
        bad++;
      }
    }
    (used[src] ??= []).push([t0, t0 + 3, n]);
  }
}
if (bad) {
  console.log(`\n${bad} problem(s) - fix plan.mjs`);
  if (!process.argv.includes('--force')) process.exit(1);
}

// --- bake -------------------------------------------------------------------------------------
const run = (args) => spawnSync(FF, args, {encoding: 'utf8'});
const id = (b) => b.replace(/[@:]/g, '-').replace('IMG-', 'img-').toLowerCase();
let imgIdx = 0;
const dirs = [
  (n) => `z='min(1.0+0.0009*on,1.18)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'`,
  (n) => `z='if(eq(on,0),1.16,max(1.0,zoom-0.0009))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'`,
  (n) => `z='1.14':x='(iw-iw/zoom)*on/90':y='ih/2-(ih/zoom/2)'`,
  (n) => `z='1.14':x='(iw-iw/zoom)*(1-on/90)':y='ih/2-(ih/zoom/2)'`,
];
const IMGDIR = `${ROOT}/remotion/public/ref`;
const imgFile = (name) => {
  for (const ext of ['jpg', 'png']) {
    const p = `${IMGDIR}/${name}.${ext}`;
    if (existsSync(p)) return p;
  }
  throw new Error('no image ' + name);
};

const out = {};
for (const [n, list] of Object.entries(PLAN)) {
  out[n] = [];
  for (const b of list) {
    const name = id(b);
    const dst = `${POOL}/${name}.mp4`;
    out[n].push(name);
    if (existsSync(dst)) continue;
    let r;
    if (b.startsWith('IMG:')) {
      const p = imgFile(b.slice(4));
      const z = dirs[imgIdx++ % dirs.length]('');
      // landscape: cover-crop; portrait: sharp fit over a blurred, dimmed copy of itself.
      const vf =
        `split[a][b];[a]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=40:8,eq=brightness=-0.25[bg];` +
        `[b]scale=-2:1080:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p,` +
        `scale=3840:2160,zoompan=${z}:d=90:s=1920x1080:fps=30`;
      // landscape images: skip the blur pad and just cover
      const probe = run(['-i', p, '-hide_banner']).stderr;
      const m = /, (\d{2,5})x(\d{2,5})/.exec(probe);
      const ar = m ? +m[1] / +m[2] : 1.5;
      const vf2 =
        ar >= 1.45
          ? `scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,zoompan=${z}:d=90:s=1920x1080:fps=30`
          : vf;
      r = run(['-y', '-v', 'error', '-loop', '1', '-i', p, '-vf', vf2, '-t', '3', '-r', '30', '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', dst]);
    } else {
      const [src, t] = b.split('@');
      const s = SRC[src];
      const crop = s.crop ? s.crop + ',' : '';
      r = run(['-y', '-v', 'error', '-ss', String(ts(t)), '-t', '3', '-i', `${ROOT}/dl/${s.file}`, '-vf', `${crop}scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30`, '-c:v', 'libx264', '-crf', '19', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', dst]);
    }
    if (r.status !== 0 || !existsSync(dst)) console.log(`BAKE FAIL ${b}: ${(r.stderr || '').slice(0, 200)}`);
  }
}

// --- footage.ts -------------------------------------------------------------------------------
const lines = Object.entries(out).map(([n, names]) => {
  const dur = MOUNTED[n];
  const k = names.length;
  const base = Math.floor(dur / k);
  const extra = dur - base * k;
  const parts = names.map((nm, i) => `L('${nm}', ${Math.min(90, base + (i < extra ? 1 : 0))})`);
  return `  ${n}: [${parts.join(', ')}],`;
});
writeFileSync(
  `${ROOT}/remotion/src/footage.ts`,
  `/**
 * Scene -> chain of bed clips. Generated by bake.mjs from plan.mjs: every beat is its own baked 3s cut
 * (or a slow photo move) used exactly once, held for at most 90 frames. See plan.mjs for the source of
 * each beat and the note on what it shows.
 */

export type Bed = {
  src: string;
  startFrom: number;
  span: number;
  zoom?: number;
  offX?: number;
  offY?: number;
  driftX?: number;
  driftY?: number;
  exposure?: number;
  saturate?: number;
};

export type Link = Bed & {frames: number};

const P = (name: string) => \`bed-pool/\${name}.mp4\`;

const L = (file: string, frames: number, extra: Partial<Omit<Bed, 'src' | 'span'>> = {}): Link => ({
  src: P(file),
  startFrom: 0,
  frames,
  span: frames / 30,
  ...extra,
});

export const CHAINS: Record<number, Link[]> = {
${lines.join('\n')}
};

export const chain = (n: number): Link[] => CHAINS[n];
`
);
console.log('done. beats:', Object.values(out).flat().length);
