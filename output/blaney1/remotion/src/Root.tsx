import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'title-brakes-destroyed-championship',
  'running-fifth-exploded-hood',
  'stage-one-two-fourth-place',
  'driver-in-position',
  'lap-155-rotor-explodes',
  'i-have-no-brakes-radio',
  'sixteen-points-35th-place',
  'blaney-quote-didnt-feel-great',
  'gateway-brake-history-1200f',
  'zane-smith-brake-failure',
  'elliott-luck-of-the-draw',
  'two-contenders-same-race',
  'gap-explodes-16-to-33',
  'larson-snaps-win-streak',
  'championship-format-one-bad-race',
  'blaney-quote-havent-had-failure',
  'crew-chief-hassler-quote',
  'blaney-quote-keep-going',
  'math-doesnt-lie',
  'chase-moves-to-bristol',
  'bristol-different-animal',
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
