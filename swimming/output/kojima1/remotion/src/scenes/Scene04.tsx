import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 126;
export const S04_CUTS = [63, 63];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={44} layout="none">
      <Caption text="He even went FASTER than" outAt={34} fontSize={46} />
    </Sequence>
    <Sequence from={44} durationInFrames={40} layout="none">
      <Caption text="MICHAEL PHELPS' old" outAt={30} fontSize={52} />
    </Sequence>
    <Sequence from={84} durationInFrames={42} layout="none">
      <Caption text="UNOFFICIAL JUNIOR BEST" outAt={34} fontSize={46} />
    </Sequence>
  </>
);
