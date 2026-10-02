import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 52;
export const S03_CUTS = [26, 26];

// "1.5-mile" is said from 7.06s = scene frame 6; the stamp lands on it.
export const S03_STAMP_AT = 6;
const W1: Win = [0, 6, 34, 46];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="1.5 MI" label="All Three Tracks" at={S03_STAMP_AT} win={W1} size={250} />
    <Sequence from={1} durationInFrames={51} layout="none">
      <Caption text="ALL 1.5-MILE TRACKS" inAt={0} outAt={40} fontSize={58} />
    </Sequence>
  </>
);
