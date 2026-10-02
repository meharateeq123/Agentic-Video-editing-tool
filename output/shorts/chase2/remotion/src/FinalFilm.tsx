import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TOTAL_FRAMES, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

import {Scene01} from './scenes/Scene01';
import {Scene02, S02_STAMP1_AT, S02_STAMP2_AT, S02_STAMP3_AT} from './scenes/Scene02';
import {Scene03, S03_STAMP_AT} from './scenes/Scene03';
import {Scene04, S04_LARSON_AT, S04_STAMP_AT, S04_HAMLIN_AT} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06, S06_STAMP1_AT, S06_STAMP2_AT} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04, Scene05, Scene06, Scene07];

// Every scene/component in this project is authored in 1080x1920 "design space". This film ships
// at 1080p, so the design-space stack renders 1:1.
const SCALE = 1;

type Hit = {at: number; src: string; volume: number};

/**
 * SFX fire ONLY where a motion graphic appears - never on a scene change, an internal cut, or the
 * ending. Graphics: the three track-name stamps (scene 2), 1.5 MI (3), the Larson card, the +1 stamp and the
 * Hamlin card (4), the 3 and 1 stamps (6) - a Pop on each ID card, an Impact on each stamp. Scenes 1, 5 and 7
 * carry no graphic and no sound.
 */
const HITS: Hit[] = [
  {at: startFrame(2) + S02_STAMP1_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(2) + S02_STAMP2_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(2) + S02_STAMP3_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(3) + S03_STAMP_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(4) + S04_LARSON_AT, src: 'sounds/Pop.mp3', volume: 0.35},
  {at: startFrame(4) + S04_STAMP_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(4) + S04_HAMLIN_AT, src: 'sounds/Pop.mp3', volume: 0.35},
  {at: startFrame(6) + S06_STAMP1_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(6) + S06_STAMP2_AT, src: 'sounds/Impact.mp3', volume: 0.4},
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
    <Audio src={staticFile('vo/chase2.wav')} />
    {HITS.map((h, i) => (
      <Sequence key={i} from={h.at} durationInFrames={TOTAL_FRAMES - h.at} layout="none">
        <Audio src={staticFile(h.src)} volume={h.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export {TOTAL_FRAMES};
