import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9
 * That difference is not just about distance. It is about a completely different kind of athlete.
 * Smith herself compares it to the gap between a marathon runner and a 100 meter sprinter on a
 * track. Different training. Different body demands. Different racing mentality. She is
 * essentially asking her body to become a different kind of swimmer than the one that won four
 * Olympic medals.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene09: React.FC = () => (
  <BedChain segs={chain(9)} dur={S09_DUR} amp={0.04} maxBlur={0} dim={0} />
);
