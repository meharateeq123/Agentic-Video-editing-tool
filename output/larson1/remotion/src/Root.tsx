import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'hook-started-25th',
  'weather-wiped-qualifying',
  'worst-starting-spot',
  'working-forward',
  'fastest-car-on-track',
  'not-a-coincidence',
  'the-red-flag',
  'the-stay-out-call',
  'bell-closes-the-gap',
  'daniels-defends-the-call',
  'quote-no-i-dont',
  'damage-control',
  'quote-really-happy',
  'three-race-drought-ended',
  'seventh-49-back',
  'nine-races-left',
  'winless-in-51',
  'speed-vs-results',
  'the-question-now',
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
