import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S04_DUR = mountedFrames(4);

// Scene 4 - "China's own record book... Yu Yiting set it at 2:06.82... her own teammate took it
// away... by more than seven tenths." Footage only - the numbers are said plainly in the VO.
export const Scene04: React.FC = () => (
  <BedChain segs={chain(4)} dur={S04_DUR} amp={0.05} maxBlur={0} dim={0} />
);
