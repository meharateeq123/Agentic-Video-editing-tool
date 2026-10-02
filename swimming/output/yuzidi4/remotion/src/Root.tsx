import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'then-the-final-starts',
  'two-oh-six-ten',
  'tokyo-aquatics-centre',
  'record-changes-hands',
  'opening-fly-split',
  'backstroke-gap',
  'breaststroke-comeback',
  'second-fastest-ever',
  'point-four-oh',
  'faster-than-olympic-gold',
  'balanced-across-four-strokes',
  'the-prelims-twist',
  'so-so',
  'fastest-this-year',
  'six-of-seven-golds',
  'eighth-all-time',
  'tokyo-budapest-la',
  'mcintosh-still-twenty',
  'the-leg-to-close',
  'not-in-question',
  'drop-your-prediction',
  'not-finished-yet',
];

export const RemotionRoot: FC = () => (
  <>
    {/* Final deliverable - 1920x1080. */}
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={TOTAL_FRAMES}
    />
    {/* Per-scene QC compositions. */}
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
