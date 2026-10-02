import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S02_DUR = mountedFrames(2);

export const Scene02: React.FC = () => (
  <BedChain segs={chain(2)} dur={S02_DUR} amp={0.05} />
);
