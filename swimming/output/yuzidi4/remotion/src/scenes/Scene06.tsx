import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

// Scene 6 - "the backstroke leg is where the gap opened up... 58.87... behind McIntosh's checkpoint
// of 57.99... the clearest technical gap left in her race." Footage only.
export const Scene06: React.FC = () => (
  <BedChain segs={chain(6)} dur={S06_DUR} amp={0.05} maxBlur={0} dim={0} />
);
