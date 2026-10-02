import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 86;
export const S05_CUTS = [43, 43];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={5} durationInFrames={40} layout="none">
      <Caption text="OHASHI IS NOW LOOKING" inAt={0} outAt={30} fontSize={54} />
    </Sequence>
    <Sequence from={48} durationInFrames={38} layout="none">
      <Caption text="TOWARD LA 2028" inAt={0} outAt={28} fontSize={62} />
    </Sequence>
  </>
);
