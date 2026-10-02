import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

// Scene 15 - "The team won six of seven swimming gold medals on the first night... Yu's second win
// in the 200 IM stood on its own." Footage only.
export const Scene15: React.FC = () => (
  <BedChain segs={chain(15)} dur={S15_DUR} amp={0.05} maxBlur={0} dim={0} />
);
