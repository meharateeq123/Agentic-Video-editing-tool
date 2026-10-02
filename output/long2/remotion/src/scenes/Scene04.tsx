import React from 'react';
import {BedChain} from '../components/BedChain';
import {QuoteBar} from '../components/QuoteBar';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

// Footage is two real ranges of the same interview cut back-to-back (build-footage.mjs scene 4):
// link 1 = source 31.2-43.13s (the "it's a shame" quote at source 33.2-41.6s -> local f60-f312),
// link 2 = source 26.8-30.83s (the "keep going" quote at source 28.9-30.6s -> local f424-f475,
// link 2 starts at local f361). Captions are timed to those local positions, not guessed.
const Q1: Win = [46, 60, 316, 340];
const Q2: Win = [410, 424, 479, 490];

export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} amp={0.03}>
    <QuoteBar
      text="It's a shame. I thought we did a good job today. The car was good and had good stage points and was looking forward to the end of the race."
      who="Ryan Blaney, after Gateway"
      win={Q1}
      fontSize={33}
    />
    <QuoteBar
      text="Just got to keep going. Go to the next week and try to have a good day."
      who="Ryan Blaney, after Gateway"
      win={Q2}
      fontSize={36}
    />
  </BedChain>
);
