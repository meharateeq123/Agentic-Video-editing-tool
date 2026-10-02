import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 102;
export const S01_CUTS = [102];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={58} layout="none">
      <Caption text="THE 2026 SWIMMING WORLD CUP" inAt={0} outAt={50} fontSize={44} />
    </Sequence>
    <Sequence from={56} durationInFrames={46} layout="none">
      <Caption text="OFFICIALLY OPENS IN BAKU" inAt={0} outAt={38} fontSize={46} />
    </Sequence>
  </>
);
