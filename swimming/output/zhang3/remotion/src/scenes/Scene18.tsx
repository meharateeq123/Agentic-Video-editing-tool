import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18
 * @generated-plain Footage only, no overlay.
 */
export const Scene18: React.FC = () => (
  <BedChain segs={chain(18)} dur={S18_DUR} amp={0.04} maxBlur={0} dim={0} />
);
