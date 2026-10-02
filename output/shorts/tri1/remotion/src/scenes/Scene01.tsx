import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 135;
export const S01_CUTS = [45, 45, 45];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={56} layout="none">
      <Caption text="THE 2028 OLYMPIC TRIATHLON" inAt={0} outAt={44} fontSize={54} />
    </Sequence>
    <Sequence from={56} durationInFrames={46} layout="none">
      <Caption text="is COMING to VENICE BEACH" inAt={0} outAt={32} fontSize={56} />
    </Sequence>
    <Sequence from={99} durationInFrames={36} layout="none">
      <Caption text="and the COURSE looks INCREDIBLE" inAt={0} outAt={26} fontSize={54} />
    </Sequence>
  </>
);
