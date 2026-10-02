import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 119;
export const S04_CUTS = [60, 59];

// "13" is said at 19.3s = scene frame 90; the stamp lands on it and leaves ~1s after it has landed.
export const S04_STAMP_AT = 90;
const W1: Win = [86, 92, 100, 119];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="3 GOLDS" label="Age 13" at={S04_STAMP_AT} win={W1} size={150} />
    <Sequence from={4} durationInFrames={50} layout="none">
      <Caption text="THREE RACES. THREE GOLDS." inAt={0} outAt={40} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={56} durationInFrames={50} layout="none">
      <Caption text="YU ZIDI is ONLY 13!" inAt={0} outAt={38} fontSize={62} bottom={430} />
    </Sequence>
  </>
);
