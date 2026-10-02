import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 97;
export const S02_CUTS = [49, 48];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={14} durationInFrames={34} layout="none">
      <Caption text="DOUBLE OLYMPIC CHAMPION" inAt={0} outAt={26} fontSize={54} />
    </Sequence>
    <Sequence from={44} durationInFrames={26} layout="none">
      <Caption text="TATJANA SMITH" inAt={0} outAt={18} fontSize={64} />
    </Sequence>
    <Sequence from={65} durationInFrames={32} layout="none">
      <Caption text="is OFFICIALLY BACK!" inAt={0} outAt={26} fontSize={62} />
    </Sequence>
  </>
);
