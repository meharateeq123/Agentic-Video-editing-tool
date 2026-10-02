import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 173;
export const S02_CUTS = [86, 87];

// "92" is said at 3.48s = scene frame 32; the stamp lands on it and leaves ~1s after it has landed.
export const S02_STAMP_AT = 32;
const STAMP_WIN: Win = [26, 32, 62, 74];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="-92" label="Points Back" at={S02_STAMP_AT} win={STAMP_WIN} size={260} />
    <Sequence from={2} durationInFrames={32} layout="none">
      <Caption text="He ENTERS this WEEKEND" inAt={0} outAt={24} fontSize={54} />
    </Sequence>
    <Sequence from={32} durationInFrames={40} layout="none">
      <Caption text="92 POINTS BEHIND" inAt={0} outAt={32} fontSize={60} />
    </Sequence>
    <Sequence from={71} durationInFrames={34} layout="none">
      <Caption text="the CHAMPIONSHIP lead" inAt={0} outAt={22} fontSize={54} />
    </Sequence>
    <Sequence from={108} durationInFrames={65} layout="none">
      <Caption text="but there's ONE THING he NEEDS badly to WIN" inAt={0} outAt={58} fontSize={54} />
    </Sequence>
  </>
);
