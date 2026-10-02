import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';
import {TransitionDemo, TRANSITION_DEMO_FRAMES} from './TransitionDemo';

/** Scene ids, in order, so a single beat can be scrubbed on its own in Studio. */
const KEBAB = [
  'hook-cushion-cut-in-half',
  'what-happened',
  'no-1-seed',
  'strong-start',
  'the-pit-stop',
  'quote-professional-sport',
  'buried-in-traffic',
  'the-contact',
  'quote-my-responsibility',
  'mcdowell-declined',
  'damage-report',
  'forty-laps-damaged',
  'not-the-finish',
  'twenty-five-to-twelve',
  'standings-tighten',
  'the-spire-pattern',
  'no-excuses',
  'before-and-after',
  'quote-still-leading',
  'gateway-next',
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
    <Composition
      id="transition-demo"
      component={TransitionDemo}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={TRANSITION_DEMO_FRAMES}
    />
  </>
);
