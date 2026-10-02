import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'hook-nobody-expected',
  'devdiary-reveal',
  'he-is-in',
  'baldeagle-scheme',
  'talladega-near-win',
  'not-a-coincidence',
  'how-he-got-here',
  'youtuber-to-racer',
  'not-a-novelty',
  'first-season-results',
  'three-series-2026',
  'worth-tracking',
  'what-it-didnt-confirm',
  'footprint-could-grow',
  'whats-confirmed',
  'talladega-and-2027',
  'clearest-signal',
  'game-follows-career',
  'closing-burnouts',
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
