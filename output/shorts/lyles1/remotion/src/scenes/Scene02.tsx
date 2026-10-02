import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 86; // 2.54 -> 5.40s
export const S02_CUTS = [43, 43];

// "small strain" is 0.40-0.96s in (frames 12-29); "turned into more injury flare-ups" runs 0.96s-2.86s.
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={30} layout="none">
      <Caption text="After a small STRAIN" outAt={24} fontSize={62} />
    </Sequence>
    <Sequence from={30} durationInFrames={56} layout="none">
      <Caption text="turned into more INJURY FLARE-UPS," outAt={46} fontSize={56} />
    </Sequence>
  </>
);