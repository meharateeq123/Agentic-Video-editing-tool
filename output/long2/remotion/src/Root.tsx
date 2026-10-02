import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ["piece-of-metal","gateway-rotor-failure","points-damage","blaney-gateway-quote","next-week-bristol","real-bristol-history","april-food-city-500","career-bristol-numbers","dominant-recent-form","the-story-here","charlotte-math-quote","not-panicking","championship-picture","hassler-quote","mindset-lead-the-field","april-form-impact","nothing-mattered-brakes","already-shown-lead","saturday-night-question"];

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
