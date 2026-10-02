import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {RankStamp} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 102; // 7.00 -> 10.40s
export const S03_CUTS = [34, 34, 34];

// "51" is said at 7.10s = scene frame 3 and ".68" at 7.64s = frame 19, so the stamp slams down on
// the first cut and settles by 13; out0 = 13 + 30 + a few frames of read time.
const STAMP_WIN: Win = [1, 7, 52, 64];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="51.68" label="World Record" at={3} win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={45} layout="none">
      <Caption text="51.68 SECONDS," outAt={36} fontSize={60} />
    </Sequence>
    <Sequence from={62} durationInFrames={40} layout="none">
      <Caption text="BREAKING the WORLD RECORD." outAt={34} fontSize={54} />
    </Sequence>
  </>
);