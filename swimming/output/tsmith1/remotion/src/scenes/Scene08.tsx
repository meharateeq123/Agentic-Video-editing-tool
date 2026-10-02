import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8
 * She has described the difference between her old races and this new one directly. The 50 is one
 * length, no turn, and almost no room to recover if the start, the pull-out, the breakout, or the
 * touch goes even slightly wrong. Everything has to happen at once, with no chance to settle into
 * a rhythm the way she could across 100 or 200 meters.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene08: React.FC = () => (
  <BedChain segs={chain(8)} dur={S08_DUR} amp={0.04} maxBlur={0} dim={0} />
);
