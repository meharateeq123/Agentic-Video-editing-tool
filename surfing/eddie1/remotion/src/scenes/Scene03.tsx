import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S03_DUR = mountedFrames(3);

// 'Eddie' is said at 11.5s = scene frame 7. The card lands on it and travels off ~1s later.
const W0: Win = [4, 12, 70, 96];

export const Scene03: React.FC = () => (
  <BedChain segs={chain(3)} dur={S03_DUR} wins={[W0]} amp={0.05} maxBlur={6} dim={0.25}>
    <IdCard photo="id/eddie-id.jpg" name="Eddie Aikau" affiliation="Waimea Bay's first lifeguard" focus={[50, 40]} zoom={1} win={W0} />
    <Hit file="Pop.mp3" at={7} volume={0.28} />
  </BedChain>
);

