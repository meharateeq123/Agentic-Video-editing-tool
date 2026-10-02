import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 89;
export const S01_CUTS = [45, 44];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={36} layout="none">
      <Caption text="KANSAS HAS BECOME ONE" inAt={0} outAt={28} fontSize={54} />
    </Sequence>
    <Sequence from={31} durationInFrames={24} layout="none">
      <Caption text="of NASCAR'S" inAt={0} outAt={14} fontSize={56} />
    </Sequence>
    <Sequence from={55} durationInFrames={34} layout="none">
      <Caption text="WILDEST CHASE TRACKS" inAt={0} outAt={26} fontSize={58} />
    </Sequence>
  </>
);
