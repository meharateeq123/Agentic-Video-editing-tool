import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16);

/**
 * Scene 16
 * @generated-plain Footage only, no overlay.
 */
export const Scene16: React.FC = () => (
  <BedChain segs={chain(16)} dur={S16_DUR} amp={0.04} maxBlur={0} dim={0} />
);
