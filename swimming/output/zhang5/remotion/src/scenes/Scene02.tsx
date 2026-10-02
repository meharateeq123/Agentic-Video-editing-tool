import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 151;
export const S02_CUTS = [76, 75];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={0} durationInFrames={54} layout="none">
      <Caption text="THE 19-YEAR-OLD CHINESE SWIMMER" inAt={0} outAt={46} fontSize={46} />
    </Sequence>
    <Sequence from={44} durationInFrames={90} layout="none">
      <Caption text="WON A RECORD SEVEN GOLD MEDALS" inAt={0} outAt={82} fontSize={46} />
    </Sequence>
  </>
);
