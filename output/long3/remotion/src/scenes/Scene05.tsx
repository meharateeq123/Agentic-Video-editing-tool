import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S05_DUR = mountedFrames(5);

const W0: Win = [200, 214, 270, 290];

export const Scene05: React.FC = () => (
  <BedChain segs={chain(5)} dur={S05_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="33rd" label="Final Result" at={208} win={W0} color={C.red} />
    <Hit file="Pop.mp3" at={208} volume={0.28} />


  </BedChain>
);
