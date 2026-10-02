import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S23_DUR = mountedFrames(23);

export const Scene23: React.FC = () => (
  <BedChain segs={chain(23)} dur={S23_DUR} amp={0.05} />
);
