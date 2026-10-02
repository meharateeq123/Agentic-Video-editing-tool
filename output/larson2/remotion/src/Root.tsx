import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {HOOK_FRAMES, TOTAL_FRAMES, sceneFrames} from './timeline';
import {HookOpen} from './components/HookOpen';

const KEBAB = [
  'title-bombshell-on-hamlin',
  'larson-seventh-49-behind',
  'green-flag-drops-wwtr',
  'eighteen-cautions-track-record',
  'larson-to-front-passes-logano',
  'thirtythird-career-win',
  'vaults-seventh-to-second',
  'forty-point-swing',
  'hamlin-clean-race-ninth',
  'cushion-to-nine-points',
  'scarier-position-for-leader',
  'quote-swagger-back',
  'quote-gives-you-confidence',
  'driver-pointing-at-next-race',
  'quote-havent-doubted-myself',
  'kept-belief-51-races',
  'chase-moves-to-bristol',
  'bell-blaney-standings-gap',
  'hamlin-cold-comfort',
  'nine-points-nothing-pressure',
  'the-closing-question',
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
    <Composition
      id="cold-open-hook"
      component={HookOpen}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={HOOK_FRAMES}
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
