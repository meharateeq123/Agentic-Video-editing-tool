import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TOTAL_FRAMES, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

import {Scene01} from './scenes/Scene01';
import {Scene02, S02_STAMP_AT} from './scenes/Scene02';
import {Scene03, S03_SLAM_AT} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04, Scene05, Scene06];

// Every scene/component in this project is authored in 1080x1920 "design space". This film ships
// at 1080p, so the design-space stack renders 1:1.
const SCALE = 1;

type Hit = {at: number; src: string; volume: number};

/**
 * SFX fire ONLY where a motion graphic appears, and nowhere else. There is still no whoosh on a
 * scene change or an internal cut, and no riser at the end — those were each removed on the user's
 * instruction and stay gone. This film has exactly two graphics, so it has exactly two hits: a pop
 * as the Budapest venue bug slides in, and an impact as 1:47.79 slams down.
 *
 * Scene 6 gets nothing: it is the real commentary at full volume and a synthetic sound over it
 * would break the illusion that the viewer is listening to the broadcast.
 */
const HITS: Hit[] = [
  {at: startFrame(2) + S02_STAMP_AT, src: 'sounds/Pop.mp3', volume: 0.35},
  {at: startFrame(3) + S03_SLAM_AT, src: 'sounds/Impact.mp3', volume: 0.4},
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
    <Audio src={staticFile('vo/kerr1.wav')} />
    {HITS.map((h, i) => (
      <Sequence key={i} from={h.at} durationInFrames={TOTAL_FRAMES - h.at} layout="none">
        <Audio src={staticFile(h.src)} volume={h.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export {TOTAL_FRAMES};
