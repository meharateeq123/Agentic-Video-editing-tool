import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';
export const S09_DUR = mountedFrames(9);

export const Scene09: React.FC = () => (
  <BedChain segs={chain(9)} dur={S09_DUR} amp={0.05} maxBlur={0} dim={0} />
);

