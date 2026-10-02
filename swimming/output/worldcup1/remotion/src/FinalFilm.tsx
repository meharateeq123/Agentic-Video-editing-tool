import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TOTAL_FRAMES, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04, Scene05];

const SCALE = 1;

/**
 * No motion graphics in this one - the meets, cities and dates are already printed by the official
 * World Aquatics promo cards the footage comes from, so adding a stamp would only repeat them
 * (flick-info-without-cards: prefer the real graphic). No graphics means no SFX hits either.
 */
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
    <Audio src={staticFile('vo/worldcup1.wav')} />
  </AbsoluteFill>
);

export {TOTAL_FRAMES};
