import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S21_DUR = mountedFrames(21);

const W0: Win = [168, 180, 238, 258];

export const Scene21: React.FC = () => (
  <BedChain segs={chain(21)} dur={S21_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="3rd" label="Hocevar's Finish" at={176} win={W0} color={C.emerald} />
    <Hit file="Pop.mp3" at={176} volume={0.28} />


  </BedChain>
);
