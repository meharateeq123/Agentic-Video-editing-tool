import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {VenueStamp} from '../components/Stamp';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 142; // 10.40 -> 15.12s
export const S04_CUTS = [36, 36, 36, 34];

// "World Championships" runs 2.64s-3.6s (frames 79-108); "Singapore" is said at 3.94s = frame 118.
// The bug goes up just before it. The third cut is the real results board (STEENBERGEN 1), the last is
// her cap, NED STEENBERGEN - so the win is proved twice on the footage itself, no built card.
const STAMP_WIN: Win = [108, 116, 140, 152];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} amp={0.06} />
    <VenueStamp title="Singapore" sub="World Championships" win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={57} layout="none">
      <Caption text="She also WON the 100 FREE" outAt={46} fontSize={52} />
    </Sequence>
    <Sequence from={57} durationInFrames={52} layout="none">
      <Caption text="at the 2026 WORLD CHAMPIONSHIPS" outAt={44} fontSize={46} />
    </Sequence>
    <Sequence from={109} durationInFrames={33} layout="none">
      <Caption text="in SINGAPORE." outAt={26} fontSize={62} />
    </Sequence>
  </>
);