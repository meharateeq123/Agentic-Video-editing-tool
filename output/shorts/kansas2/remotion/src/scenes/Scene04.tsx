import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 155;
export const S04_CUTS = [39, 39, 39, 38];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={30} layout="none">
      <Caption text="WITH THE CHAMPIONSHIP" inAt={0} outAt={20} fontSize={54} />
    </Sequence>
    <Sequence from={28} durationInFrames={26} layout="none">
      <Caption text="THIS CLOSE," inAt={0} outAt={12} fontSize={64} />
    </Sequence>
    <Sequence from={56} durationInFrames={32} layout="none">
      <Caption text="ONE LATE CAUTION" inAt={0} outAt={22} fontSize={58} />
    </Sequence>
    <Sequence from={79} durationInFrames={22} layout="none">
      <Caption text="or RESTART" inAt={0} outAt={12} fontSize={62} />
    </Sequence>
    <Sequence from={96} durationInFrames={40} layout="none">
      <Caption text="could COMPLETELY FLIP" inAt={0} outAt={28} fontSize={56} />
    </Sequence>
    <Sequence from={129} durationInFrames={26} layout="none">
      <Caption text="THE STANDINGS" inAt={0} outAt={12} fontSize={62} />
    </Sequence>
  </>
);
