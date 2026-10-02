import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 58;
export const S01_CUTS = [58];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={58} layout="none">
      <Caption text="AFTER TAKING THIRD IN BUDAPEST" inAt={0} outAt={43} fontSize={50} />
    </Sequence>
  </>
);
