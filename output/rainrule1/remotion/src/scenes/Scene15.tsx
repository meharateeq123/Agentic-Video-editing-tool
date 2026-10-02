import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

export const Scene15: React.FC = () => (
  <BedChain segs={chain(15)} dur={S15_DUR} amp={0.05} />
);
