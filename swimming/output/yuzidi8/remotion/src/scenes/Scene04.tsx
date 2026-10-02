import React from 'react';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {SCENE4_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S04_DUR = 100;
export const S04_CUTS = [100];

// "three gold[s]" lands at frame 21. Last animation ends at 32, so out0 = 62 (a clean 38-frame
// hold before the scene cut at 100, per the graphic-exit-timing rule - never ride to the cut).
const W_GOLDS: Win = [0, 21, 62, 88];

export const Scene04: React.FC = () => (
  <>
    <Cuts cuts={SCENE4_CUTS} frames={S04_CUTS} wins={[W_GOLDS]} amp={0.05} maxBlur={4} dim={0.16} />
    <BigType lines={['3 GOLDS · 3 RECORDS']} ats={[21]} win={W_GOLDS} />
  </>
);
