import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'title-300k-giveaway',
  'the-catch-nobody-sees',
  'four-prizes-one-winner',
  'the-corvette-zr1',
  'the-silverado-2500hd',
  'the-car-hauler',
  'seventy-five-k-cash',
  'three-hundred-k-total',
  'wheres-the-catch',
  'racetrack-use-only',
  'as-is-no-warranty',
  'not-a-scam',
  'how-do-you-get-in',
  'three-ways-to-enter',
  'buy-online',
  'buy-in-person',
  'mail-in-free',
  'door-stays-open',
  'entry-deadline',
  'the-drawing',
  'two-more-things',
  'pickup-in-bradenton',
  'the-tax-bill',
  'scam-alert',
  'why-so-massive',
  'the-business-engine',
  'more-giveaways-running',
  'the-freedom-factory',
  'biggest-giveaway-ever',
  'the-history-climb',
  'now-at-300k',
  'the-recap',
  'would-you-keep-it',
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
