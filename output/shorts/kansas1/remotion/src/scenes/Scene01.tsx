import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 89;
export const S01_CUTS = [45, 44];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={46} layout="none">
      <Caption text="KANSAS has BECOME NASCAR'S" inAt={0} outAt={34} fontSize={56} />
    </Sequence>
    <Sequence from={46} durationInFrames={43} layout="none">
      <Caption text="WILDEST late-race TRACK" inAt={0} outAt={40} fontSize={60} />
    </Sequence>
  </>
);
