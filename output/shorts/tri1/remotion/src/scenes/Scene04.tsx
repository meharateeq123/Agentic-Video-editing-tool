import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 118;
export const S04_CUTS = [39, 39, 40];

// "10" is said at 9.14s = scene frame 30; the stamp lands on it and leaves ~1s after it has landed.
export const S04_STAMP_AT = 30;
const W1: Win = [24, 30, 60, 72];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="10 KM" label="Run" at={S04_STAMP_AT} win={W1} size={230} />
    <Sequence from={8} durationInFrames={26} layout="none">
      <Caption text="THEN FINISH WITH A" inAt={0} outAt={18} fontSize={54} />
    </Sequence>
    <Sequence from={29} durationInFrames={28} layout="none">
      <Caption text="10 KM RUN" inAt={0} outAt={24} fontSize={68} />
    </Sequence>
    <Sequence from={57} durationInFrames={24} layout="none">
      <Caption text="along the ICONIC" inAt={0} outAt={18} fontSize={56} />
    </Sequence>
    <Sequence from={81} durationInFrames={37} layout="none">
      <Caption text="LOS ANGELES COASTLINE" inAt={0} outAt={26} fontSize={58} />
    </Sequence>
  </>
);
