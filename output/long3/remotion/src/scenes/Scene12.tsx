import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

export const Scene12: React.FC = () => (
  <BedChain segs={chain(12)} dur={S12_DUR} amp={0.05} />
);
