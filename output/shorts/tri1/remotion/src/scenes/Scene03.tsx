import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 39;
export const S03_CUTS = [39];

// "40" is said at 7.34s = scene frame 15; the stamp lands on it.
export const S03_STAMP_AT = 15;
const W1: Win = [9, 15, 40, 48];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="40 KM" label="Bike" at={S03_STAMP_AT} win={W1} size={230} />
    <Sequence from={10} durationInFrames={39} layout="none">
      <Caption text="BIKE 40 KM" inAt={0} outAt={20} fontSize={68} />
    </Sequence>
  </>
);
