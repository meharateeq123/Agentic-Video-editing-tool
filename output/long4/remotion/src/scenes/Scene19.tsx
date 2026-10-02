import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S19_DUR = mountedFrames(19);

const W0: Win = [32, 44, 130, 150];

export const Scene19: React.FC = () => (
  <BedChain segs={chain(19)} dur={S19_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="Pending" label="Crew Member Review" at={40} win={W0} color={C.muted} />
    <Hit file="Pop.mp3" at={40} volume={0.28} />


  </BedChain>
);
