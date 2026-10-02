import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 165;
export const S02_CUTS = [55, 55, 55];

// "4, 28.56" is said at 10.0s = scene frame 78; the stamp lands on the real GR/scoreboard beat and leaves ~1s after landing.
export const S02_STAMP_AT = 108;
const W1: Win = [104, 110, 138, 152];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <RankStamp value="4:28.56" label="400 IM · Games record" at={S02_STAMP_AT} win={W1} size={140} y={-1300} />
    <Sequence from={4} durationInFrames={44} layout="none">
      <Caption text="SHE SET GAMES RECORDS" inAt={0} outAt={34} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={50} durationInFrames={44} layout="none">
      <Caption text="in ALL THREE EVENTS" inAt={0} outAt={32} fontSize={56} bottom={430} />
    </Sequence>
    <Sequence from={96} durationInFrames={68} layout="none">
      <Caption text="INCLUDING an INCREDIBLE 4:28.56" inAt={0} outAt={52} fontSize={44} bottom={430} />
    </Sequence>
  </>
);
