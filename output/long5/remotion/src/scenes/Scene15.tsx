import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S15_DUR = mountedFrames(15);

const W0: Win = [271, 279, 290, 298];
const W1: Win = [292, 300, 336, 344];
const W2: Win = [340, 348, 388, 404];

export const Scene15: React.FC = () => (
  <BedChain segs={chain(15)} dur={S15_DUR} wins={[W0, W1, W2]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="2" label="Kansas Wins" at={277} win={W0} />
    <Hit file="Pop.mp3" at={277} volume={0.28} />
    <RankStamp value="14" label="Top-10 Finishes" at={298} win={W1} />
    <Hit file="Pop.mp3" at={298} volume={0.28} />
    <RankStamp value="21" label="Career Starts" at={346} win={W2} />
    <Hit file="Pop.mp3" at={346} volume={0.28} />
  </BedChain>
);
