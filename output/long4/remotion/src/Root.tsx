import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ["punched-twice","the-incident","blaneys-anger","thirty-third-third","blaney-waiting","the-first-punch","total-chaos","water-bottle","reactions-differ","black-eye","hocevar-reflects","wasnt-planning-to-throw","monday-regret","biggest-turn","no-penalty","odonnell-explains","car-as-a-weapon","kansas-2023-precedent","crew-review-pending","points-gap-kansas","the-wrap"];

export const RemotionRoot: FC = () => (
  <>
    <Composition id="final-film" component={FinalFilm} width={1920} height={1080} fps={30} durationInFrames={TOTAL_FRAMES} />
    {SCENES.map((Comp, i) => (
      <Composition key={KEBAB[i]} id={KEBAB[i]} component={Comp} width={1920} height={1080} fps={30} durationInFrames={sceneFrames(i + 1)} />
    ))}
  </>
);
