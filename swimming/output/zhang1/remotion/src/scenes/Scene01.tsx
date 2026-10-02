import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {IdCard} from '../components/IdCard';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 119;
export const S01_CUTS = [30, 30, 29, 30];

// "The Chinese swimming star" is said at 0.0-1.08s; the card pops in over the walk-out and leaves ~1s after it has landed.
export const S01_CARD_AT = 8;
const W1: Win = [8, 20, 50, 76];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <IdCard photo="id/zhang.jpg" name="Zhang Yufei" sub="China · 50 m butterfly" label="Defending champion" win={W1} />
    <Sequence from={2} durationInFrames={34} layout="none">
      <Caption text="THE CHINESE SWIMMING STAR" inAt={0} outAt={26} fontSize={50} bottom={430} />
    </Sequence>
    <Sequence from={36} durationInFrames={46} layout="none">
      <Caption text="DEFENDED HER ASIAN GAMES TITLE" inAt={0} outAt={36} fontSize={48} bottom={430} />
    </Sequence>
    <Sequence from={84} durationInFrames={35} layout="none">
      <Caption text="in the 50 M BUTTERFLY" inAt={0} outAt={26} fontSize={56} bottom={430} />
    </Sequence>
  </>
);
