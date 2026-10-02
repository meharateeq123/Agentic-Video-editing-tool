import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 82;
export const S01_CUTS = [82];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="ZHANG ZHANSHUO JUST MADE" inAt={0} outAt={32} fontSize={52} />
    </Sequence>
    <Sequence from={36} durationInFrames={46} layout="none">
      <Caption text="ASIAN GAMES HISTORY" inAt={0} outAt={38} fontSize={58} />
    </Sequence>
  </>
);
