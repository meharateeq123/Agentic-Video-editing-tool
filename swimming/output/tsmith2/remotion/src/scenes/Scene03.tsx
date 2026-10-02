import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 136;
export const S03_CUTS = [34, 34, 34, 34];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={10} durationInFrames={44} layout="none">
      <Caption text="SHE SAYS SHE STARTED" inAt={0} outAt={36} fontSize={54} />
    </Sequence>
    <Sequence from={58} durationInFrames={36} layout="none">
      <Caption text="MISSING the WATER" inAt={0} outAt={24} fontSize={60} />
    </Sequence>
    <Sequence from={82} durationInFrames={28} layout="none">
      <Caption text="and REDISCOVERED" inAt={0} outAt={16} fontSize={56} />
    </Sequence>
    <Sequence from={109} durationInFrames={27} layout="none">
      <Caption text="her LOVE for SWIMMING" inAt={0} outAt={20} fontSize={56} />
    </Sequence>
  </>
);
