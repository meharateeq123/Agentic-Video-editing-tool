import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

export const Scene03: React.FC = () => (
  <BedChain segs={chain(3)} dur={S03_DUR} amp={0.05} />
);
