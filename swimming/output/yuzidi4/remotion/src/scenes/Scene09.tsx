import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

// Scene 9 - "The margin between them is 0.40 seconds... a fraction most viewers could not perceive
// with the naked eye." Footage only - the VO makes the point itself.
export const Scene09: React.FC = () => (
  <BedChain segs={chain(9)} dur={S09_DUR} amp={0.04} maxBlur={0} dim={0} />
);
