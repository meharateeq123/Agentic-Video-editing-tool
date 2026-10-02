// Writes remotion/src/scenes/SceneNN.tsx (plain footage scenes), FinalFilm.tsx and Root.tsx.
// A scene file that no longer carries the "@generated-plain" marker (i.e. one edited to hold a graphic) is kept.
import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'node:fs';

const paragraphs = readFileSync('source-script.txt', 'utf8').split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
const dir = 'remotion/src/scenes';
mkdirSync(dir, {recursive: true});
const pad = (n) => String(n).padStart(2, '0');
const doc = (text) => {
  const lines = [];
  let line = '';
  for (const w of text.split(/\s+/)) {
    if ((line + ' ' + w).trim().length > 96) {
      lines.push(line.trim());
      line = w;
    } else line += ' ' + w;
  }
  if (line.trim()) lines.push(line.trim());
  return lines.map((l) => ` * ${l}`).join('\n');
};

let written = 0, kept = 0;
paragraphs.forEach((text, i) => {
  const n = i + 1;
  const file = `${dir}/Scene${pad(n)}.tsx`;
  if (existsSync(file) && !readFileSync(file, 'utf8').includes('@generated-plain')) {
    kept++;
    return;
  }
  writeFileSync(
    file,
    `import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S${pad(n)}_DUR = mountedFrames(${n});

/**
 * Scene ${n}
${doc(text)}
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene${pad(n)}: React.FC = () => (
  <BedChain segs={chain(${n})} dur={S${pad(n)}_DUR} amp={0.04} maxBlur={0} dim={0} />
);
`
  );
  written++;
});

const nums = paragraphs.map((_, i) => pad(i + 1));
const rows = [];
for (let i = 0; i < nums.length; i += 5) rows.push('  ' + nums.slice(i, i + 5).map((p) => `Scene${p},`).join(' '));

writeFileSync(
  'remotion/src/FinalFilm.tsx',
  `import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';
import {HookMontage} from './components/HookMontage';
import {HOOK_FRAMES} from './hook';

${nums.map((p) => `import {Scene${p}} from './scenes/Scene${p}';`).join('\n')}

export const SCENES: React.FC[] = [
${rows.join('\n')}
];

/**
 * 15s hook montage (the clips' real sound is laid by render.ps1), a hard cut, then the film from its true
 * beginning with the VO. Every scene and the VO are shifted by HOOK_FRAMES.
 */
export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    <Sequence from={0} durationInFrames={HOOK_FRAMES} layout="none">
      <HookMontage />
    </Sequence>

    {SCENES.map((Comp, i) => {
      const n = i + 1;
      const dur = sceneFrames(n);
      const last = n === SCENES.length;
      return (
        <Sequence
          key={n}
          from={HOOK_FRAMES + startFrame(n)}
          durationInFrames={dur + (last ? 0 : OVERLAP)}
          layout="none"
        >
          <SceneTransition
            inKind={n === 1 ? null : TRANSITION_IN[i]}
            outKind={last ? null : TRANSITION_IN[i + 1]}
            dur={dur}
            overlap={OVERLAP}
          >
            <Comp />
          </SceneTransition>
        </Sequence>
      );
    })}

    <Sequence from={HOOK_FRAMES} layout="none">
      <Audio src={staticFile('vo/tsmith1.wav')} />
    </Sequence>
  </AbsoluteFill>
);
`
);

writeFileSync(
  'remotion/src/Root.tsx',
  `import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {HookMontage} from './components/HookMontage';
import {HOOK_FRAMES} from './hook';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

export const RemotionRoot: FC = () => (
  <>
    {/* Final deliverable - 1920x1080: 15s hook + the film. */}
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={HOOK_FRAMES + TOTAL_FRAMES}
    />
    <Composition id="hook" component={HookMontage} width={1920} height={1080} fps={30} durationInFrames={HOOK_FRAMES} />
    {/* Per-scene QC compositions. */}
    {SCENES.map((Comp, i) => (
      <Composition
        key={i}
        id={\`scene-\${String(i + 1).padStart(2, '0')}\`}
        component={Comp}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={sceneFrames(i + 1)}
      />
    ))}
  </>
);
`
);
console.log(`scenes: ${written} written, ${kept} kept; FinalFilm + Root rewired for ${nums.length} scenes`);
