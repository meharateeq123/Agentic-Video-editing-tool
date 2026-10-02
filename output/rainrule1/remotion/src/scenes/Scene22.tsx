import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S22_DUR = mountedFrames(22);

export const Scene22: React.FC = () => (
  <BedChain segs={chain(22)} dur={S22_DUR} amp={0.05} />
);
