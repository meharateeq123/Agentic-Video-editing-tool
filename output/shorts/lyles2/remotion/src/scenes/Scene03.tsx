import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 134;
export const S03_CUTS = [70, 64];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} />
    <Sequence from={1} durationInFrames={63} layout="none">
      <Caption text="AFTER FACING SETBACKS EARLIER IN THE SEASON" inAt={0} outAt={48} fontSize={42} />
    </Sequence>
    <Sequence from={73} durationInFrames={58} layout="none">
      <Caption text="NOAH CAME BACK WITH SERIOUS SPEED" inAt={0} outAt={44} fontSize={46} />
    </Sequence>
  </>
);
