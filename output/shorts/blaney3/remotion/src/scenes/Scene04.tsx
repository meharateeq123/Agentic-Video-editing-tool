import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 70;
export const S04_CUTS = [35, 35];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.05} maxBlur={4} dim={0.16} />
    <Sequence from={3} durationInFrames={64} layout="none">
      <Caption text="BUT IS THIS RIVALRY REALLY OVER?" inAt={0} outAt={50} fontSize={48} bottom={430} />
    </Sequence>
  </>
);
