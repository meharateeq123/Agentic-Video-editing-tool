import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
import {RankStamp} from '../components/Stamp';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
export const S07_DUR = mountedFrames(7);

const W0: Win = [239, 247, 325, 340];
const W1: Win = [350, 358, 384, 396];
const W2: Win = [400, 408, 470, 489];

export const Scene07: React.FC = () => (
  <BedChain segs={chain(7)} dur={S07_DUR} wins={[W0, W1, W2]} amp={0.05} maxBlur={8} dim={0.3}>
    <IdCard photo="id/hocevar-id.jpg" name="Carson Hocevar" affiliation="Spire Motorsports" focus={[50, 50]} zoom={1} win={W0} />
    <Hit file="Pop.mp3" at={243} volume={0.28} />
    <RankStamp value="<0.01" label="Second Margin At Bristol" at={357} win={W1} />
    <Hit file="Pop.mp3" at={357} volume={0.28} />
    <IdCard photo="id/logano-id.jpg" name="Joey Logano" affiliation="Team Penske" focus={[50, 50]} zoom={1} win={W2} />
    <Hit file="Pop.mp3" at={404} volume={0.28} />
  </BedChain>
);
