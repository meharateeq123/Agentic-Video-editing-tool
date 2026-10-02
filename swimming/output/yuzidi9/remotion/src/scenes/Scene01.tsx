import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE1_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S01_DUR = 148;
export const S01_CUTS = [148];
const W_N1: Win = [0, 84, 118, 144];

export const Scene01: React.FC = () => (
  <>
    <Cuts cuts={SCENE1_CUTS} frames={S01_CUTS} wins={[W_N1]} amp={0.05} maxBlur={4} dim={0.16} />
    <BigType lines={['NO. 1']} ats={[84]} sub="IN TWO MAJOR EVENTS" subAt={99} win={W_N1} />
    <Sequence from={0} durationInFrames={70} layout="none">
      <Caption text="YU ZIDI IS ONLY 13" inAt={0} outAt={36} fontSize={54} />
    </Sequence>
  </>
);
