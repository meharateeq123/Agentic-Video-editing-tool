import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 104;
export const S01_CUTS = [44, 60];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={65} layout="none">
      <Caption text="FIRST, SHE EXPLODED TO 10.62" inAt={0} outAt={54} fontSize={48} />
    </Sequence>
    <Sequence from={65} durationInFrames={39} layout="none">
      <Caption text="IN THE 100 METERS" inAt={0} outAt={28} fontSize={56} />
    </Sequence>
  </>
);
