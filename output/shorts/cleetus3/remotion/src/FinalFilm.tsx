import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04];

export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
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
    <Audio src={staticFile('vo/cleetus-talladega.wav')} />
  </AbsoluteFill>
);
