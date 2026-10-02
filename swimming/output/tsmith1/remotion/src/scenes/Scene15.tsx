import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15
 * That honesty matters, because the road back to an Olympic final is genuinely uncertain. Smith
 * herself has been careful not to promise a result. Los Angeles 2028 is the goal, in her own
 * words, not a guarantee. She still has to build an entirely new race, requalify through national
 * and international standards, and earn a spot on the South African Olympic team all over again,
 * the same process every swimmer faces, with no shortcuts for past Olympic success.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene15: React.FC = () => (
  <BedChain segs={chain(15)} dur={S15_DUR} amp={0.04} maxBlur={0} dim={0} />
);
