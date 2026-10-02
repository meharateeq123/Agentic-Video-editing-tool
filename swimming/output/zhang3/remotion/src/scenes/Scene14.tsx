import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14
 * @generated-plain Footage only, no overlay.
 */
export const Scene14: React.FC = () => (
  <BedChain segs={chain(14)} dur={S14_DUR} amp={0.04} maxBlur={0} dim={0} />
);
