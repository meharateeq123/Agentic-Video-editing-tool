import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 109;
export const S04_CUTS = [55, 54];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={2} durationInFrames={38} layout="none">
      <Caption text="THAT MATCHED THE ASIAN RECORD" inAt={0} outAt={28} fontSize={48} />
    </Sequence>
    <Sequence from={41} durationInFrames={46} layout="none">
      <Caption text="AND COMPLETED HIS SPRINT DOUBLE" inAt={0} outAt={34} fontSize={48} />
    </Sequence>
    <Sequence from={88} durationInFrames={21} layout="none">
      <Caption text="IN NAGOYA" inAt={0} outAt={16} fontSize={66} />
    </Sequence>
  </>
);
