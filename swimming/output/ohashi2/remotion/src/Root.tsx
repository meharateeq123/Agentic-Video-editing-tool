import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'marchand-noticed-him',
  'broke-the-world-record',
  'in-2-04-83',
  'a-scary-competitor',
  'looking-toward-la-2028',
  'marchand-the-rival',
  'ready-for-the-challenge',
  'an-olympic-battle',
];

export const RemotionRoot: FC = () => (
  <>
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={TOTAL_FRAMES}
    />
    {SCENES.map((Comp, i) => (
      <Composition
        key={KEBAB[i]}
        id={KEBAB[i]}
        component={Comp}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={sceneFrames(i + 1)}
      />
    ))}
  </>
);
