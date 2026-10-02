import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19
 * @generated-plain Footage only, no overlay.
 */
export const Scene19: React.FC = () => (
  <BedChain segs={chain(19)} dur={S19_DUR} amp={0.04} maxBlur={0} dim={0} />
);
