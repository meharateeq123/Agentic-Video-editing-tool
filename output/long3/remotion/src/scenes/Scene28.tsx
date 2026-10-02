import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S28_DUR = mountedFrames(28);

export const Scene28: React.FC = () => (
  <BedChain segs={chain(28)} dur={S28_DUR} amp={0.05} />
);
