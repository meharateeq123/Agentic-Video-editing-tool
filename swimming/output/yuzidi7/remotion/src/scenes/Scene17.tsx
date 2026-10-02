import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S17_DUR = mountedFrames(17);

/**
 * Scene 17
 * @generated-plain Footage only, no overlay.
 */
export const Scene17: React.FC = () => (
  <BedChain segs={chain(17)} dur={S17_DUR} amp={0.04} maxBlur={0} dim={0} />
);
