import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S13_DUR = mountedFrames(13);

export const Scene13: React.FC = () => (
  <BedChain segs={chain(13)} dur={S13_DUR} amp={0.05} />
);
