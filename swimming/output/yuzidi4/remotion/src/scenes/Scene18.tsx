import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

// Scene 18 - "None of this guarantees anything... McIntosh herself is still only 20, with years of
// her own competitive prime still ahead of her." Footage only.
export const Scene18: React.FC = () => (
  <BedChain segs={chain(18)} dur={S18_DUR} amp={0.04} maxBlur={0} dim={0} />
);
