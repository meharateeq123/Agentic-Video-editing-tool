import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

/** One id per paragraph in source-script.txt, in order — these name the Studio compositions. */
const KEBAB = [
  'finished-fourth-three-times',
  'the-youngest-medalist',
  'the-water-park-accident',
  'a-name-to-watch',
  'singapore-debut-200im',
  'youngest-medalist-relay',
  'three-fourth-places',
  'the-age-exception',
  'faster-than-the-boys-record',
  'asian-record-and-june-2026',
  'domestic-vs-next',
  'eighth-all-time-context',
  'the-2026-asian-games',
  'known-quantity-now',
  'the-pressure-question',
  'underdog-to-favorite',
  'los-angeles-2028',
  'the-asian-games-field',
  'genuinely-uncertain',
  'drop-your-prediction',
  'subscribe-close',
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
