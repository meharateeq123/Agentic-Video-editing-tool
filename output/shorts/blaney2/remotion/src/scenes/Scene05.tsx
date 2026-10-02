import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 136; // 19.68 -> 24.20s

const CUT_FRAMES = [68, 68];

// "is NASCAR" starts at 21.30s = scene frame 49, so the question caption takes over there.
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={CUT_FRAMES} amp={0.06} />
    <Sequence from={0} durationInFrames={46} layout="none">
      <Caption text="Now the BIG QUESTION is..." outAt={38} fontSize={56} />
    </Sequence>
    <Sequence from={46} durationInFrames={90} layout="none">
      <Caption text="Is NASCAR facing a SERIOUS BRAKE PROBLEM?" outAt={76} fontSize={54} />
    </Sequence>
  </>
);
