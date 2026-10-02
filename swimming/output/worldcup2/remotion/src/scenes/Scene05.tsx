import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 58;
export const S05_CUTS = [58];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} />
    <Sequence from={4} durationInFrames={24} layout="none">
      <Caption text="COULD WE SEE ANOTHER" inAt={0} outAt={18} fontSize={48} />
    </Sequence>
    <Sequence from={24} durationInFrames={32} layout="none">
      <Caption text="WORLD RECORD?" inAt={0} outAt={24} fontSize={58} />
    </Sequence>
  </>
);
