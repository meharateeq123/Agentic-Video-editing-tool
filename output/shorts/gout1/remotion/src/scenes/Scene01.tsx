import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 103; // 0 -> 3.44s
export const S01_CUTS = [52, 51];

// "2026 season" is 0.58s-1.36s, "ended earlier than expected" 1.84s-3.44s (frames 55-103).
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={52} layout="none">
      <Caption text="GOUT GOUT'S 2026 SEASON" outAt={44} fontSize={56} />
    </Sequence>
    <Sequence from={52} durationInFrames={51} layout="none">
      <Caption text="ended EARLIER than EXPECTED," outAt={42} fontSize={56} />
    </Sequence>
  </>
);