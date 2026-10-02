import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1 - "The morning session ends... Yu Yiting... ahead of her... 200 fly the day before might
 * have been the peak of her Asian Games. Then the final starts."
 * Pure hook: standing behind the blocks, then the dive. No overlay - the footage carries it.
 */
export const Scene01: React.FC = () => (
  <BedChain segs={chain(1)} dur={S01_DUR} amp={0.06} maxBlur={0} dim={0} />
);
