import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 149;
export const S02_CUTS = [50, 50, 49];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={44} layout="none">
      <Caption text="SHE BEAT TEAMMATE WU QINGFENG" inAt={0} outAt={33} fontSize={48} />
    </Sequence>
    <Sequence from={50} durationInFrames={42} layout="none">
      <Caption text="AND JAPAN'S RIKAKO IKEE" inAt={0} outAt={31} fontSize={52} />
    </Sequence>
    <Sequence from={93} durationInFrames={56} layout="none">
      <Caption text="TO TAKE ANOTHER ASIAN GAMES GOLD" inAt={0} outAt={42} fontSize={48} />
    </Sequence>
  </>
);
