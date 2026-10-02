import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const KEBAB = [
  'keselowski-sends-warning',
  'darlington-incident',
  'watch-out-hocevar',
  'nascar-watching-gateway',
  'payback-this-weekend',
];

export const RemotionRoot: FC = () => (
  <>
    {/* Final deliverable — 2K vertical (1440x2560), same 9:16 as the rest of the design space. */}
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1440}
      height={2560}
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
