import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

export const Scene20: React.FC = () => (
  <BedChain segs={chain(20)} dur={S20_DUR} amp={0.05} />
);
