import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 54;
export const S05_CUTS = [27, 27];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.06} />
    <Sequence from={2} durationInFrames={22} layout="none">
      <Caption text="EVERY MISTAKE" inAt={0} outAt={12} fontSize={62} />
    </Sequence>
    <Sequence from={22} durationInFrames={32} layout="none">
      <Caption text="could be MASSIVE" inAt={0} outAt={18} fontSize={68} />
    </Sequence>
  </>
);
