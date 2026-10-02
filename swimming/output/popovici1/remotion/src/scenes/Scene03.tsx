import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 106;
export const S03_CUTS = [35, 35, 36];

// "2026" is said at 12.76s = scene frame 80, over the real Paris result board; the stamp sits above it.
export const S03_STAMP_AT = 80;
const W1: Win = [76, 82, 110, 116];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <RankStamp value="2026" label="European Championships" at={S03_STAMP_AT} win={W1} size={190} y={-1300} />
    <Sequence from={8} durationInFrames={36} layout="none">
      <Caption text="CONTINUED COMPETING" inAt={0} outAt={26} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={44} durationInFrames={36} layout="none">
      <Caption text="at the HIGHEST LEVEL" inAt={0} outAt={26} fontSize={56} bottom={430} />
    </Sequence>
  </>
);
