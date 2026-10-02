import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ["nascar-handed-decision","exactly-what-changed","wednesday-announced-procedure","how-it-works","whats-different","section-8-6-1-d","not-random-tweak","new-hampshire-svg-gamble","odonnell-quote","watched-driver-punished","not-free-for-all","nascar-declares-wet","pit-road-wrinkle","seven-ovals","saturday-night-puzzle","no-longer-single-moment","championship-storyline","chase-standings","bristol-raises-stakes","if-bristol-stays-dry","teams-get-it-right-wrong","closing-what-sky-does"];

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
