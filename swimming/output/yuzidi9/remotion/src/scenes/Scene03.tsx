import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 161;
export const S03_CUTS = [161];
const W_IM: Win = [0, 55, 96, 122];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W_IM]} amp={0.05} maxBlur={4} dim={0.16} />
    <BigType lines={['2:06.10']} ats={[55]} sub="200 IM - NO. 1" subAt={65} win={W_IM} />
    <Sequence from={2} durationInFrames={42} layout="none">
      <Caption text="AND THE 200 IM TOO" inAt={0} outAt={34} fontSize={46} />
    </Sequence>
  </>
);
