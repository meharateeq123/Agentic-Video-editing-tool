import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE6_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S06_DUR = 66;
export const S06_CUTS = [33, 33];

// "three" is said at 13.94s = frame 3, "one" at 14.94s = frame 33; each number lands on its word and
// leaves ~1s later (the first hands over to the second).
export const S06_STAMP1_AT = 3;
export const S06_STAMP2_AT = 33;
const W1: Win = [0, 3, 28, 33];
const W2: Win = [30, 33, 63, 75];

export const Scene06: React.FC = () => (
  <>
    <Cuts cuts={SCENE6_CUTS} frames={S06_CUTS} wins={[W1, W2]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="3" label="Races" at={S06_STAMP1_AT} win={W1} size={330} />
    <RankStamp value="1" label="Championship Fight" at={S06_STAMP2_AT} win={W2} size={330} />
    <Sequence from={2} durationInFrames={28} layout="none">
      <Caption text="THREE RACES" inAt={0} outAt={14} fontSize={64} />
    </Sequence>
    <Sequence from={32} durationInFrames={34} layout="none">
      <Caption text="ONE CHAMPIONSHIP FIGHT" inAt={0} outAt={26} fontSize={56} />
    </Sequence>
  </>
);
