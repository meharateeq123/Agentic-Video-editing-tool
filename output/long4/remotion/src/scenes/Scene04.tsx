import React from 'react';
import {BedChain} from '../components/BedChain';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

const W0: Win = [4, 12, 34, 46];
const W1: Win = [40, 48, 70, 82];

export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="33rd" label="Ryan Blaney" at={12} win={W0} color={C.red} />
    <Hit file="Pop.mp3" at={12} volume={0.28} />
    <RankStamp value="3rd" label="Carson Hocevar" at={48} win={W1} color={C.emerald} />
    <Hit file="Pop.mp3" at={48} volume={0.28} />
  </BedChain>
);
