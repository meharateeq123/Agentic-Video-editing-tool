import React from 'react';
import {Sequence} from 'remotion';

import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 117;
export const S02_CUTS = [59, 58];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={50} layout="none">
      <Caption text="The 17-YEAR-OLD JAPANESE" outAt={40} fontSize={48} />
    </Sequence>
    <Sequence from={50} durationInFrames={38} layout="none">
      <Caption text="swimmer SMASHED the" outAt={28} fontSize={52} />
    </Sequence>
    <Sequence from={88} durationInFrames={29} layout="none">
      <Caption text="WORLD JUNIOR RECORD" outAt={22} fontSize={54} />
    </Sequence>
  </>
);
