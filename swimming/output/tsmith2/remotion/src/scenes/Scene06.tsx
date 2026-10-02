import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 127;
export const S06_CUTS = [32, 32, 32, 31];

// "29" is said at 17.56s = scene frame 14; the stamp lands on it and leaves ~1s after it has landed.
export const S06_STAMP_AT = 14;
const W1: Win = [8, 14, 44, 56];

export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="29" label="Years Old" at={S06_STAMP_AT} win={W1} size={300} />
    <Sequence from={8} durationInFrames={30} layout="none">
      <Caption text="BUT AT 29," inAt={0} outAt={18} fontSize={64} />
    </Sequence>
    <Sequence from={40} durationInFrames={30} layout="none">
      <Caption text="SMITH is READY to" inAt={0} outAt={22} fontSize={58} />
    </Sequence>
    <Sequence from={66} durationInFrames={61} layout="none">
      <Caption text="WRITE a BRAND NEW CHAPTER" inAt={0} outAt={34} fontSize={58} />
    </Sequence>
  </>
);
