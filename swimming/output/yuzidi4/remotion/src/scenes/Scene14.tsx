import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

// Scene 14 - "world-class speed in butterfly, backstroke, breaststroke, and freestyle... currently
// the fastest 200 IM swum by anyone in the world this year, at any age, in any country." Footage
// only - stated plainly in the VO.
export const Scene14: React.FC = () => (
  <BedChain segs={chain(14)} dur={S14_DUR} amp={0.05} maxBlur={0} dim={0} />
);
