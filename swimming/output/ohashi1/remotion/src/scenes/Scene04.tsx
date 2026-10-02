import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 114;
export const S04_CUTS = [57, 57];

// "17" is spoken at 15.66s = scene frame 35. The stamp lands on it and leaves ~1s after it has
// finished landing (last animation ends at 45, so out0 = 75).
export const S04_STAMP_AT = 35;
const W1: Win = [30, 36, 75, 101];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="17" label="Years Old" at={S04_STAMP_AT} win={W1} size={300} />
    <Sequence from={4} durationInFrames={48} layout="none">
      <Caption text="OHASHI IS STILL JUST 17" inAt={0} outAt={36} fontSize={58} />
    </Sequence>
    <Sequence from={61} durationInFrames={53} layout="none">
      <Caption text="HE HAS YEARS TO IMPROVE" inAt={0} outAt={40} fontSize={56} />
    </Sequence>
  </>
);
