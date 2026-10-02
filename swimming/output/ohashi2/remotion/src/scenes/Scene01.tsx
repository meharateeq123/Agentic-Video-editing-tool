import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 104;
export const S01_CUTS = [52, 52];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={48} layout="none">
      <Caption text="LEON MARCHAND HAS ALREADY NOTICED" inAt={0} outAt={36} fontSize={46} />
    </Sequence>
    <Sequence from={50} durationInFrames={54} layout="none">
      <Caption text="SWIMMING'S NEWEST RISING STAR" inAt={0} outAt={40} fontSize={50} />
    </Sequence>
  </>
);
