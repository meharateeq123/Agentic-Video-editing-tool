import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

export const Scene01: React.FC = () => (
  <BedChain segs={chain(1)} dur={S01_DUR} amp={0.05} />
);
