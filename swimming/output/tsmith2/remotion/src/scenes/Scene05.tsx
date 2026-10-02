import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 123;
export const S05_CUTS = [41, 41, 41];

// "L.A." is said at 14.64s = scene frame 49; the stamp lands on it over the Los Angeles aerial and
// leaves ~1s after it has landed.
export const S05_STAMP_AT = 49;
const W1: Win = [43, 49, 79, 91];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="LA 2028" label="50 m Breaststroke" at={S05_STAMP_AT} win={W1} size={190} />
    <Sequence from={5} durationInFrames={36} layout="none">
      <Caption text="THE 50-METER BREASTSTROKE" inAt={0} outAt={24} fontSize={52} />
    </Sequence>
    <Sequence from={42} durationInFrames={32} layout="none">
      <Caption text="at LA 2028" inAt={0} outAt={20} fontSize={64} />
    </Sequence>
    <Sequence from={80} durationInFrames={43} layout="none">
      <Caption text="STILL HAS TO QUALIFY" inAt={0} outAt={30} fontSize={58} />
    </Sequence>
  </>
);
