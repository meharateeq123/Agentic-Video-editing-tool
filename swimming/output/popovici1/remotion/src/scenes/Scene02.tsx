import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 197;
export const S02_CUTS = [33, 47, 37, 40, 40];

// "46.51" is said at 4.8s = scene frame 38. The stamp lands on it at the top of the frame (the real results graphic sits in
// the middle of the fill beat) and leaves ~1s after it has landed.
export const S02_STAMP_AT = 38;
const W1: Win = [34, 40, 78, 90];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <RankStamp value="46.51" label="100 m freestyle" at={S02_STAMP_AT} win={W1} size={190} y={-1300} />
    <Sequence from={3} durationInFrames={34} layout="none">
      <Caption text="HIS EUROPEAN RECORD" inAt={0} outAt={24} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={80} durationInFrames={38} layout="none">
      <Caption text="in the 100 FREESTYLE" inAt={0} outAt={26} fontSize={56} bottom={430} />
    </Sequence>
    <Sequence from={119} durationInFrames={78} layout="none">
      <Caption text="at the 2025 WORLD CHAMPIONSHIPS" inAt={0} outAt={60} fontSize={54} bottom={430} />
    </Sequence>
  </>
);
