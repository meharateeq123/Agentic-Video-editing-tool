import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6
 * Smith is not targeting the 100 or 200 meter breaststroke, the two distances that delivered every
 * one of her Olympic medals. She is targeting the 50 meter breaststroke, a completely new event.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene06: React.FC = () => (
  <BedChain segs={chain(6)} dur={S06_DUR} amp={0.04} maxBlur={0} dim={0} />
);
