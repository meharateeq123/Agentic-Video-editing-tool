import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04, Scene05];

// Every scene/component in this project is authored in 1080x1920 "design space" (the rest of
// this Shorts library's convention). The output canvas is 1440x2560 (2K vertical) — same 9:16
// aspect ratio — so the whole design-space stack is scaled up 4/3x rather than repositioning
// every card's pixel values by hand.
const SCALE = 1440 / 1080;

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
    <Audio src={staticFile('vo/keselowski-warning.wav')} />
  </AbsoluteFill>
);
