import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 102; // 3.58 -> 6.96s
export const S02_CUTS = [51, 51];

// No graphic. The shot itself is the moment the broadcast put "Summer McINTOSH / 4:28.01 /
// WINNER" on screen, and the caption says the number — a built card would only repeat both.
// "setting a championship record" starts at 5.52s = scene frame 58.
export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={58} layout="none">
      <Caption text="in 4:28.01," outAt={44} fontSize={74} />
    </Sequence>
    <Sequence from={58} durationInFrames={44} layout="none">
      <Caption text="setting a CHAMPIONSHIP RECORD." outAt={36} fontSize={56} />
    </Sequence>
  </>
);
