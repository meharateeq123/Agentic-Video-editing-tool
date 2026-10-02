import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {OVERLAP, TOTAL_FRAMES, TRANSITION_IN, sceneFrames, startFrame} from './timeline';
import {SceneTransition} from './components/Transition';

import {Scene01, S01_CUTS, S01_POPS} from './scenes/Scene01';
import {Scene02, S02_CUTS, S02_POPS, S02_SLAM_AT} from './scenes/Scene02';
import {Scene03, S03_CUTS, S03_POPS, S03_SLAM_AT} from './scenes/Scene03';
import {Scene04, S04_CUTS, S04_POPS, S04_SLAM_AT} from './scenes/Scene04';
import {Scene05, S05_CUTS} from './scenes/Scene05';
import {cutStarts} from './scenes/Cuts';

export const SCENES: React.FC[] = [Scene01, Scene02, Scene03, Scene04, Scene05];
const SCENE_CUTS = [S01_CUTS, S02_CUTS, S03_CUTS, S04_CUTS, S05_CUTS];
const SCENE_POPS = [S01_POPS, S02_POPS, S03_POPS, S04_POPS, []];

// Every scene/component in this project is authored in 1080x1920 "design space". This film ships
// at 1080p, so the design-space stack renders 1:1.
const SCALE = 1;

type Hit = {at: number; src: string; volume: number};

/**
 * The SFX track, all in absolute frames: a whoosh on every scene transition and internal cut, a pop
 * as each card element lands, an impact on each slammed number, and a riser under the closing
 * question. Every effect sits well under the VO.
 */
const HITS: Hit[] = [
  ...SCENES.flatMap((_, i) => {
    const s = startFrame(i + 1);
    const whooshes = [...(i === 0 ? [] : [0]), ...cutStarts(SCENE_CUTS[i])];
    return whooshes.map((f) => ({at: s + f, src: 'sounds/transitions.mp3', volume: 0.35}));
  }),
  ...SCENE_POPS.flatMap((pops, i) => pops.map((f) => ({at: startFrame(i + 1) + f, src: 'sounds/Pop.mp3', volume: 0.4}))),
  {at: startFrame(2) + S02_SLAM_AT, src: 'sounds/Impact.mp3', volume: 0.45},
  {at: startFrame(3) + S03_SLAM_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(4) + S04_SLAM_AT, src: 'sounds/Impact.mp3', volume: 0.4},
  {at: startFrame(5) + 10, src: 'sounds/riser.mp3', volume: 0.22},
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
    <Audio src={staticFile('vo/hocevar2.wav')} />
    {HITS.map((h, i) => (
      <Sequence key={i} from={h.at} durationInFrames={TOTAL_FRAMES - h.at} layout="none">
        <Audio src={staticFile(h.src)} volume={h.volume} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
