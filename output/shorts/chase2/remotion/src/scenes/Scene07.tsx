import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE7_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S07_DUR = 69;
export const S07_CUTS = [35, 34];

export const Scene07: React.FC = () => (
  <>
    <Cuts cuts={SCENE7_CUTS} frames={S07_CUTS} amp={0.05} />
    <Sequence from={3} durationInFrames={30} layout="none">
      <Caption text="AND EVERYTHING" inAt={0} outAt={14} fontSize={62} />
    </Sequence>
    <Sequence from={19} durationInFrames={50} layout="none">
      <Caption text="COULD CHANGE!" inAt={0} outAt={22} fontSize={78} />
    </Sequence>
  </>
);
