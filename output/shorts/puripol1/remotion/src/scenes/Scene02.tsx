import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 74;
export const S02_CUTS = [37, 37];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={3} durationInFrames={38} layout="none">
      <Caption text="THE THAI SPRINTER RETURNED" inAt={0} outAt={28} fontSize={50} />
    </Sequence>
    <Sequence from={41} durationInFrames={33} layout="none">
      <Caption text="FOR THE 200 METER FINAL" inAt={0} outAt={25} fontSize={52} />
    </Sequence>
  </>
);
