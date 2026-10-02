import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'warning-sent',
  'the-warning',
  'setup-darlington',
  'stage-1-lap-107',
  'into-the-wall',
  'racing-for-17th',
  'finished-23rd',
  'quote-he-ran-into-me',
  'any-history',
  'quote-no-but-there-will-be',
  'quote-his-day-is-coming',
  'a-direct-warning',
  'hocevars-response',
  'quote-he-spun',
  'not-intentional',
  'quote-tighten-my-belts',
  'for-the-clicks',
  'not-isolated-moment',
  '23rd-vs-11th',
  'nascar-noticed',
  'quote-discussed-a-little',
  'no-formal-meeting',
  'quote-brad-moran-may-speak',
  'the-distinction',
  'hill-vs-van-gisbergen',
  'keselowski-the-owner',
  'a-difficult-spot',
  'next-stop-gateway',
  'the-obvious-question',
  'the-close',
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
