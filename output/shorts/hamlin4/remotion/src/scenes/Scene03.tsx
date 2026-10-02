import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 115;
export const S03_CUTS = [39, 76];

// "290" is said at 7.58s = scene frame 18. The stamp lands on it over the shot of the #11 running
// ahead of the #5, and leaves ~1s after it has finished landing (last animation ends at 28).
export const S03_STAMP_AT = 18;
const W_STAMP: Win = [12, 18, 58, 70];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="290" label="of 547 laps led" at={S03_STAMP_AT} win={W_STAMP} size={300} />
    <Sequence from={2} durationInFrames={38} layout="none">
      <Caption text="DESPITE LEADING 290" inAt={0} outAt={29} fontSize={58} />
    </Sequence>
    <Sequence from={50} durationInFrames={65} layout="none">
      <Caption text="OF THE LAST 547 LAPS HERE" inAt={0} outAt={48} fontSize={54} />
    </Sequence>
  </>
);
