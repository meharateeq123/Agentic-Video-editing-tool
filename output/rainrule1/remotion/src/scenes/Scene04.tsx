import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} amp={0.05} />
);
