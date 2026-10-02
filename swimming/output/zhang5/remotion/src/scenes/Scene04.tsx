import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 201;
export const S04_CUTS = [67, 67, 67];

// "1:43.49" is spoken from 3.35s = scene frame 101; the sub-line lands at frame 115. Last
// animation ends at 121, so out0 = 151.
const W_TIME: Win = [0, 101, 151, 177];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W_TIME]} amp={0.05} maxBlur={4} dim={0.16} />
    <BigType lines={['1:43.49']} ats={[101]} sub="ASIAN RECORD - 200 FREE" subAt={115} win={W_TIME} />
    <Sequence from={2} durationInFrames={34} layout="none">
      <Caption text="HE ALSO SET AN ASIAN RECORD" inAt={0} outAt={28} fontSize={44} />
    </Sequence>
    <Sequence from={148} durationInFrames={53} layout="none">
      <Caption text="SEVEN GOLDS. ONE SWIMMER." inAt={0} outAt={46} fontSize={50} />
    </Sequence>
  </>
);
