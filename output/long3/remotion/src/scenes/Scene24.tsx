import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S24_DUR = mountedFrames(24);

const W0: Win = [110, 124, 192, 212];

export const Scene24: React.FC = () => (
  <BedChain segs={chain(24)} dur={S24_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="2023" label="Cup Series Champion" at={118} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={118} volume={0.28} />


  </BedChain>
);
