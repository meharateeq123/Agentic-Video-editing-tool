import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE5_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S05_DUR = 142;
export const S05_CUTS = [34, 34, 28, 23, 23];

// "two" (more medals) is said at 15.44s = scene frame 75; the stamp lands on it at the top of the frame and leaves ~1s after.
export const S05_STAMP_AT = 75;
const W1: Win = [71, 77, 105, 119];

export const Scene05: React.FC = () => (
  <>
    <Cuts cuts={SCENE5_CUTS} frames={S05_CUTS} wins={[W1]} amp={0.05} maxBlur={0} dim={0} />
    <RankStamp value="+2" label="More medals" at={S05_STAMP_AT} win={W1} size={230} y={-1300} />
    <Sequence from={6} durationInFrames={36} layout="none">
      <Caption text="AT THE END of the GAMES" inAt={0} outAt={28} fontSize={50} bottom={430} />
    </Sequence>
    <Sequence from={46} durationInFrames={28} layout="none">
      <Caption text="ZHANG YUFEI HAD ADDED" inAt={0} outAt={20} fontSize={50} bottom={430} />
    </Sequence>
    <Sequence from={74} durationInFrames={26} layout="none">
      <Caption text="TWO MORE MEDALS" inAt={0} outAt={18} fontSize={54} bottom={430} />
    </Sequence>
    <Sequence from={102} durationInFrames={40} layout="none">
      <Caption text="to her INCREDIBLE CAREER" inAt={0} outAt={30} fontSize={50} bottom={430} />
    </Sequence>
  </>
);
