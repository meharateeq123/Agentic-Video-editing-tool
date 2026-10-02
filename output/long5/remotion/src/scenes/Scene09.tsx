import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {VenueStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S09_DUR = mountedFrames(9);

const W0: Win = [0, 10, 76, 92];

export const Scene09: React.FC = () => (
  <BedChain segs={chain(9)} dur={S09_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <VenueStamp title="Kyle Larson" sub="After Bristol - P2" win={W0} />
    <Hit file="Pop.mp3" at={6} volume={0.28} />
  </BedChain>
);
