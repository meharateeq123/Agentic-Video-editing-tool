import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 61;
export const S02_CUTS = [61];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={2} durationInFrames={59} layout="none">
      <Caption text="BEFORE MOVING TO TASHKENT AND ASTANA" inAt={0} outAt={44} fontSize={44} />
    </Sequence>
  </>
);
