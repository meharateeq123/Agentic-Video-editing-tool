import React from 'react';
import {BedChain} from '../components/BedChain';
import {IdCard} from '../components/IdCard';
import {Hit} from '../components/Hit';
import type {Win} from '../components/Bed';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

// "Blaney has real, specific history at Bristol" - "Blaney" lands f122. The card lands on his name.
// Portrait: a frame of his own FOX post-race interview (public/id/blaney-id.jpg), where the same
// clip carries the on-screen "RYAN BLANEY" graphic.
const W: Win = [116, 124, 204, 230];

export const Scene06: React.FC = () => (
  <BedChain segs={chain(6)} dur={S06_DUR} wins={[W]} amp={0.05} maxBlur={8} dim={0.3}>
    <IdCard photo="id/blaney-id.jpg" name="Ryan Blaney" affiliation="No. 12 - Team Penske" focus={[50, 45]} zoom={1.1} win={W} />
    <Hit file="Pop.mp3" at={116} />
  </BedChain>
);
