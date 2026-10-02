import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

export const Scene08: React.FC = () => (
  <BedChain segs={chain(8)} dur={S08_DUR} amp={0.05} />
);
