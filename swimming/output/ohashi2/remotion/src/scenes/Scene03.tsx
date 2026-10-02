import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 67;
export const S03_CUTS = [67];

// This whole scene is the spoken time, so the stamp lands at the top of it and leaves ~1s after it has
// finished animating in (last animation ends at 16, so out0 = 46).
export const S03_STAMP_AT = 6;
const W_STAMP: Win = [0, 6, 46, 60];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W_STAMP]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="2:04.83" label="World Record" at={S03_STAMP_AT} win={W_STAMP} size={170} />
    <Sequence from={0} durationInFrames={67} layout="none">
      <Caption text="IN 2:04.83" inAt={0} outAt={25} fontSize={64} />
    </Sequence>
  </>
);
