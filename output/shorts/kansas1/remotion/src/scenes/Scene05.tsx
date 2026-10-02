import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 109;
export const S05_CUTS = [55, 54];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={10} durationInFrames={26} layout="none">
      <Caption text="AND at KANSAS" inAt={0} outAt={16} fontSize={58} />
    </Sequence>
    <Sequence from={34} durationInFrames={28} layout="none">
      <Caption text="ANYTHING CAN HAPPEN" inAt={0} outAt={18} fontSize={60} />
    </Sequence>
    <Sequence from={57} durationInFrames={52} layout="none">
      <Caption text="in the FINAL LAP" inAt={0} outAt={30} fontSize={68} />
    </Sequence>
  </>
);
