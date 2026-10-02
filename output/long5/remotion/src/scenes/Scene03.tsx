import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {VenueStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S03_DUR = mountedFrames(3);

const W0: Win = [-1, 6, 26, 36];
const W1: Win = [27, 35, 113, 133];
const W2: Win = [120, 130, 196, 212];

export const Scene03: React.FC = () => (
  <BedChain segs={chain(3)} dur={S03_DUR} wins={[W0, W1, W2]} amp={0.05} maxBlur={8} dim={0.3}>
    <IdCard photo="id/larson-id.jpg" name="Kyle Larson" affiliation="Hendrick Motorsports" focus={[50, 50]} zoom={1} win={W0} />
    <Hit file="Pop.mp3" at={3} volume={0.28} />
    <IdCard photo="id/hamlin-id.jpg" name="Denny Hamlin" affiliation="Joe Gibbs Racing" focus={[50, 50]} zoom={1} win={W1} />
    <Hit file="Pop.mp3" at={31} volume={0.28} />
    <VenueStamp title="Hollywood Casino 400" sub="Kansas Speedway - Race 4 of 10" win={W2} />
    <Hit file="Pop.mp3" at={126} volume={0.28} />
  </BedChain>
);
