import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {HOOK_FRAMES, OVERLAP, TRANSITION_IN, VO_ALIGNED, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';
import {HookOpen} from './components/HookOpen';

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
import {Scene21} from './scenes/Scene21';
import {Scene22} from './scenes/Scene22';
import {Scene23} from './scenes/Scene23';
import {Scene24} from './scenes/Scene24';
import {Scene25} from './scenes/Scene25';
import {Scene26} from './scenes/Scene26';
import {Scene27} from './scenes/Scene27';
import {Scene28} from './scenes/Scene28';

export const SCENES: React.FC[] = [
  Scene01, Scene02, Scene03, Scene04, Scene05, Scene06, Scene07, Scene08, Scene09, Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16, Scene17, Scene18, Scene19, Scene20, Scene21, Scene22, Scene23, Scene24, Scene25, Scene26, Scene27, Scene28,
];

/**
 * Cold open: the supplied real clip (NASCAR's own pit-road fight footage) plays full-screen with its
 * own broadcast/crowd sound before the narration starts. Every scene's `from` is pushed forward by
 * HOOK_FRAMES so timeline.ts never has to know the hook exists.
 */
export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    <Sequence from={0} durationInFrames={HOOK_FRAMES} layout="none">
      <HookOpen />
    </Sequence>

    {SCENES.map((Comp, i) => {
      const n = i + 1;
      const dur = sceneFrames(n);
      const last = n === SCENES.length;
      return (
        <Sequence key={n} from={HOOK_FRAMES + startFrame(n)} durationInFrames={dur + (last ? 0 : OVERLAP)} layout="none">
          <SceneTransition inKind={TRANSITION_IN[i]} outKind={last ? null : TRANSITION_IN[i + 1]} dur={dur} overlap={OVERLAP}>
            <Comp />
          </SceneTransition>
        </Sequence>
      );
    })}

    {VO_ALIGNED ? (
      <Sequence from={HOOK_FRAMES} layout="none">
        <Audio src={staticFile('vo/long3.wav')} />
      </Sequence>
    ) : null}
  </AbsoluteFill>
);
