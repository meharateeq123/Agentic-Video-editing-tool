import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 199;
export const S01_CUTS = [50, 50, 50, 49];

// "25.41" is spoken from 5.58s = scene frame 167, over the results card that prints it. The scene ends
// at 199, so the stamp gets a shorter hold than the usual ~1s before it leaves.
export const S01_STAMP_AT = 167;
const W_STAMP: Win = [161, 167, 186, 198];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="25.41" label="Asian Games Gold" at={S01_STAMP_AT} win={W_STAMP} size={190} />
    <Sequence from={0} durationInFrames={62} layout="none">
      <Caption text="AT THE 2026 ASIAN GAMES" inAt={0} outAt={46} fontSize={54} />
    </Sequence>
    <Sequence from={65} durationInFrames={38} layout="none">
      <Caption text="THE CHINESE STAR DEFENDED" inAt={0} outAt={28} fontSize={52} />
    </Sequence>
    <Sequence from={104} durationInFrames={49} layout="none">
      <Caption text="HER 50-METER BUTTERFLY TITLE" inAt={0} outAt={36} fontSize={50} />
    </Sequence>
    <Sequence from={156} durationInFrames={43} layout="none">
      <Caption text="TOUCHING IN 25.41" inAt={0} outAt={32} fontSize={60} />
    </Sequence>
  </>
);
