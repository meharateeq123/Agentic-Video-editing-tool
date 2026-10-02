import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 127;
export const S01_CUTS = [64, 63];

// "1:43.49" is spoken from 2.50s = scene frame 75. The stamp lands on it over the closing metres,
// where the broadcast's own lane bars name him, and leaves ~1s after it finishes landing.
export const S01_STAMP_AT = 75;
const W_STAMP: Win = [69, 75, 115, 127];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="1:43.49" label="Asian Record" at={S01_STAMP_AT} win={W_STAMP} size={170} />
    <Sequence from={0} durationInFrames={48} layout="none">
      <Caption text="THE 19-YEAR-OLD CHINESE SWIMMER" inAt={0} outAt={36} fontSize={50} />
    </Sequence>
    <Sequence from={49} durationInFrames={78} layout="none">
      <Caption text="BLASTED A STUNNING 1:43.49" inAt={0} outAt={58} fontSize={54} />
    </Sequence>
  </>
);
