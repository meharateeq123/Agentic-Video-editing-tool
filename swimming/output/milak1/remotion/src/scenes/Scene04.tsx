import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 108;
export const S04_CUTS = [36, 40, 32];

// "0.03" is said at 16.32s = scene frame 37; the stamp lands on it and leaves ~1s after it has landed.
export const S04_STAMP_AT = 37;
const W1: Win = [33, 39, 69, 83];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="0.03" label="Seconds away" at={S04_STAMP_AT} win={W1} size={260} />
    <Sequence from={4} durationInFrames={34} layout="none">
      <Caption text="THAT MEANS MILÁK was JUST" inAt={0} outAt={28} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={78} durationInFrames={30} layout="none">
      <Caption text="from HISTORY" inAt={0} outAt={20} fontSize={66} />
    </Sequence>
  </>
);
