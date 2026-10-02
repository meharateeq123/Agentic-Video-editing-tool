import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'hook-berlin-crash',
  'what-we-break-down',
  'berlin-raceway-michigan',
  'qualified-18th',
  'the-spin-p19',
  'right-rear-overheated',
  'the-backlash',
  'dale-jr-download',
  'earnhardts-argument',
  'first-attempt-wreck',
  'every-level',
  'asked-then-punished',
  'seventy-five-lap-race',
  'running-position-graph',
  'no-crash-no-spin',
  'the-real-story',
  'two-races-compared',
  'racing-resume',
  'rockingham-to-nashville',
  'more-chances-not-fewer',
  'climb-to-daytona-500',
  'not-a-finished-product',
  'the-message',
  'stacking-races',
  'road-to-daytona',
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
