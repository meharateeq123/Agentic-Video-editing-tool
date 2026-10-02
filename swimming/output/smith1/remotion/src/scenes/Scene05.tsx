import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 40; // 22.08 -> 23.40s
export const S05_CUTS = [40];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="What HAPPENED at NIGHT?" outAt={32} fontSize={62} />
    </Sequence>
  </>
);