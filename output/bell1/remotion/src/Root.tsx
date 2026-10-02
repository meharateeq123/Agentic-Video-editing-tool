import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

// One composition per scene alongside the whole film, so any single beat can be scrubbed or
// still-rendered on its own without waiting on the rest.
const KEBAB = [
  'hook-streak-broken',
  'what-this-covers',
  'checkered-flag-southern-500',
  'seven-seconds',
  'been-too-long-quote',
  'red-flag-strategy',
  'the-winning-move',
  'holding-off-four',
  'broken-wrist-michigan',
  'still-in-it-quote',
  'raced-through-it',
  'bow-to-the-grandstands',
  'why-a-chase-win-differs',
  'sixth-to-second',
  'hamlins-rough-night',
  'standings-tighten',
  'darlington-is-no-fluke',
  'all-four-jgr',
  'the-conversation-changed',
  'next-stop-gateway',
  'closing-how-dangerous',
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
