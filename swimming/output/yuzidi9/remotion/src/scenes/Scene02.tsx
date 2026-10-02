import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE2_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S02_DUR = 182;
export const S02_CUTS = [182];
const W_FLY: Win = [0, 140, 165, 182];

export const Scene02: React.FC = () => (
  <>
    <Cuts cuts={SCENE2_CUTS} frames={S02_CUTS} wins={[W_FLY]} amp={0.05} maxBlur={4} dim={0.16} />
    <BigType lines={['2:05.08']} ats={[140]} sub="200 FLY - NO. 1" subAt={150} win={W_FLY} />
    <Sequence from={0} durationInFrames={100} layout="none">
      <Caption text="SHE NOW LEADS THE 200 BUTTERFLY" inAt={0} outAt={90} fontSize={42} />
    </Sequence>
  </>
);
