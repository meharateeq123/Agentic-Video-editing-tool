import React from 'react';
import type {Win} from '../components/Bed';
import {BigType} from '../components/Stamp';
import {SCENE3_CUTS} from '../footage';
import {Cuts} from './Cuts';

export const S03_DUR = 199;
export const S03_CUTS = [199];

// Four sequential name cards, timed to when each swimmer's name is spoken.
const W1: Win = [0, 28, 56, 62];
const W2: Win = [56, 66, 90, 96];
const W3: Win = [90, 96, 118, 124];
const W4: Win = [118, 124, 150, 156];

export const Scene03: React.FC = () => (
  <>
    <Cuts cuts={SCENE3_CUTS} frames={S03_CUTS} wins={[W1, W2, W3, W4]} amp={0.05} maxBlur={4} dim={0.16} />
    <BigType lines={['CAMERON MCEVOY']} ats={[28]} win={W1} />
    <BigType lines={['SIOBHAN HAUGHEY']} ats={[66]} win={W2} />
    <BigType lines={['MARRIT STEENBERGEN']} ats={[96]} win={W3} />
    <BigType lines={['QIN HAIYANG']} ats={[124]} win={W4} />
  </>
);
