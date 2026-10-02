import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ['number-1-two-events', '200-fly-no-1', '200-im-no-1', 'no-2-400-im', 'only-13'];

export const RemotionRoot: FC = () => (
  <>
    <Composition id="final-film" component={FinalFilm} width={1080} height={1920} fps={30} durationInFrames={TOTAL_FRAMES} />
    {SCENES.map((Comp, i) => (
      <Composition key={KEBAB[i]} id={KEBAB[i]} component={Comp} width={1080} height={1920} fps={30} durationInFrames={sceneFrames(i + 1)} />
    ))}
  </>
);
