import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TRANSITION_IN, VO_ALIGNED, sceneFrames, startFrame} from './timeline';
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
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';
import {Scene13} from './scenes/Scene13';
import {Scene14} from './scenes/Scene14';
import {Scene15} from './scenes/Scene15';
import {Scene16} from './scenes/Scene16';
import {Scene17} from './scenes/Scene17';
import {Scene18} from './scenes/Scene18';
import {Scene19} from './scenes/Scene19';
import {Scene20} from './scenes/Scene20';

export const SCENES: React.FC[] = [
  Scene01, Scene02, Scene03, Scene04, Scene05,
  Scene06, Scene07, Scene08, Scene09, Scene10,
  Scene11, Scene12, Scene13, Scene14, Scene15,
  Scene16, Scene17, Scene18, Scene19, Scene20,
];

/**
 * Scene boundaries use the cycled TRANSITION_IN moves; the cuts *inside* a scene are handled by
 * BedChain's own short link transitions, so the film has movement at both levels without either
 * one lasting long enough to notice.
 */
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
    {VO_ALIGNED ? <Audio src={staticFile('vo/tts-audio.wav')} /> : null}
  </AbsoluteFill>
);
