import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

export const Scene14: React.FC = () => (
  <BedChain segs={chain(14)} dur={S14_DUR} amp={0.05} />
);
