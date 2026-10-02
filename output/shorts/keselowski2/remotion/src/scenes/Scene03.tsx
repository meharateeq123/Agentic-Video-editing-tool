import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 63;
export const S03_CUTS = [63];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={4} durationInFrames={56} layout="none">
      <Caption text="HIS FIRST REAL TEST COMES SUNDAY" inAt={0} outAt={44} fontSize={48} bottom={430} />
    </Sequence>
  </>
);
