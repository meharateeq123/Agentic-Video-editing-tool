// Regenerates FinalFilm.tsx and Root.tsx for the current scene count (22).
import {writeFileSync} from 'node:fs';
const N = 19;
const nn = (n) => String(n).padStart(2, '0');
const imports = Array.from({length: N}, (_, i) => `import {Scene${nn(i + 1)}} from './scenes/Scene${nn(i + 1)}';`).join('\n');
const list = Array.from({length: N}, (_, i) => `Scene${nn(i + 1)}`).join(', ');

const finalFilm = `import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {HOOK_FRAMES, OVERLAP, TRANSITION_IN, VO_ALIGNED, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';
import {HookOpen} from './components/HookOpen';

${imports}

export const SCENES: React.FC[] = [
  ${list},
];

/**
 * The film opens cold on the suspense-montage hook (flick-suspense-hook-format) before any
 * narration starts. Every scripted scene's \`from\` is pushed forward by HOOK_FRAMES so timeline.ts
 * never has to know the hook exists - it just adds 15 silent-VO seconds the hook fills with real
 * sound.
 */
export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    <Sequence from={0} durationInFrames={HOOK_FRAMES} layout="none">
      <HookOpen />
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
      <Sequence from={HOOK_FRAMES} layout="none">
        <Audio src={staticFile('vo/long2.wav')} />
      </Sequence>
    ) : null}
  </AbsoluteFill>
);
`;
writeFileSync('remotion/src/FinalFilm.tsx', finalFilm);

const KEBAB = [
  'piece-of-metal', 'gateway-rotor-failure', 'points-damage', 'blaney-gateway-quote', 'next-week-bristol',
  'real-bristol-history', 'april-food-city-500', 'career-bristol-numbers', 'dominant-recent-form', 'the-story-here',
  'charlotte-math-quote', 'not-panicking', 'championship-picture', 'hassler-quote', 'mindset-lead-the-field',
  'april-form-impact', 'nothing-mattered-brakes', 'already-shown-lead', 'saturday-night-question',
];

const root = `import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ${JSON.stringify(KEBAB)};

export const RemotionRoot: FC = () => (
  <>
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={TOTAL_FRAMES}
    />
    {SCENES.map((Comp, i) => (
      <Composition
        key={KEBAB[i]}
        id={KEBAB[i]}
        component={Comp}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={sceneFrames(i + 1)}
      />
    ))}
  </>
);
`;
writeFileSync('remotion/src/Root.tsx', root);
console.log('wrote FinalFilm.tsx and Root.tsx');

