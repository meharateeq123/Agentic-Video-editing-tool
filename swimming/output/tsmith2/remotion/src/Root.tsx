import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'after-retiring-paris-2024',
  'double-olympic-champion-back',
  'missing-the-water',
  'new-challenge',
  'la-2028-50-breaststroke',
  'ready-to-write-a-new-chapter',
];

export const RemotionRoot: FC = () => (
  <>
    {/* Final deliverable - 1080x1920, the design-space resolution itself. */}
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={TOTAL_FRAMES}
    />
    {/* Per-scene QC compositions stay at the 1080x1920 design-space resolution. */}
    {SCENES.map((Comp, i) => (
      <Composition
        key={KEBAB[i]}
        id={KEBAB[i]}
        component={Comp}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={sceneFrames(i + 1)}
      />
    ))}
  </>
);
