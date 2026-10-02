import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {RankStamp} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 158; // 9.78 -> 15.04s
export const S03_CUTS = [53, 53, 52];

// "57" is said at 7.8s = frame 8; ".86" finishes by frame 22. The stamp slams down on the prelim
// swim and is gone before the real results board (s3d) prints "58.11" itself at the end.
const STAMP_WIN: Win = [6, 12, 62, 76];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="57.86" label="100 Back Prelim" at={8} win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={58} layout="none">
      <Caption text="She went 57.86 in the" outAt={46} fontSize={54} />
    </Sequence>
    <Sequence from={58} durationInFrames={57} layout="none">
      <Caption text="100 BACK PRELIM before finishing" outAt={46} fontSize={44} />
    </Sequence>
    <Sequence from={115} durationInFrames={43} layout="none">
      <Caption text="with 58.11," outAt={34} fontSize={62} />
    </Sequence>
  </>
);