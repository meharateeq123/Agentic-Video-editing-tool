import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 148;
export const S03_CUTS = [50, 49, 49];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={50} layout="none">
      <Caption text="WIN the WORLD HALF MARATHON" outAt={40} fontSize={44} />
    </Sequence>
    <Sequence from={50} durationInFrames={50} layout="none">
      <Caption text="title and BREAK the WOMEN-ONLY" outAt={40} fontSize={42} />
    </Sequence>
    <Sequence from={100} durationInFrames={48} layout="none">
      <Caption text="RECORD by ONE SECOND!" outAt={38} fontSize={58} />
    </Sequence>
  </>
);
