import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {QuoteBar} from '../components/QuoteBar';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S10_DUR = mountedFrames(10);

// The last line is the legacy itself: the bottom-centre caption, sharp over the footage (no dimming).
const W0: Win = [30, 40, 100, 116];

export const Scene10: React.FC = () => (
  <BedChain segs={chain(10)} dur={S10_DUR} wins={[W0]} amp={0.05} maxBlur={0} dim={0}>
    <QuoteBar text="Eddie Would Go" who="Hawaii remembers" win={W0} whoAt={52} fontSize={64} />
    <Hit file="Pop.mp3" at={40} volume={0.28} />
  </BedChain>
);

