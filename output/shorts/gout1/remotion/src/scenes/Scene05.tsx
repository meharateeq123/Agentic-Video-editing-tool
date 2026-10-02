import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 125; // 16.20 -> 20.36s
export const S05_CUTS = [54, 71];

// "how fast" starts at 1.80s = scene frame 54, "Gout" at 72, "when he comes back" at 87-102.
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={54} layout="none">
      <Caption text="Now the BIG QUESTION is SIMPLE:" outAt={44} fontSize={52} />
    </Sequence>
    <Sequence from={54} durationInFrames={33} layout="none">
      <Caption text="HOW FAST will GOUT be" outAt={28} fontSize={56} />
    </Sequence>
    <Sequence from={87} durationInFrames={38} layout="none">
      <Caption text="when he comes BACK?" outAt={38} fontSize={64} />
    </Sequence>
  </>
);