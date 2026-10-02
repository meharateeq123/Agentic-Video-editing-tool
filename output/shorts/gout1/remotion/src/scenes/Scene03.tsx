import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {VenueStamp} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 165; // 5.66 -> 11.18s
export const S03_CUTS = [38, 30, 30, 67];

// "The Australian sprint star" is frames 0-38 (Gout), "missed the World Under 20 championships" runs
// 38-98 over the two Oregon U20 shots, and "after a hamstring injury in training" (98-165) is Gout
// again, head down. The bug goes up on "World" (54) and is gone before the injury line.
const STAMP_WIN: Win = [50, 58, 92, 106];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} amp={0.06} />
    <VenueStamp title="World U20 Championships" sub="Eugene, Oregon" win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={38} layout="none">
      <Caption text="The AUSTRALIAN sprint star" outAt={30} fontSize={54} />
    </Sequence>
    <Sequence from={38} durationInFrames={60} layout="none">
      <Caption text="MISSED the World Under-20 CHAMPIONSHIPS" outAt={52} fontSize={50} />
    </Sequence>
    <Sequence from={98} durationInFrames={67} layout="none">
      <Caption text="after a HAMSTRING INJURY in training." outAt={58} fontSize={52} />
    </Sequence>
  </>
);