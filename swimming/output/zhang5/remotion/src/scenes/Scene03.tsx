import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 117;
export const S03_CUTS = [117];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={2} durationInFrames={76} layout="none">
      <Caption text="BECOMING THE FIRST SWIMMER EVER" inAt={0} outAt={64} fontSize={46} />
    </Sequence>
    <Sequence from={70} durationInFrames={47} layout="none">
      <Caption text="TO REACH THAT NUMBER AT A SINGLE ASIAN GAMES" inAt={0} outAt={40} fontSize={38} />
    </Sequence>
  </>
);
