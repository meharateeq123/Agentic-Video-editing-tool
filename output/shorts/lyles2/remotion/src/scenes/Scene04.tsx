import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 127;
export const S04_CUTS = [55, 72];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={57} layout="none">
      <Caption text="THE BIG QUESTION IS CAN LYLES CARRY" inAt={0} outAt={44} fontSize={48} />
    </Sequence>
    <Sequence from={57} durationInFrames={60} layout="none">
      <Caption text="THIS SPEED INTO HIS NEXT MAJOR SHOWDOWN?" inAt={0} outAt={46} fontSize={44} />
    </Sequence>
  </>
);
