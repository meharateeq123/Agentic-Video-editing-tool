import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 137;
export const S01_CUTS = [69, 68];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={42} layout="none">
      <Caption text="SHIN OHASHI JUST BROKE" inAt={0} outAt={30} fontSize={58} />
    </Sequence>
    <Sequence from={44} durationInFrames={58} layout="none">
      <Caption text="THE 200m BREASTSTROKE WORLD RECORD" inAt={0} outAt={44} fontSize={52} />
    </Sequence>
    <Sequence from={104} durationInFrames={33} layout="none">
      <Caption text="AND HE'S ONLY 17" inAt={0} outAt={24} fontSize={64} />
    </Sequence>
  </>
);
