import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S15_DUR = mountedFrames(15);

const W0: Win = [32, 44, 150, 170];

export const Scene15: React.FC = () => (
  <BedChain segs={chain(15)} dur={S15_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="No Penalty" label="Blaney or Hocevar" at={40} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={40} volume={0.28} />


  </BedChain>
);
