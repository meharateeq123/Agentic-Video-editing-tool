import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 103;
export const S03_CUTS = [52, 51];

// "fifth" is said at 13.35s = scene frame 15; the stamp lands on it and leaves ~1s after it has landed.
export const S03_STAMP_AT = 15;
const W1: Win = [11, 17, 45, 57];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <RankStamp value="No. 5" label="Fastest ever, 400 IM" at={S03_STAMP_AT} win={W1} size={150} y={-1300} />
    <Sequence from={4} durationInFrames={38} layout="none">
      <Caption text="MAKING HER the FIFTH FASTEST" inAt={0} outAt={30} fontSize={48} bottom={430} />
    </Sequence>
    <Sequence from={48} durationInFrames={48} layout="none">
      <Caption text="PERFORMER in HISTORY" inAt={0} outAt={36} fontSize={54} bottom={430} />
    </Sequence>
  </>
);
