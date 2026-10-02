import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S20_DUR = mountedFrames(20);

/**
 * Scene 20
 * If you want to follow Tatjana Smith's comeback from her first race back this week all the way to
 * Los Angeles 2028, subscribe now. A two-time Olympic champion just chose to start over, in an
 * event that has never existed before.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene20: React.FC = () => (
  <BedChain segs={chain(20)} dur={S20_DUR} amp={0.04} maxBlur={0} dim={0} />
);
