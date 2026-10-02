import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S16_DUR = mountedFrames(16);



export const Scene16: React.FC = () => (
  <BedChain segs={chain(16)} dur={S16_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="We're not going to encourage fighting, but what we are going to encourage is passion. Those are two guys - Blaney's showing his passion, showing his fire." who="Steve O'Donnell, NASCAR CEO" win={[302, 314, 378, 390]} fontSize={32} />

  </BedChain>
);
