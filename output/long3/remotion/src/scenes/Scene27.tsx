import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S27_DUR = mountedFrames(27);

export const Scene27: React.FC = () => (
  <BedChain segs={chain(27)} dur={S27_DUR} amp={0.05} />
);
