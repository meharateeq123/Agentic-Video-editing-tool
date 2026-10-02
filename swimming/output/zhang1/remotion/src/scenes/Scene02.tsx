import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 87;
export const S02_CUTS = [34, 30, 23];

// "25.41" is said at 4.52s = scene frame 17, over the real results board (fill beat); the stamp sits at the top of the frame
// and leaves ~1s after it has landed.
export const S02_STAMP_AT = 17;
const W1: Win = [13, 19, 47, 61];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <RankStamp value="25.41" label="Gold medal" at={S02_STAMP_AT} win={W1} size={190} y={-1300} />
    <Sequence from={3} durationInFrames={30} layout="none">
      <Caption text="TOUCHING IN" inAt={0} outAt={20} fontSize={58} bottom={430} />
    </Sequence>
    <Sequence from={46} durationInFrames={41} layout="none">
      <Caption text="ANOTHER GOLD MEDAL" inAt={0} outAt={32} fontSize={56} bottom={430} />
    </Sequence>
  </>
);
