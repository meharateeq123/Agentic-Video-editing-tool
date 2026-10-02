import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 104;
export const S05_CUTS = [30, 26, 48];

// "LA" is said at 18.94s = scene frame 55; the stamp lands on it over the Los Angeles skyline and leaves ~1s after it has landed.
export const S05_STAMP_AT = 57;
const W1: Win = [53, 59, 87, 99];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="LA 2028" label="Next Olympic Games" at={S05_STAMP_AT} win={W1} size={190} />
    <Sequence from={2} durationInFrames={52} layout="none">
      <Caption text="HOW FAST CAN POPOVICI GO" inAt={0} outAt={40} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={56} durationInFrames={48} layout="none">
      <Caption text="BEFORE LA 2028?" inAt={0} outAt={44} fontSize={62} bottom={430} />
    </Sequence>
  </>
);
