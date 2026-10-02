import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 235;
export const S02_CUTS = [45, 36, 55, 59, 40];

// "49.48" is said at 8.24s = scene frame 147. The stamp lands on it at the top of the frame (the real results graphic sits in
// the middle of the fill beat) and leaves ~1s after it has landed.
export const S02_STAMP_AT = 147;
const W1: Win = [143, 149, 177, 191];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <RankStamp value="49.48" label="European record" at={S02_STAMP_AT} win={W1} size={190} y={-1300} />
    <Sequence from={6} durationInFrames={72} layout="none">
      <Caption text="2026 EUROPEAN CHAMPIONSHIPS" inAt={0} outAt={46} fontSize={54} />
    </Sequence>
    <Sequence from={80} durationInFrames={62} layout="none">
      <Caption text="MILÁK WON the 100 M BUTTERFLY" inAt={0} outAt={40} fontSize={54} />
    </Sequence>
    <Sequence from={194} durationInFrames={41} layout="none">
      <Caption text="a EUROPEAN RECORD" inAt={0} outAt={30} fontSize={58} bottom={430} />
    </Sequence>
  </>
);
