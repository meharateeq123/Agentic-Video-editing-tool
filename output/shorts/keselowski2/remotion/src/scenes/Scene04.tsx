import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 125;
export const S04_CUTS = [63, 62];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} maxBlur={4} dim={0.16} />
    <Sequence from={4} durationInFrames={64} layout="none">
      <Caption text="CAN SKARBOWSKI IMMEDIATELY" inAt={0} outAt={48} fontSize={48} bottom={430} />
    </Sequence>
    <Sequence from={68} durationInFrames={54} layout="none">
      <Caption text="TURN THINGS AROUND for KESELOWSKI?" inAt={0} outAt={42} fontSize={40} bottom={430} />
    </Sequence>
  </>
);
