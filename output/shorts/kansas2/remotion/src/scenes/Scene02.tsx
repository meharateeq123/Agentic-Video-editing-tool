import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 171;
export const S02_CUTS = [43, 43, 43, 42];

// "seven" is said at 4.12s = scene frame 35, "four" at 7.42s = frame 134; each stamp lands on its word and
// leaves ~1s after it has landed.
export const S02_STAMP1_AT = 35;
export const S02_STAMP2_AT = 134;
const W1: Win = [29, 35, 65, 77];
const W2: Win = [128, 134, 164, 176];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1, W2]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="5 OF 7" label="Winning Pass In Final 2 Laps" at={S02_STAMP1_AT} win={W1} size={230} />
    <RankStamp value="4" label="Went To Overtime" at={S02_STAMP2_AT} win={W2} size={330} />
    <Sequence from={8} durationInFrames={40} layout="none">
      <Caption text="IN FIVE OF THE LAST SEVEN" inAt={0} outAt={30} fontSize={52} />
    </Sequence>
    <Sequence from={46} durationInFrames={20} layout="none">
      <Caption text="RACES," inAt={0} outAt={12} fontSize={62} />
    </Sequence>
    <Sequence from={67} durationInFrames={32} layout="none">
      <Caption text="the WINNING PASS came" inAt={0} outAt={22} fontSize={54} />
    </Sequence>
    <Sequence from={92} durationInFrames={32} layout="none">
      <Caption text="IN THE FINAL TWO LAPS" inAt={0} outAt={24} fontSize={54} />
    </Sequence>
    <Sequence from={122} durationInFrames={49} layout="none">
      <Caption text="and FOUR went to OVERTIME" inAt={0} outAt={36} fontSize={54} />
    </Sequence>
  </>
);
