import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S01_DUR = mountedFrames(1);

/**
 * Scene 1
 * She stood on the podium in Paris with an Olympic gold medal around her neck. Then she walked
 * away from the sport completely. Two years later, she is back in the pool, chasing an event that
 * has never existed at the Olympics before. What changed her mind?
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene01: React.FC = () => (
  <BedChain segs={chain(1)} dur={S01_DUR} amp={0.04} maxBlur={0} dim={0} />
);
