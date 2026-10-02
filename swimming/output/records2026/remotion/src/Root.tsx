import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

/** One id per paragraph in source-script.txt, in order — these name the Studio compositions. */
const KEBAB = [
  'a-scoreboard-flashes-red',
  'the-records-that-shocked',
  'douglass-50-free',
  'walsh-takes-it-back',
  'walsh-100-fly',
  'walsh-50-fly-rome',
  'mcintosh-200-fly',
  'four-records-at-once',
  'the-mens-side',
  'deliberate-choices',
  'versatility-cost',
  'three-events-tension',
  'mcintosh-pan-pacs-400im',
  'short-course-season',
  'history-backs-it-up',
  'a-common-thread',
  'what-makes-2026-different',
  'your-predictions',
  'subscribe',
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
