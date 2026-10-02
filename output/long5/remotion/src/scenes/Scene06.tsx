import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S06_DUR = mountedFrames(6);

const W0: Win = [250, 258, 296, 312];

export const Scene06: React.FC = () => (
  <BedChain segs={chain(6)} dur={S06_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="52" label="Race Winless Streak" at={256} win={W0} />
    <Hit file="Pop.mp3" at={256} volume={0.28} />
  </BedChain>
);
