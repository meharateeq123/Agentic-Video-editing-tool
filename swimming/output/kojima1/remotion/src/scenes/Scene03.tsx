import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 128;
export const S03_CUTS = [43, 42, 43];

// "1:55.36" is said from 10.62s = scene frame 70; the stamp lands on it.
export const S03_STAMP_AT = 68;
const STAMP_WIN: Win = [62, 68, 112, 124];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[STAMP_WIN]} amp={0.06} maxBlur={4} dim={0.16} />
    <RankStamp value="1:55.36" label="World Junior Record" at={S03_STAMP_AT} win={STAMP_WIN} size={230} />
    <Sequence from={0} durationInFrames={52} layout="none">
      <Caption text="in the 200-METER IM" outAt={42} fontSize={54} />
    </Sequence>
    <Sequence from={52} durationInFrames={76} layout="none">
      <Caption text="with a CRAZY 1:55.36!" outAt={66} fontSize={56} />
    </Sequence>
  </>
);
