import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'hook-chase-began',
  'why-darlington-flips-it',
  'already-done-it-2026',
  'goodyear-400-comeback',
  'why-the-win-matters',
  'two-different-seasons',
  'hot-start-numbers',
  'second-half-happened',
  'hamlin-catches-passes',
  'coin-flip-season',
  'deficit-doesnt-matter',
  'chase-reseeds-the-field',
  'clean-restart',
  'walking-in-with-history',
  'darlington-track-record',
  'track-too-tough-to-tame',
  'not-an-empty-field',
  'toyota-manufacturer-loaded',
  'what-separates-reddick',
  'what-a-win-would-mean',
  'closing-no-mercy',
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
