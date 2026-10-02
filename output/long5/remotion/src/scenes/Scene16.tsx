import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S16_DUR = mountedFrames(16);

const W0: Win = [2, 10, 88, 108];
const W1: Win = [126, 134, 172, 188];

export const Scene16: React.FC = () => (
  <BedChain segs={chain(16)} dur={S16_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <IdCard photo="id/reddick-id.jpg" name="Tyler Reddick" affiliation="23XI Racing" focus={[50, 50]} zoom={1} win={W0} />
    <Hit file="Pop.mp3" at={6} volume={0.28} />
    <RankStamp value="APRIL" label="Reddick Won Kansas" at={132} win={W1} />
    <Hit file="Pop.mp3" at={132} volume={0.28} />
  </BedChain>
);
