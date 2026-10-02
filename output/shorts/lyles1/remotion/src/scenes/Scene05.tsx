import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {RankStamp} from '../components/Stamp';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 117; // 12.44 -> 16.34s
export const S05_CUTS = [37, 42, 38];

// "9" is said at 1.24s = frame 37 and ".79" at 1.56s = frame 47, so the stamp slams down on the cut to
// the finish (frame 37) and is gone by 84. The third cut is the real NBC results board, which prints
// "1 NOAH LYLES 9.79" itself under "at USAs this year" - no card.
const STAMP_WIN: Win = [36, 42, 74, 84];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="9.79" label="USA Championships" at={37} win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={36} layout="none">
      <Caption text="But remember, he ALREADY RAN" outAt={30} fontSize={54} />
    </Sequence>
    <Sequence from={70} durationInFrames={47} layout="none">
      <Caption text="at USAs THIS YEAR." outAt={38} fontSize={62} />
    </Sequence>
  </>
);