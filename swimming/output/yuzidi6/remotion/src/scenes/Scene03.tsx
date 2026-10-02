import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 161;
export const S03_CUTS = [54, 54, 53];

// "4:28.56" is spoken from 9.98s = scene frame 109. The stamp lands on it and leaves ~1s after it has
// finished landing (last animation ends at 119, so out0 = 149).
export const S03_STAMP_AT = 109;
const W_STAMP: Win = [103, 109, 149, 161];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="4:28.56" label="Games Record" at={S03_STAMP_AT} win={W_STAMP} size={170} />
    <Sequence from={5} durationInFrames={68} layout="none">
      <Caption text="HER BIGGEST SWIM CAME IN THE 400 IM" inAt={0} outAt={50} fontSize={48} />
    </Sequence>
    <Sequence from={77} durationInFrames={31} layout="none">
      <Caption text="SHE CLOCKED AN INCREDIBLE" inAt={0} outAt={23} fontSize={52} />
    </Sequence>
    <Sequence from={108} durationInFrames={53} layout="none">
      <Caption text="4:28.56" inAt={0} outAt={20} fontSize={70} />
    </Sequence>
  </>
);
