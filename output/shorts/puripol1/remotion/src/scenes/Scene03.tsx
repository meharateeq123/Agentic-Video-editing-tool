import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 96;
export const S03_CUTS = [48, 48];

// "19.88" is spoken from 7.54s = scene frame 35, over the 200m final itself; the FINISH clock that
// prints the same number is the cut straight after. The stamp leaves ~1s after it finishes landing.
export const S03_STAMP_AT = 35;
const W_STAMP: Win = [29, 35, 75, 90];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="19.88" label="Asian Record" at={S03_STAMP_AT} win={W_STAMP} size={200} />
    <Sequence from={0} durationInFrames={34} layout="none">
      <Caption text="AND RAN AN INCREDIBLE" inAt={0} outAt={25} fontSize={52} />
    </Sequence>
    <Sequence from={35} durationInFrames={61} layout="none">
      <Caption text="19.88 SECONDS" inAt={0} outAt={30} fontSize={64} />
    </Sequence>
  </>
);
