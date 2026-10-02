import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 86;
export const S01_CUTS = [43, 43];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={32} layout="none">
      <Caption text="AFTER RETIRING" inAt={0} outAt={22} fontSize={60} />
    </Sequence>
    <Sequence from={30} durationInFrames={56} layout="none">
      <Caption text="following the PARIS 2024 OLYMPICS" inAt={0} outAt={45} fontSize={54} />
    </Sequence>
  </>
);
