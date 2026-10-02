import React from 'react';
import {BedChain} from '../components/BedChain';
import {BigType} from '../components/Stamp';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

// "non-competitive" lands at f209-239.
const W: Win = [130, 150, 300, 326];

export const Scene13: React.FC = () => (
  <BedChain segs={chain(13)} dur={S13_DUR} wins={[W]} amp={0.05} maxBlur={10} dim={0.4}>
    <BigType lines={['PIT ROAD DAMP', '= NON-COMPETITIVE']} ats={[150, 209]} win={W} />
  </BedChain>
);
