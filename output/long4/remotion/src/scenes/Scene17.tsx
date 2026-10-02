import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S17_DUR = mountedFrames(17);



export const Scene17: React.FC = () => (
  <BedChain segs={chain(17)} dur={S17_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="Don't use your car as a weapon. We don't want to see that, or a right hook. Drivers need to handle their business outside of the car." who="Steve O'Donnell, NASCAR CEO" win={[310, 324, 620, 640]} fontSize={32} />

  </BedChain>
);
