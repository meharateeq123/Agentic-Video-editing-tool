import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 98;
export const S04_CUTS = [49, 49];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={22} layout="none">
      <Caption text="AND BEAT REIGNING" inAt={0} outAt={16} fontSize={56} />
    </Sequence>
    <Sequence from={31} durationInFrames={38} layout="none">
      <Caption text="ASIAN GAMES CHAMPION" inAt={0} outAt={28} fontSize={54} />
    </Sequence>
    <Sequence from={74} durationInFrames={24} layout="none">
      <Caption text="HWANG SUN-WOO" inAt={0} outAt={18} fontSize={62} />
    </Sequence>
  </>
);
