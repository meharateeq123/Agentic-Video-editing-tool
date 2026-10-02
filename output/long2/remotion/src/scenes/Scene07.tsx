import React from 'react';
import {BedChain} from '../components/BedChain';
import {QuoteBar} from '../components/QuoteBar';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import {C} from '../theme';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

// "just 0.055 seconds" lands f408-f456; the real April quote runs f609-f919.
const STAMP: Win = [416, 438, 506, 532];
const QUOTE: Win = [600, 626, 918, 941];

export const Scene07: React.FC = () => (
  <BedChain segs={chain(7)} dur={S07_DUR} wins={[STAMP]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="0.055" label="Seconds Behind Gibbs" at={438} win={STAMP} color={C.amber} />
    <Hit file="Pop.mp3" at={438} />
    <QuoteBar
      text="I got free into three, two or three laps before the last yellow. I slipped into three and was up to the track, but was side by side with Ty, and that really hurt us. Yeah, a little too late."
      who="Ryan Blaney, after the Food City 500"
      win={QUOTE}
      fontSize={31}
    />
  </BedChain>
);
