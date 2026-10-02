import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S12_DUR = mountedFrames(12);



export const Scene12: React.FC = () => (
  <BedChain segs={chain(12)} dur={S12_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="I wasn't planning on throwing anything. I just really wanted to grab him and yell at him and show my displeasure." who="Ryan Blaney, on Actions Detrimental" win={[212, 224, 288, 300]} fontSize={32} />

  </BedChain>
);
