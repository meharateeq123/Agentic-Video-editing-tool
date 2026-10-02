import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 123; // 1.96 -> 6.06s

const CUT_FRAMES = [40, 42, 41];

// "for swimming's" starts at 3.32s = scene frame 41; the second caption takes over at 42. The
// footage carries the WR flags and names itself, so there is no card.
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Sequence from={0} durationInFrames={42} layout="none">
      <Caption text="and that means ANOTHER OPPORTUNITY" outAt={34} fontSize={54} />
    </Sequence>
    <Sequence from={42} durationInFrames={81} layout="none">
      <Caption text="for swimming's BIGGEST STARS to attack the RECORD BOOKS." outAt={66} fontSize={50} />
    </Sequence>
  </>
);
