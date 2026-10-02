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

type Hit = {at: number; src: string; volume: number};
const HITS: Hit[] = [
  {at: startFrame(1) + 84, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(2) + 140, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(3) + 55, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(4) + 26, src: 'sounds/Impact.mp3', volume: 0.4},
];

export const FinalFilm: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    <div style={{width: 1080, height: 1920, transform: `scale(${SCALE})`, transformOrigin: '0 0'}}>
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
    <Audio src={staticFile('vo/yuzidi9.wav')} />
    {HITS.map((h, i) => (
      <Sequence key={i} from={h.at} durationInFrames={TOTAL_FRAMES - h.at} layout="none">
        <Audio src={staticFile(h.src)} volume={h.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export {TOTAL_FRAMES};
