import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

export const Scene06: React.FC = () => (
  <BedChain segs={chain(6)} dur={S06_DUR} amp={0.05} />
);
