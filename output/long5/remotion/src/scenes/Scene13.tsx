import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S13_DUR = mountedFrames(13);

const W0: Win = [351, 359, 378, 388];
const W1: Win = [383, 391, 431, 447];

export const Scene13: React.FC = () => (
  <BedChain segs={chain(13)} dur={S13_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <IdCard photo="id/buescher-id.jpg" name="Chris Buescher" affiliation="RFK Racing" focus={[50, 50]} zoom={1} win={W0} />
    <Hit file="Pop.mp3" at={355} volume={0.28} />
    <RankStamp value="0.001s" label="Closest Finish In Cup History" at={389} win={W1} />
    <Hit file="Pop.mp3" at={389} volume={0.28} />
  </BedChain>
);
