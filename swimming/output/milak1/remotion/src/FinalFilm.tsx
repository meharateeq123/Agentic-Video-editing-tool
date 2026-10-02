import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TOTAL_FRAMES, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

import {Scene01, S01_CARD_AT} from './scenes/Scene01';
import {Scene02, S02_STAMP_AT} from './scenes/Scene02';
import {Scene03, S03_CARD_AT, S03_STAMP_AT} from './scenes/Scene03';
import {Scene04, S04_STAMP_AT} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04, Scene05];

// Every scene/component in this project is authored in 1080x1920 "design space".
const SCALE = 1;

type Hit = {at: number; src: string; volume: number};

/**
 * SFX fire ONLY where a motion graphic appears - never on a scene change, an internal cut, or the ending.
 * Two ID cards (Pop) and three stamps (Impact): 49.48, 49.45, 0.03.
 */
const HITS: Hit[] = [
  {at: startFrame(1) + S01_CARD_AT, src: 'sounds/Pop.mp3', volume: 0.35},
  {at: startFrame(2) + S02_STAMP_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(3) + S03_CARD_AT, src: 'sounds/Pop.mp3', volume: 0.35},
  {at: startFrame(3) + S03_STAMP_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(4) + S04_STAMP_AT, src: 'sounds/Impact.mp3', volume: 0.4},
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
    <Audio src={staticFile('vo/milak1.wav')} />
    {HITS.map((h, i) => (
      <Sequence key={i} from={h.at} durationInFrames={TOTAL_FRAMES - h.at} layout="none">
        <Audio src={staticFile(h.src)} volume={h.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export {TOTAL_FRAMES};
