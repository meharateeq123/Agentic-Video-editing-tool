import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 105;
export const S01_CUTS = [105];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={44} layout="none">
      <Caption text="YU ZIDI MAY HAVE JUST STARTED" inAt={0} outAt={34} fontSize={52} />
    </Sequence>
    <Sequence from={40} durationInFrames={58} layout="none">
      <Caption text="SWIMMING'S NEXT HUGE RIVALRY" inAt={0} outAt={48} fontSize={56} />
    </Sequence>
  </>
);
