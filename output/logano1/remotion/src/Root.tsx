import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {HookPreview} from './scenes/HookPreview';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'title-bombshell-pole',
  'the-two-tenths-gap',
  'the-qualifying-lap',
  'logano-vs-larson',
  'screwed-up-turn-one',
  'the-points-gap',
  'racetrack-we-circled',
  'what-pole-position-buys',
  'gateway-track-record',
  'larsons-winless-streak',
  'front-row-lineup',
  'six-chase-drivers-top-six',
  'hamlins-tenth-place',
  'pole-is-not-a-win',
  'the-margin-that-matters',
  'the-closing-question',
];

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
    <Composition
      id="hook-preview-suspense"
      component={HookPreview}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={450}
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
