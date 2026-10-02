import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S08_DUR = mountedFrames(8);



export const Scene08: React.FC = () => (
  <BedChain segs={chain(8)} dur={S08_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="I haven't had a problem with him for probably a year and a half, but it's getting old." who="Ryan Blaney, infield care center" win={[514, 528, 632, 650]} fontSize={36} />

  </BedChain>
);
