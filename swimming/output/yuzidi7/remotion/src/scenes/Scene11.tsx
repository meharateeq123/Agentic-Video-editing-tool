import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11
 * @generated-plain Footage only, no overlay.
 */
export const Scene11: React.FC = () => (
  <BedChain segs={chain(11)} dur={S11_DUR} amp={0.04} maxBlur={0} dim={0} />
);
