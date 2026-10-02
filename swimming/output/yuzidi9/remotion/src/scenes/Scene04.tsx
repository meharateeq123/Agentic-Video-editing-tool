import React from 'react';
import {Sequence} from 'remotion';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {Caption} from '../components/Caption';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 139;
export const S04_CUTS = [139];
const W_N2: Win = [0, 26, 100, 139];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W_N2]} amp={0.05} maxBlur={4} dim={0.16} />
    <BigType lines={['NO. 2']} ats={[26]} sub="400 IM - BEHIND MCINTOSH" subAt={87} win={W_N2} />
  </>
);
