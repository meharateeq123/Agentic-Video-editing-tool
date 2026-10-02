import type {FC} from 'react';
import {Composition} from 'remotion';
import {FinalFilm, SCENES} from './FinalFilm';
import {TOTAL_FRAMES, sceneFrames} from './timeline';

export const RemotionRoot: FC = () => (
  <>
    {/* Final deliverable - 1920x1080, VO from frame 0 (no cold open). */}
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
        key={i}
        id={`scene-${String(i + 1).padStart(2, '0')}`}
        component={Comp}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={sceneFrames(i + 1)}
      />
    ))}
  </>
);
