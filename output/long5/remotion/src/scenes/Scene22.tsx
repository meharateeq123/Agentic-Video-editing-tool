import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S22_DUR = mountedFrames(22);

const W0: Win = [175, 183, 261, 281];

export const Scene22: React.FC = () => (
  <BedChain segs={chain(22)} dur={S22_DUR} wins={[W0]} amp={0.05} maxBlur={8} dim={0.3}>
    <IdCard photo="id/larson-id.jpg" name="Kyle Larson" affiliation="Hendrick Motorsports" focus={[50, 50]} zoom={1} win={W0} />
    <Hit file="Pop.mp3" at={179} volume={0.28} />
  </BedChain>
);
