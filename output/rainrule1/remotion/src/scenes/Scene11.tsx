import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

export const Scene11: React.FC = () => (
  <BedChain segs={chain(11)} dur={S11_DUR} amp={0.05} />
);
