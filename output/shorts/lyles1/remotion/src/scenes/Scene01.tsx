import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 76; // 0 -> 2.54s
export const S01_CUTS = [38, 38];

// "officially" starts at 0.80s = frame 24, "called it a season" at 1.26s = frame 38.
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={38} layout="none">
      <Caption text="NOAH LYLES has OFFICIALLY" outAt={30} fontSize={60} />
    </Sequence>
    <Sequence from={38} durationInFrames={38} layout="none">
      <Caption text="called it a SEASON." outAt={30} fontSize={62} />
    </Sequence>
  </>
);