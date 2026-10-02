import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 119; // 15.90 -> 19.88s
export const S05_CUTS = [60, 59];

// "unexpected championship run" starts at 17.08s = scene frame 35.
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={34} layout="none">
      <Caption text="Could BRISTOL be where" inAt={0} outAt={28} fontSize={62} />
    </Sequence>
    <Sequence from={34} durationInFrames={85} layout="none">
      <Caption text="this UNEXPECTED CHAMPIONSHIP RUN gets even CRAZIER?" outAt={64} fontSize={52} />
    </Sequence>
  </>
);
