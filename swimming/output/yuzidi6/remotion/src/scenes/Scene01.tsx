import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 137;
export const S01_CUTS = [46, 46, 45];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={38} layout="none">
      <Caption text="THE CHINESE TEENAGER WON" inAt={0} outAt={28} fontSize={54} />
    </Sequence>
    <Sequence from={40} durationInFrames={62} layout="none">
      <Caption text="THE 200 FLY, 200 IM" inAt={0} outAt={46} fontSize={58} />
    </Sequence>
    <Sequence from={103} durationInFrames={34} layout="none">
      <Caption text="AND THE 400 IM" inAt={0} outAt={25} fontSize={62} />
    </Sequence>
  </>
);
