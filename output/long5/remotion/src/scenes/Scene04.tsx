import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S04_DUR = mountedFrames(4);

const W0: Win = [40, 48, 86, 102];

export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="17" label="Points Cover The Top 4" at={46} win={W0} />
    <Hit file="Pop.mp3" at={46} volume={0.28} />
  </BedChain>
);
