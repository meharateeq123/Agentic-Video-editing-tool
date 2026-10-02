import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7
 * @generated-plain Footage only, no overlay.
 */
export const Scene07: React.FC = () => (
  <BedChain segs={chain(7)} dur={S07_DUR} amp={0.04} maxBlur={0} dim={0} />
);
