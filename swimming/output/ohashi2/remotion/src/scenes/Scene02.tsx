import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 101;
export const S02_CUTS = [51, 50];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={6} durationInFrames={39} layout="none">
      <Caption text="AFTER SHIN OHASHI BROKE" inAt={0} outAt={29} fontSize={52} />
    </Sequence>
    <Sequence from={46} durationInFrames={55} layout="none">
      <Caption text="THE 200m BREASTSTROKE WORLD RECORD" inAt={0} outAt={41} fontSize={46} />
    </Sequence>
  </>
);
