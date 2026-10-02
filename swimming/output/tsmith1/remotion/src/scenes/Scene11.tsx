import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S11_DUR = mountedFrames(11);

/**
 * Scene 11
 * That history makes the target of her comeback even more striking. Smith is not just switching
 * distances within a stroke she already dominates. The 50 meter breaststroke rewards a different
 * physical profile than the events that built her career, explosive power over a single length
 * rather than the pacing and endurance she perfected over years of 100 and 200 meter racing. At
 * 29, she is asking her body to develop a skill set it was never specifically trained for during
 * her entire competitive rise.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene11: React.FC = () => (
  <BedChain segs={chain(11)} dur={S11_DUR} amp={0.04} maxBlur={0} dim={0} />
);
