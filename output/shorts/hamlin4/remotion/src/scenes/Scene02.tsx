import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 108;
export const S02_CUTS = [54, 54];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={53} layout="none">
      <Caption text="HE'S LOST THE LAST TWO KANSAS RACES" inAt={0} outAt={41} fontSize={50} />
    </Sequence>
    <Sequence from={60} durationInFrames={48} layout="none">
      <Caption text="AFTER OVERTIME RESTARTS" inAt={0} outAt={36} fontSize={56} />
    </Sequence>
  </>
);
