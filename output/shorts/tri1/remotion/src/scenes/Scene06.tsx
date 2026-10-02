import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 148;
export const S06_CUTS = [50, 49, 49];

// "first" is said at 15.00s = scene frame 51; the stamp lands on it and leaves ~1s after it has landed.
export const S06_STAMP_AT = 51;
const W1: Win = [45, 51, 81, 93];

export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="1ST" label="Medal Of LA 2028" at={S06_STAMP_AT} win={W1} size={330} />
    <Sequence from={3} durationInFrames={30} layout="none">
      <Caption text="THE WOMEN'S RACE" inAt={0} outAt={22} fontSize={58} />
    </Sequence>
    <Sequence from={30} durationInFrames={34} layout="none">
      <Caption text="WILL AWARD THE FIRST" inAt={0} outAt={24} fontSize={56} />
    </Sequence>
    <Sequence from={59} durationInFrames={28} layout="none">
      <Caption text="OLYMPIC MEDAL" inAt={0} outAt={18} fontSize={62} />
    </Sequence>
    <Sequence from={81} durationInFrames={67} layout="none">
      <Caption text="of LA 2028" inAt={0} outAt={44} fontSize={72} />
    </Sequence>
  </>
);
