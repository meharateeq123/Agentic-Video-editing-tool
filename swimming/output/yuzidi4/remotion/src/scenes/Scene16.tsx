import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

// Scene 16 - "the 400 meter individual medley later this week... ranks eighth all-time after a
// 4:30.79 swim earlier this year." Footage only.
export const Scene16: React.FC = () => (
  <BedChain segs={chain(16)} dur={S16_DUR} amp={0.05} maxBlur={0} dim={0} />
);
