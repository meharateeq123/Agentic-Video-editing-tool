import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14
 * Smith has also been clear about what this comeback is not. It is not about proving anything. She
 * has said directly that she already achieved more in swimming than she ever imagined possible,
 * and that she has nothing left to prove to anyone. What she wants now is simply to find out how
 * this new chapter turns out, even though she does not know the ending herself.
 *
 * @generated-plain Footage only, no overlay.
 */
export const Scene14: React.FC = () => (
  <BedChain segs={chain(14)} dur={S14_DUR} amp={0.04} maxBlur={0} dim={0} />
);
