import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {HookMontage} from './components/HookMontage';
import {HOOK_FRAMES} from './hook';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

/** One id per paragraph in source-script.txt, in order — these name the Studio compositions. */
const KEBAB = [
  'twenty-eight-medals',
  'life-a-decade-later',
  'sydney-to-rio',
  'paradise-valley',
  'the-current-home',
  'net-worth',
  'beijing-bonuses',
  'endorsements',
  'not-the-money',
  'talkspace-and-depression',
  'himss-and-foundation',
  'mp-by-michael-phelps',
  'commentator',
  'asu-with-bowman',
  'nicole-and-four-sons',
  'parenting-training-block',
  'cars-and-recovery',
  'his-real-work',
  'a-quieter-success',
  'your-thoughts',
  'what-comes-after',
];

export const RemotionRoot: FC = () => (
  <>
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={HOOK_FRAMES + TOTAL_FRAMES}
    />
    <Composition id="hook" component={HookMontage} width={1920} height={1080} fps={30} durationInFrames={HOOK_FRAMES} />
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
