import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 136;
export const S03_CUTS = [45, 45, 46];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={38} layout="none">
      <Caption text="THE FIRST MAJOR CHANCE" inAt={0} outAt={28} fontSize={54} />
    </Sequence>
    <Sequence from={43} durationInFrames={46} layout="none">
      <Caption text="FOR MANY SWIMMERS TO RACE AGAIN" inAt={0} outAt={34} fontSize={46} />
    </Sequence>
    <Sequence from={91} durationInFrames={45} layout="none">
      <Caption text="AFTER THE ASIAN GAMES" inAt={0} outAt={33} fontSize={54} />
    </Sequence>
  </>
);
