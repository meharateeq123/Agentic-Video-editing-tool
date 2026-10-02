import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S18_DUR = mountedFrames(18);



export const Scene18: React.FC = () => (
  <BedChain segs={chain(18)} dur={S18_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="He took a swipe out of turn three and then came down, grabbed a hold of me - and a very big man once told me, we have a no push policy here at Trackhouse." who="Ross Chastain, 2023" win={[260, 274, 480, 500]} fontSize={32} />

  </BedChain>
);
