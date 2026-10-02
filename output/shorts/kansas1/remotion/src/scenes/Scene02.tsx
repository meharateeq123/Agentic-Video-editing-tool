import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 185;
export const S02_CUTS = [62, 62, 61];

// "seven" is said at 4.22s = scene frame 38; "four" at 8.14s = frame 156. Each stamp lands on its word
// and leaves ~1s after it has landed.
export const S02_STAMP1_AT = 38;
export const S02_STAMP2_AT = 156;
const W1: Win = [32, 38, 74, 86];
const W2: Win = [150, 156, 180, 192];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1, W2]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="5 OF 7" label="Won In The Final 2 Laps" at={S02_STAMP1_AT} win={W1} size={230} />
    <RankStamp value="4" label="Went To Overtime" at={S02_STAMP2_AT} win={W2} size={330} />
    <Sequence from={8} durationInFrames={40} layout="none">
      <Caption text="In FIVE of the last SEVEN" inAt={0} outAt={30} fontSize={54} />
    </Sequence>
    <Sequence from={48} durationInFrames={30} layout="none">
      <Caption text="KANSAS RACES" inAt={0} outAt={14} fontSize={60} />
    </Sequence>
    <Sequence from={83} durationInFrames={30} layout="none">
      <Caption text="the WINNING PASS happened" inAt={0} outAt={20} fontSize={54} />
    </Sequence>
    <Sequence from={113} durationInFrames={34} layout="none">
      <Caption text="in the FINAL TWO LAPS" inAt={0} outAt={26} fontSize={58} />
    </Sequence>
    <Sequence from={142} durationInFrames={43} layout="none">
      <Caption text="and FOUR went to OVERTIME" inAt={0} outAt={40} fontSize={56} />
    </Sequence>
  </>
);
