import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S01_DUR = mountedFrames(1);

const W0: Win = [6, 14, 52, 68];

export const Scene01: React.FC = () => (
  <BedChain segs={chain(1)} dur={S01_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="1" label="Point Gap" at={12} win={W0} />
    <Hit file="Pop.mp3" at={12} volume={0.28} />
  </BedChain>
);
