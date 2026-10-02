import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 108;
export const S01_CUTS = [36, 36, 36];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={45} layout="none">
      <Caption text="NASCAR'S CHAMPIONSHIP BATTLE" inAt={0} outAt={40} fontSize={54} />
    </Sequence>
    <Sequence from={42} durationInFrames={46} layout="none">
      <Caption text="is ENTERING a DANGEROUS" inAt={0} outAt={32} fontSize={54} />
    </Sequence>
    <Sequence from={78} durationInFrames={30} layout="none">
      <Caption text="THREE-RACE STRETCH" inAt={0} outAt={22} fontSize={62} />
    </Sequence>
  </>
);
