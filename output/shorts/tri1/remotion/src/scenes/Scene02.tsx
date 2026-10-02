import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {RankStamp} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 71;
export const S02_CUTS = [35, 36];

// "1.5" is said from 5.60s = scene frame 33; the stamp lands on it and leaves ~1s after it has landed.
export const S02_STAMP_AT = 33;
const W1: Win = [27, 33, 63, 75];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W1]} amp={0.05} maxBlur={4} dim={0.16} />
    <RankStamp value="1.5 KM" label="Swim" at={S02_STAMP_AT} win={W1} size={230} />
    <Sequence from={9} durationInFrames={30} layout="none">
      <Caption text="ATHLETES WILL SWIM" inAt={0} outAt={22} fontSize={56} />
    </Sequence>
    <Sequence from={32} durationInFrames={39} layout="none">
      <Caption text="1.5 KM" inAt={0} outAt={46} fontSize={72} />
    </Sequence>
  </>
);
