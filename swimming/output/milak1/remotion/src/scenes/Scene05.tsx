import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 67;
export const S05_CUTS = [34, 33];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} maxBlur={0} dim={0} />
    <Sequence from={4} durationInFrames={63} layout="none">
      <Caption text="COULD the RECORD FINALLY FALL?" inAt={0} outAt={56} fontSize={62} />
    </Sequence>
  </>
);
