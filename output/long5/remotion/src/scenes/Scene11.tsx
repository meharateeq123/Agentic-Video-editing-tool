import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S11_DUR = mountedFrames(11);

const W0: Win = [114, 122, 160, 176];

export const Scene11: React.FC = () => (
  <BedChain segs={chain(11)} dur={S11_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="8TH" label="Hamlin At Bristol" at={120} win={W0} />
    <Hit file="Pop.mp3" at={120} volume={0.28} />
  </BedChain>
);
