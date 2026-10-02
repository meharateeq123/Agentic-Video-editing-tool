import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S10_DUR = mountedFrames(10);

const W0: Win = [32, 44, 130, 150];

export const Scene10: React.FC = () => (
  <BedChain segs={chain(10)} dur={S10_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="Bruised" label="Left Eye, Two Punches" at={40} win={W0} color={C.red} />
    <Hit file="Pop.mp3" at={40} volume={0.28} />


  </BedChain>
);
