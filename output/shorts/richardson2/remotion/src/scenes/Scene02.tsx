import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 154; // 3.62 -> 8.76s
export const S02_CUTS = [50, 52, 52];

// "10.80" is said at 3.18s = frame 95; the third cut is the real results board printing it.
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={50} layout="none">
      <Caption text="After a TOUGH SEASON," outAt={40} fontSize={56} />
    </Sequence>
    <Sequence from={50} durationInFrames={52} layout="none">
      <Caption text="she ended 2026 with a" outAt={42} fontSize={54} />
    </Sequence>
    <Sequence from={102} durationInFrames={52} layout="none">
      <Caption text="10.80 WIN in LONDON." outAt={44} fontSize={58} />
    </Sequence>
  </>
);