import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 201; // 3.08 -> 9.78s
export const S02_CUTS = [50, 50, 50, 51];

// No graphic here - it is a compound statement with no single number to stamp; the lineup cut
// (s2b, "4 USA SMITH") already carries her identity on the footage itself.
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={50} layout="none">
      <Caption text="She WON the 200 BACKSTROKE," outAt={40} fontSize={54} />
    </Sequence>
    <Sequence from={50} durationInFrames={50} layout="none">
      <Caption text="but in both the 100 and 200 BACK," outAt={40} fontSize={44} />
    </Sequence>
    <Sequence from={100} durationInFrames={50} layout="none">
      <Caption text="she was actually FASTER in the" outAt={40} fontSize={46} />
    </Sequence>
    <Sequence from={150} durationInFrames={51} layout="none">
      <Caption text="PRELIMS than in the FINALS." outAt={42} fontSize={48} />
    </Sequence>
  </>
);