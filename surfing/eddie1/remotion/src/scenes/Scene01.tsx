import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {VenueStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S01_DUR = mountedFrames(1);

// March 1978, Molokai: the place stamp lands on 'Molokai' (2.6s = frame 78) and leaves ~1s after.
const W0: Win = [70, 80, 124, 140];

export const Scene01: React.FC = () => (
  <BedChain segs={chain(1)} dur={S01_DUR} wins={[W0]} amp={0.05} maxBlur={6} dim={0.25}>
    <VenueStamp title="Molokai Channel" sub="March 1978 - Hokule'a capsizes" win={W0} />
    <Hit file="Pop.mp3" at={78} volume={0.28} />
  </BedChain>
);

