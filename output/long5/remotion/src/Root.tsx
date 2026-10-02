import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ["one-point","how-tight","hollywood-casino-400","seventeen-points","chase-format","gateway-win","bristol-drag-race","new-points-leader","larson-after-bristol","hamlin-cushion","mojo","kansas-record","kansas-chaos","wallace-contact","elliott-stats","reddick-april","three-tracks","larson-momentum","no-reset","both-arrive","unforgiving-math","first-test"];

export const RemotionRoot: FC = () => (
  <>
    <Composition id="final-film" component={FinalFilm} width={1920} height={1080} fps={30} durationInFrames={TOTAL_FRAMES} />
    {SCENES.map((Comp, i) => (
      <Composition key={KEBAB[i]} id={KEBAB[i]} component={Comp} width={1920} height={1080} fps={30} durationInFrames={sceneFrames(i + 1)} />
    ))}
  </>
);
