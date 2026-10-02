import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S22_DUR = mountedFrames(22);

// Scene 22 (closing) - "subscribe now. The fastest 200 IM in the world right now belongs to a
// 13-year-old, and she is not finished yet." Footage only - the victory lap closes the film.
export const Scene22: React.FC = () => (
  <BedChain segs={chain(22)} dur={S22_DUR} amp={0.05} maxBlur={0} dim={0} />
);
