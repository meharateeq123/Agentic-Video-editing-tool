import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 186;
export const S02_CUTS = [93, 93];

// "2:06.10" is spoken from 3.8s = scene frame 114. The stamp lands on it and leaves ~1s after it
// has finished landing (last animation ends at 124, so out0 = 154).
export const S02_STAMP_AT = 114;
const W_STAMP: Win = [108, 114, 154, 180];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="2:06.10" label="200 IM" at={S02_STAMP_AT} win={W_STAMP} size={140} />
    <Sequence from={0} durationInFrames={36} layout="none">
      <Caption text="AT THE ASIAN GAMES," inAt={0} outAt={28} fontSize={50} />
    </Sequence>
    <Sequence from={38} durationInFrames={70} layout="none">
      <Caption text="THE 13-YEAR-OLD CHINESE STAR SWAM" inAt={0} outAt={60} fontSize={46} />
    </Sequence>
  </>
);
