import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 102;
export const S03_CUTS = [51, 51];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={2} durationInFrames={41} layout="none">
      <Caption text="SHE PULLED AWAY IN THE SECOND HALF" inAt={0} outAt={31} fontSize={46} />
    </Sequence>
    <Sequence from={44} durationInFrames={58} layout="none">
      <Caption text="AND SET A NEW ATHLOS MEETING RECORD" inAt={0} outAt={43} fontSize={46} />
    </Sequence>
  </>
);
