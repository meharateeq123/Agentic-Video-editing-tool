import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S04_DUR = mountedFrames(4);

const W0: Win = [40, 52, 112, 132];

export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="457" label="The Lap" at={48} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={48} volume={0.28} />


  </BedChain>
);
