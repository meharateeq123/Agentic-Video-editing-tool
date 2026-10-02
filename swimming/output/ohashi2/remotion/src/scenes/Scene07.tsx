import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE7_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S07_DUR = 69;
export const S07_CUTS = [69];

export const Scene07: React.FC = () => (
  <>
    <Cuts cuts={SCENE7_CUTS} frames={S07_CUTS} amp={0.05} />
    <Sequence from={7} durationInFrames={41} layout="none">
      <Caption text="AND OHASHI SAYS HE'S READY" inAt={0} outAt={30} fontSize={50} />
    </Sequence>
    <Sequence from={50} durationInFrames={19} layout="none">
      <Caption text="FOR THE CHALLENGE" inAt={0} outAt={14} fontSize={56} />
    </Sequence>
  </>
);
