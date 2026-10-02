import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S03_DUR = mountedFrames(3);



export const Scene03: React.FC = () => (
  <BedChain segs={chain(3)} dur={S03_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="I just felt like he didn't lift. I left him plenty of room. Didn't chop him, didn't run him into the fence, nothing. I protected the bottom, and he decided that he wanted to be there, didn't lift and wrecked me." who="Ryan Blaney, infield care center" win={[340, 354, 700, 720]} fontSize={30} />

  </BedChain>
);
