import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S15_DUR = mountedFrames(15);



export const Scene15: React.FC = () => (
  <BedChain segs={chain(15)} dur={S15_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="There wasn't a whole lot of talking. He just kind of said one thing and then went after me, and I wasn't going to take it." who="Carson Hocevar, after the race" win={[125, 138, 290, 306]} fontSize={34} />
    <QuoteBar text="I got ran into a lot for the win. That was for second, and he wants to come fight. They got an old school Bristol show here." who="Carson Hocevar, after the race" win={[413, 426, 582, 598]} fontSize={33} />

  </BedChain>
);
