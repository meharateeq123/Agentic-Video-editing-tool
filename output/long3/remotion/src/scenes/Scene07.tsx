import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';

export const S07_DUR = mountedFrames(7);



export const Scene07: React.FC = () => (
  <BedChain segs={chain(7)} dur={S07_DUR} wins={[]} amp={0.05} maxBlur={8} dim={0.3}>

    <QuoteBar text="He crossed and never lifted, and I got crashed." who="Ryan Blaney, after the wreck" win={[104, 118, 190, 204]} fontSize={38} />
    <QuoteBar text="I protected pretty early and he just kept coming left and never lifted and crashed me." who="Ryan Blaney, after the wreck" win={[244, 258, 355, 370]} fontSize={34} />
    <QuoteBar text="Something is gonna happen." who="Ryan Blaney, after the wreck" win={[460, 472, 500, 516]} fontSize={44} />

  </BedChain>
);
