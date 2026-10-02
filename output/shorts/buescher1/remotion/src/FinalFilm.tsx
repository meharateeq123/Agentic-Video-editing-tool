import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TOTAL_FRAMES, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';
import {cutStarts} from './scenes/Cuts';

import {Scene01, S01_CUTS} from './scenes/Scene01';
import {Scene02, S02_CUTS, S02_TILES_AT} from './scenes/Scene02';
import {Scene03, S03_CUTS} from './scenes/Scene03';
import {Scene04, S04_CUTS} from './scenes/Scene04';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04];
const SCENE_CUTS = [S01_CUTS, S02_CUTS, S03_CUTS, S04_CUTS];

// Every scene/component in this project is authored in 1080x1920 "design space". This film ships
// at 1080p, so the design-space stack renders 1:1.
const SCALE = 1;

type Hit = {at: number; src: string; volume: number};

/**
 * The SFX track, all in absolute frames: a whoosh on every scene transition and every internal
 * cut, and a pop as each stat tile lands. No closing riser this time - the user asked for it off.
 */
const HITS: Hit[] = [
  ...SCENES.flatMap((_, i) => {
    const s = startFrame(i + 1);
    const whooshes = [...(i === 0 ? [] : [0]), ...cutStarts(SCENE_CUTS[i])];
    return whooshes.map((f) => ({at: s + f, src: 'sounds/transitions.mp3', volume: 0.35}));
  }),
  ...S02_TILES_AT.map((f) => ({at: startFrame(2) + f, src: 'sounds/Pop.mp3', volume: 0.45})),
];

export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    <div style={{width: 1080, height: 1920, transform: `scale(${SCALE})`, transformOrigin: '0 0'}}>
      {SCENES.map((Comp, i) => {
        const n = i + 1;
        const dur = sceneFrames(n);
        const last = n === SCENES.length;
        return (
          <Sequence
            key={n}
            from={startFrame(n)}
            durationInFrames={dur + (last ? 0 : OVERLAP)}
            layout="none"
          >
            <SceneTransition
              inKind={TRANSITION_IN[i]}
              outKind={last ? null : TRANSITION_IN[i + 1]}
              dur={dur}
              overlap={OVERLAP}
            >
              <Comp />
            </SceneTransition>
          </Sequence>
        );
      })}
    </div>
    <Audio src={staticFile('vo/buescher1.wav')} />
    {HITS.map((h, i) => (
      <Sequence key={i} from={h.at} durationInFrames={TOTAL_FRAMES - h.at} layout="none">
        <Audio src={staticFile(h.src)} volume={h.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
