import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

export const Scene21: React.FC = () => (
  <BedChain segs={chain(21)} dur={S21_DUR} amp={0.05} />
);
