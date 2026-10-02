import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S10_DUR = mountedFrames(10);

const W0: Win = [445, 453, 470, 481];
const W1: Win = [482, 490, 568, 588];

export const Scene10: React.FC = () => (
  <BedChain segs={chain(10)} dur={S10_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <RankStamp value="89" label="Points Over Blaney" at={451} win={W0} />
    <Hit file="Pop.mp3" at={451} volume={0.28} />
    <IdCard photo="id/blaney-id.jpg" name="Ryan Blaney" affiliation="Team Penske" focus={[50, 50]} zoom={1} win={W1} />
    <Hit file="Pop.mp3" at={486} volume={0.28} />
  </BedChain>
);
