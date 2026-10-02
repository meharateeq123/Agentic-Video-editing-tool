import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 54;
export const S02_CUTS = [54];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.05} />
    <Sequence from={3} durationInFrames={51} layout="none">
      <Caption text="SETTING A GAMES RECORD IN ALL THREE" inAt={0} outAt={38} fontSize={48} />
    </Sequence>
  </>
);
