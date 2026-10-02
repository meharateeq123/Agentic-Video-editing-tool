import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 127;
export const S05_CUTS = [64, 63];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={34} layout="none">
      <Caption text="SHE'S ONLY 13" inAt={0} outAt={26} fontSize={58} />
    </Sequence>
    <Sequence from={40} durationInFrames={52} layout="none">
      <Caption text="SO HOW CLOSE CAN YU GET" inAt={0} outAt={44} fontSize={50} />
    </Sequence>
    <Sequence from={90} durationInFrames={37} layout="none">
      <Caption text="TO SUMMER BY LA 2028?" inAt={0} outAt={28} fontSize={54} />
    </Sequence>
  </>
);
