import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S25_DUR = mountedFrames(25);

export const Scene25: React.FC = () => (
  <BedChain segs={chain(25)} dur={S25_DUR} amp={0.05} />
);
