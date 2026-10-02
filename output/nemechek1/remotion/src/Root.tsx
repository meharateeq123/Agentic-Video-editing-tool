import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'hook-lost-the-ride',
  'what-well-cover',
  'legacy-confirms-exit',
  'the-official-version',
  'bianchi-breaks-it',
  'timeline-reversal',
  'nemechek-responds',
  'not-expecting-it',
  'first-year-2024',
  'breakthrough-2025',
  'regression-2026',
  'season-went-backward',
  'legacy-goes-to-three',
  'the-42-left-open',
  'josh-berry-linked',
  'where-it-gets-interesting',
  'almost-no-seats-open',
  'one-unexpected-free-agent',
  'few-remaining-chairs',
  'career-record',
  'wins-in-real-equipment',
  'the-real-question',
  'a-third-of-a-season-left',
  'replacement-unnamed',
  'silly-season-just-starting',
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
