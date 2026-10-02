import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S08_DUR = mountedFrames(8);

const W0: Win = [265, 273, 300, 312];
const W1: Win = [311, 319, 357, 373];
const W2: Win = [393, 401, 439, 455];

export const Scene08: React.FC = () => (
  <BedChain segs={chain(8)} dur={S08_DUR} wins={[W0, W1, W2]} amp={0.05} maxBlur={8} dim={0.3}>
    <IdCard photo="id/reddick-id.jpg" name="Tyler Reddick" affiliation="23XI Racing" focus={[50, 50]} zoom={1} win={W0} />
    <Hit file="Pop.mp3" at={269} volume={0.28} />
    <RankStamp value="17" label="Races Led - Reddick" at={317} win={W1} />
    <Hit file="Pop.mp3" at={317} volume={0.28} />
    <RankStamp value="11" label="Races Led - Hamlin" at={398} win={W2} />
    <Hit file="Pop.mp3" at={398} volume={0.28} />
  </BedChain>
);
