import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 85;
export const S06_CUTS = [52, 33];

export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={44} layout="none">
      <Caption text="HOW FAST CAN SHIN OHASHI" inAt={0} outAt={33} fontSize={56} />
    </Sequence>
    <Sequence from={50} durationInFrames={35} layout="none">
      <Caption text="REALLY GO?" inAt={0} outAt={26} fontSize={72} />
    </Sequence>
  </>
);
