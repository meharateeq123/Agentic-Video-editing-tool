import React from 'react';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 119;
export const S03_CUTS = [119];

// "0.40" lands at frame 9 (when "0" is spoken); the sub-line lands at frame 40 ("seconds").
// Last animation ends at 46, so out0 = 76.
const W_GAP: Win = [0, 9, 76, 102];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W_GAP]} amp={0.05} maxBlur={4} dim={0.16} />
    <BigType lines={['0.40']} ats={[9]} sub="SECONDS BEHIND MCINTOSH'S WR" subAt={40} win={W_GAP} />
  </>
);
