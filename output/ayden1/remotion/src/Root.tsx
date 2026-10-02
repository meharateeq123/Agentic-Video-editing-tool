import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'hook-touches-the-wall',
  'who-is-ayden-tan',
  'seven-records-one-summer',
  'five-records-10-under',
  '200-im-poplawski-record',
  '50-fly-heilman-record',
  '50-free-dalmacio-record',
  'twelve-records-two-brackets',
  'sectionals-lifetime-best',
  'six-of-seven-weekends',
  'range-of-events',
  'why-range-matters',
  'im-complete-swimmer',
  'memorial-day-200-im',
  'swimswam-quote',
  'club-changes',
  'what-comes-next',
  'range-is-the-trait',
  'steady-improvement',
  'moves-to-13-14',
  'records-signal-talent',
  'closing-cta',
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
