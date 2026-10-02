import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

const pad = (n: number) => String(n).padStart(2, '0');

export const RemotionRoot: FC = () => (
  <>
    {/* The deliverable. */}
    <Composition
      id="final-film"
      component={FinalFilm}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={TOTAL_FRAMES}
    />
    {/* One composition per scene, for QC stills without seeking the whole film. */}
    {SCENES.map((Comp, i) => (
      <Composition
        key={pad(i + 1)}
        id={`scene-${pad(i + 1)}`}
        component={Comp}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={sceneFrames(i + 1)}
      />
    ))}
  </>
);
