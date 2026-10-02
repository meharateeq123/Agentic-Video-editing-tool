import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 49;
export const S05_CUTS = [49];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.05} maxBlur={4} dim={0.16} />
    <Sequence from={3} durationInFrames={46} layout="none">
      <Caption text="KANSAS COULD BE CHAOS" inAt={0} outAt={34} fontSize={64} />
    </Sequence>
  </>
);
