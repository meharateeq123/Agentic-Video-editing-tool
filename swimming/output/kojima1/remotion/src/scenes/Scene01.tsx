import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 132;
export const S01_CUTS = [66, 66];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={44} layout="none">
      <Caption text="YUMEKI KOJIMA just" outAt={36} fontSize={50} />
    </Sequence>
    <Sequence from={44} durationInFrames={40} layout="none">
      <Caption text="did something HUGE" outAt={32} fontSize={56} />
    </Sequence>
    <Sequence from={84} durationInFrames={48} layout="none">
      <Caption text="at the ASIAN GAMES!" outAt={40} fontSize={56} />
    </Sequence>
  </>
);
