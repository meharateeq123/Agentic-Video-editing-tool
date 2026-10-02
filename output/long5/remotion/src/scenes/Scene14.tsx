import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S14_DUR = mountedFrames(14);

const W0: Win = [69, 77, 125, 139];
const W1: Win = [140, 148, 208, 226];

export const Scene14: React.FC = () => (
  <BedChain segs={chain(14)} dur={S14_DUR} wins={[W0, W1]} amp={0.05} maxBlur={8} dim={0.3}>
    <IdCard photo="id/wallace-id.jpg" name="Bubba Wallace" affiliation="23XI Racing" focus={[50, 50]} zoom={1} win={W0} />
    <Hit file="Pop.mp3" at={73} volume={0.28} />
    <IdCard photo="id/elliott-id.jpg" name="Chase Elliott" affiliation="Hendrick Motorsports" focus={[50, 50]} zoom={1} win={W1} />
    <Hit file="Pop.mp3" at={144} volume={0.28} />
  </BedChain>
);
