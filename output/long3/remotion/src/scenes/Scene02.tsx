import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S02_DUR = mountedFrames(2);

const W0: Win = [20, 30, 95, 110];
const W1: Win = [364, 376, 428, 448];

export const Scene02: React.FC = () => (
  <BedChain segs={chain(2)} dur={S02_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="29th" label="Starting Position" at={26} win={W0} color={C.amber} />
    <Hit file="Pop.mp3" at={26} volume={0.28} />
    <RankStamp value="202" label="Laps Led - Race High" at={371} win={W1} color={C.amber} />
    <Hit file="Pop.mp3" at={371} volume={0.28} />


  </BedChain>
);
