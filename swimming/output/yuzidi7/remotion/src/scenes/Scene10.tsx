import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10
 * @generated-plain Footage only, no overlay.
 */
export const Scene10: React.FC = () => (
  <BedChain segs={chain(10)} dur={S10_DUR} amp={0.04} maxBlur={0} dim={0} />
);
