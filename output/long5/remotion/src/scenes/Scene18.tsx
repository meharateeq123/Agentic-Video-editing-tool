import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S18_DUR = mountedFrames(18);

const W0: Win = [83, 91, 129, 145];

export const Scene18: React.FC = () => (
  <BedChain segs={chain(18)} dur={S18_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="3" label="Straight Top Fives" at={89} win={W0} />
    <Hit file="Pop.mp3" at={89} volume={0.28} />
  </BedChain>
);
