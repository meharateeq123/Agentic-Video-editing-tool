import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S03_DUR = mountedFrames(3);

/**
 * Scene 3
 * For two years, that retirement held. Smith stepped fully away from competitive swimming. She has
 * said that when she made the announcement, she genuinely believed that chapter of her life was
 * closed for good.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene03: React.FC = () => (
  <BedChain segs={chain(3)} dur={S03_DUR} amp={0.04} maxBlur={0} dim={0} />
);
