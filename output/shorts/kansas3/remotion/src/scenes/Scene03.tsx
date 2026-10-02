import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 94;
export const S03_CUTS = [31, 31, 32];

// "four" is said at 8.66s = scene frame 30; the stamp lands on it and leaves ~1s after it has landed.
export const S03_STAMP_AT = 30;
const W1: Win = [26, 32, 60, 74];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="4 OF 5" label="Kansas wins · Chevrolet" at={S03_STAMP_AT} win={W1} size={210} />
    <Sequence from={2} durationInFrames={34} layout="none">
      <Caption text="WHILE CHEVROLET HAS WON" inAt={0} outAt={26} fontSize={50} />
    </Sequence>
    <Sequence from={54} durationInFrames={40} layout="none">
      <Caption text="the LAST FIVE KANSAS RACES" inAt={0} outAt={30} fontSize={48} />
    </Sequence>
  </>
);
