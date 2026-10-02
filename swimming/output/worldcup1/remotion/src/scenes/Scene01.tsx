import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 137;
export const S01_CUTS = [46, 46, 45];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={53} layout="none">
      <Caption text="THE 2026 SWIMMING WORLD CUP" inAt={0} outAt={40} fontSize={50} />
    </Sequence>
    <Sequence from={54} durationInFrames={33} layout="none">
      <Caption text="BEGINS OCTOBER 1" inAt={0} outAt={25} fontSize={58} />
    </Sequence>
    <Sequence from={88} durationInFrames={49} layout="none">
      <Caption text="IN BAKU, AZERBAIJAN" inAt={0} outAt={36} fontSize={56} />
    </Sequence>
  </>
);
