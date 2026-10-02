import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 100;
export const S01_CUTS = [34, 33, 33];

// "three-race" is said at 1.6s = scene frame 48; the stamp lands on it and leaves ~1s after it has landed.
export const S01_STAMP_AT = 48;
const W1: Win = [44, 50, 78, 92];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="3" label="Race stretch" at={S01_STAMP_AT} win={W1} size={300} />
    <Sequence from={2} durationInFrames={42} layout="none">
      <Caption text="KANSAS STARTS a CRITICAL" inAt={0} outAt={32} fontSize={50} />
    </Sequence>
    <Sequence from={52} durationInFrames={48} layout="none">
      <Caption text="THREE-RACE STRETCH in the CHASE" inAt={0} outAt={38} fontSize={44} />
    </Sequence>
  </>
);
