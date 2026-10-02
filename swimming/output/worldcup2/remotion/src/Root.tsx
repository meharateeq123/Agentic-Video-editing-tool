import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ['opens-in-baku', '216-swimmers-44-nations', 'big-names-competing', 'prize-pool-beijing', 'world-record'];

export const RemotionRoot: FC = () => (
  <>
    <Composition id="final-film" component={FinalFilm} width={1080} height={1920} fps={30} durationInFrames={TOTAL_FRAMES} />
    {SCENES.map((Comp, i) => (
      <Composition key={KEBAB[i]} id={KEBAB[i]} component={Comp} width={1080} height={1920} fps={30} durationInFrames={sceneFrames(i + 1)} />
    ))}
  </>
);
