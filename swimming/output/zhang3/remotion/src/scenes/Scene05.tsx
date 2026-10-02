import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5
 * @generated-plain Footage only, no overlay.
 */
export const Scene05: React.FC = () => (
  <BedChain segs={chain(5)} dur={S05_DUR} amp={0.04} maxBlur={0} dim={0} />
);
