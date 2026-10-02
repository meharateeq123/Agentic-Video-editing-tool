import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 143; // 13.50 -> 18.28s

const CUT_FRAMES = [48, 45, 50];

// "Can Bell" starts at 15.90s = scene frame 72, so the question caption takes over there.
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Sequence from={0} durationInFrames={72} layout="none">
      <Caption text="Bell CAN'T AFFORD another bad race." outAt={60} fontSize={52} />
    </Sequence>
    <Sequence from={72} durationInFrames={71} layout="none">
      <Caption text="Can Bell STRIKE BACK under the lights?" outAt={56} fontSize={54} />
    </Sequence>
  </>
);
