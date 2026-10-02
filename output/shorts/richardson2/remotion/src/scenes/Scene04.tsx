import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {Caption} from '../components/Caption';
import {RankStamp} from '../components/Stamp';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 162; // 13.08 -> 18.47s
export const S04_CUTS = [54, 54, 54];

// "10" is said at 1.50s = frame 45?  ("Melissa running" 13.62s = frame 16, "10" 14.26s = frame 35,
// ".62" 14.58s = frame 45): the stamp slams down as the number is said.
export const S04_STAMP_AT = 36;
const STAMP_WIN: Win = [30, 36, 86, 100];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="10.62" label="Jefferson-Wooden" at={S04_STAMP_AT} win={STAMP_WIN} />
    <Sequence from={0} durationInFrames={50} layout="none">
      <Caption text="And with MELISSA running" outAt={40} fontSize={50} />
    </Sequence>
    <Sequence from={50} durationInFrames={50} layout="none">
      <Caption text="10.62, this SPRINT" outAt={40} fontSize={56} />
    </Sequence>
    <Sequence from={100} durationInFrames={62} layout="none">
      <Caption text="BATTLE could get CRAZY!" outAt={52} fontSize={56} />
    </Sequence>
  </>
);