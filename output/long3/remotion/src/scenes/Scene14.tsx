import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S14_DUR = mountedFrames(14);



export const Scene14: React.FC = () => (
  <BedChain segs={chain(14)} dur={S14_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="I wasn't trying to wreck him." who="Carson Hocevar" win={[74, 86, 126, 142]} fontSize={44} />

  </BedChain>
);
