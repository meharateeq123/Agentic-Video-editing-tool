import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S03_DUR = mountedFrames(3);

const W0: Win = [8, 18, 74, 92];

export const Scene03: React.FC = () => (
  <BedChain segs={chain(3)} dur={S03_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="43" label="Laps To Go" at={14} win={W0} color={C.red} />
    <Hit file="Pop.mp3" at={14} volume={0.28} />


  </BedChain>
);
