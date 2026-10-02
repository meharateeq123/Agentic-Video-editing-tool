// Writes remotion/src/scenes/SceneNN.tsx, one per paragraph in source-script.txt, plus the
// FinalFilm.tsx and Root.tsx wiring for however many there are.
//
// Every scene starts as footage only. Graphics are added back by hand, scene by scene, and only
// where there is something real to show — a photo, a number comparison, or a quote from a real
// document. That is the standing rule for these films: default a line to no text.
//
// Re-running this overwrites plain scenes. It refuses to touch a scene file that has been edited to
// carry a graphic, so adding cards is not undone by a regeneration.

import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'node:fs';

const paragraphs = readFileSync('source-script.txt', 'utf8')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

const dir = 'remotion/src/scenes';
mkdirSync(dir, {recursive: true});

const pad = (n) => String(n).padStart(2, '0');
/** Wrap the paragraph into comment lines so the scene file says what it is covering. */
const doc = (text) => {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > 96) {
      lines.push(line.trim());
      line = w;
    } else {
      line += ' ' + w;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.map((l) => ` * ${l}`).join('\n');
};

let written = 0;
let kept = 0;

paragraphs.forEach((text, i) => {
  const n = i + 1;
  const file = `${dir}/Scene${pad(n)}.tsx`;

  if (existsSync(file) && !readFileSync(file, 'utf8').includes('@generated-plain')) {
    kept++;
    return;
  }

  const src = `import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S${pad(n)}_DUR = mountedFrames(${n});

/**
 * Scene ${n}
${doc(text)}
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene${pad(n)}: React.FC = () => <BedChain segs={chain(${n})} dur={S${pad(n)}_DUR} />;
`;
  writeFileSync(file, src);
  written++;
});

// --- FinalFilm.tsx ---------------------------------------------------------------------------
const nums = paragraphs.map((_, i) => pad(i + 1));
const imports = nums.map((p) => `import {Scene${p}} from './scenes/Scene${p}';`).join('\n');
const rows = [];
for (let i = 0; i < nums.length; i += 5) {
  rows.push('  ' + nums.slice(i, i + 5).map((p) => `Scene${p},`).join(' '));
}

writeFileSync(
  'remotion/src/FinalFilm.tsx',
  `import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TRANSITION_IN, VO_ALIGNED, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

${imports}

export const SCENES: React.FC[] = [
${rows.join('\n')}
];

/**
 * No cold-open hook clip in this film - the VO (and the picture) start at frame 0.
 * Scene boundaries use the cycled TRANSITION_IN moves; the cuts *inside* a scene are handled by
 * BedChain's own short link transitions.
 */
export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    {SCENES.map((Comp, i) => {
      const n = i + 1;
      const dur = sceneFrames(n);
      const last = n === SCENES.length;
      return (
        <Sequence
          key={n}
          from={startFrame(n)}
          durationInFrames={dur + (last ? 0 : OVERLAP)}
          layout="none"
        >
          <SceneTransition
            inKind={TRANSITION_IN[i]}
            outKind={last ? null : TRANSITION_IN[i + 1]}
            dur={dur}
            overlap={OVERLAP}
          >
            <Comp />
          </SceneTransition>
        </Sequence>
      );
    })}

    {VO_ALIGNED ? (
      <Sequence from={0} layout="none">
        <Audio src={staticFile('vo/yuzidi.wav')} />
      </Sequence>
    ) : null}
  </AbsoluteFill>
);
`
);

console.log(`scenes: ${written} written, ${kept} kept (already carry a graphic)`);
console.log('FinalFilm.tsx rewired for ' + nums.length + ' scenes');
