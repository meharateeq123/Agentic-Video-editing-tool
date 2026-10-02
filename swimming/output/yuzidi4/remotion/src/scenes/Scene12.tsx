import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

// Scene 12 - "Yu Yiting... out-qualified Yu Zidi by more than half a second... finished 1.89 seconds
// behind her in the final... Japan's Mio Narita took bronze." Podium footage carries it, no name
// plate on a face this film can't verify from the frame alone.
export const Scene12: React.FC = () => (
  <BedChain segs={chain(12)} dur={S12_DUR} amp={0.05} maxBlur={0} dim={0} />
);
