import React from 'react';
import {Sequence} from 'remotion';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 166; // 14.20 -> 19.72s
export const S05_CUTS = [40, 35, 33, 58];

// "mile" 1.32s = f40, "Commonwealth" 2.50s = f75, "now another" 3.60s = f108. Every cut lands on the
// word: London on "capped a season", the stadium's own NEW WR 3:42.66 board on "a mile world record",
// Glasgow on "Commonwealth gold", Budapest on "another major title".
export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} amp={0.06} />
    <Sequence from={0} durationInFrames={40} layout="none">
      <Caption text="That CAPPED a SEASON with" outAt={32} fontSize={52} />
    </Sequence>
    <Sequence from={40} durationInFrames={35} layout="none">
      <Caption text="a MILE WORLD RECORD," outAt={28} fontSize={56} />
    </Sequence>
    <Sequence from={75} durationInFrames={33} layout="none">
      <Caption text="COMMONWEALTH GOLD," outAt={26} fontSize={56} />
    </Sequence>
    <Sequence from={108} durationInFrames={58} layout="none">
      <Caption text="and now ANOTHER MAJOR TITLE." outAt={46} fontSize={52} />
    </Sequence>
  </>
);