import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S05_DUR = mountedFrames(5);

const W0: Win = [194, 202, 240, 256];
const W1: Win = [458, 466, 504, 520];

export const Scene05: React.FC = () => (
  <BedChain segs={chain(5)} dur={S05_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="1" label="Reset Only" at={200} win={W0} />
    <Hit file="Pop.mp3" at={200} volume={0.28} />
    <RankStamp value="0" label="Eliminated This Weekend" at={464} win={W1} />
    <Hit file="Pop.mp3" at={464} volume={0.28} />
  </BedChain>
);
