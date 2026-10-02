import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 118; // 0 -> 3.94s
export const S01_CUTS = [59, 59];

// "revealed" is said at 1.20s = frame 36, so the caption turns over just after it.
export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={47} layout="none">
      <Caption text="KEELY HODGKINSON just REVEALED" outAt={38} fontSize={48} />
    </Sequence>
    <Sequence from={47} durationInFrames={71} layout="none">
      <Caption text="the SHOCKING STORY behind her INJURY." outAt={58} fontSize={46} />
    </Sequence>
  </>
);