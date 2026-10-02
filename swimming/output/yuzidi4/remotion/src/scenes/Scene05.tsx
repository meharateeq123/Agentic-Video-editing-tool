import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

// Scene 5 - "the opening butterfly leg... 26.91... faster than Summer McIntosh's own world-record
// pace... 27.19." Her own fly stroke carries it - no card.
export const Scene05: React.FC = () => (
  <BedChain segs={chain(5)} dur={S05_DUR} amp={0.05} maxBlur={0} dim={0} />
);
