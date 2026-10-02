import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = ['popovici-biggest-names', 'record-46-51-worlds-2025', 'still-racing-2026', 'next-olympic-cycle', 'how-fast-before-la-2028'];

export const RemotionRoot: FC = () => (
  <>
    {/* Final deliverable - 1080x1920, the design-space resolution itself. */}
    <Composition id="final-film" component={FinalFilm} width={1080} height={1920} fps={30} durationInFrames={TOTAL_FRAMES} />
    {/* Per-scene QC compositions stay at the 1080x1920 design-space resolution. */}
    {SCENES.map((Comp, i) => (
      <Composition key={KEBAB[i]} id={KEBAB[i]} component={Comp} width={1080} height={1920} fps={30} durationInFrames={sceneFrames(i + 1)} />
    ))}
  </>
);
