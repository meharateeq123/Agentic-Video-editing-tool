import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S19_DUR = mountedFrames(19);

const W0: Win = [246, 254, 292, 308];

export const Scene19: React.FC = () => (
  <BedChain segs={chain(19)} dur={S19_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="0" label="More Points Resets" at={252} win={W0} />
    <Hit file="Pop.mp3" at={252} volume={0.28} />
  </BedChain>
);
