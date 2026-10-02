import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04, Scene05, Scene06, Scene07, Scene08, Scene09, Scene10];

/** No cold open: the VO starts at frame 0. */
export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    {/* Every scene is laid out in a 1920x1080 design space; the composition is 2560x1440, so the stack
        is scaled by 4/3 (graphics and type stay exactly where they were designed). */}
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: 'scale(1)', transformOrigin: '0 0'}}>
    {SCENES.map((Comp, i) => {
      const n = i + 1;
      const dur = sceneFrames(n);
      const last = n === SCENES.length;
      return (
        <Sequence key={n} from={startFrame(n)} durationInFrames={dur + (last ? 0 : OVERLAP)} layout="none">
          <SceneTransition inKind={TRANSITION_IN[i]} outKind={last ? null : TRANSITION_IN[i + 1]} dur={dur} overlap={OVERLAP}>
            <Comp />
          </SceneTransition>
        </Sequence>
      );
    })}
    </div>
    <Sequence from={0} layout="none">
      <Audio src={staticFile('vo/eddie1.wav')} />
    </Sequence>
  </AbsoluteFill>
);
