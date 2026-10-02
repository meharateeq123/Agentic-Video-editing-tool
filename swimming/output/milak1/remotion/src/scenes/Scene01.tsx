import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 100;
export const S01_CUTS = [34, 33, 33];

// "Kristof Milak" is said at 0.0-0.78s; the card pops in over the walk-out and leaves ~1s after it has landed.
export const S01_CARD_AT = 6;
const W1: Win = [6, 18, 48, 74];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <IdCard photo="id/milak.jpg" name="Kristóf Milák" sub="Hungary · 100 m butterfly" label="Back in the pool" win={W1} />
    <Sequence from={2} durationInFrames={40} layout="none">
      <Caption text="MILÁK is BACK" inAt={0} outAt={26} fontSize={70} />
    </Sequence>
    <Sequence from={40} durationInFrames={60} layout="none">
      <Caption text="NEARLY DID SOMETHING INCREDIBLE" inAt={0} outAt={44} fontSize={56} />
    </Sequence>
  </>
);
