import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 106;
export const S01_CUTS = [36, 35, 35];

// "David Popovici" is said at 0.0-0.84s; the card pops in over the walk-out and leaves ~1s after it has landed.
export const S01_CARD_AT = 6;
const W1: Win = [6, 18, 48, 74];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <IdCard photo="id/popovici.jpg" name="David Popovici" sub="Romania · 100 m freestyle" label="Sprint star" win={W1} />
    <Sequence from={26} durationInFrames={44} layout="none">
      <Caption text="REMAINS ONE of the BIGGEST NAMES" inAt={0} outAt={34} fontSize={52} bottom={430} />
    </Sequence>
    <Sequence from={70} durationInFrames={36} layout="none">
      <Caption text="in SPRINT FREESTYLE" inAt={0} outAt={26} fontSize={60} bottom={430} />
    </Sequence>
  </>
);
