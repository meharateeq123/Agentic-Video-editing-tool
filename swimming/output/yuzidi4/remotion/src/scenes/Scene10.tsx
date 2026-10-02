import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

// Scene 10 - "Yu's 2:06.10 was faster than the time Summer McIntosh swam to win Olympic gold...
// 2:06.56." Footage only.
export const Scene10: React.FC = () => (
  <BedChain segs={chain(10)} dur={S10_DUR} amp={0.05} maxBlur={0} dim={0} />
);
