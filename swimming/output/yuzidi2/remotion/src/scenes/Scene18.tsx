import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18
 * Her competitors this time are not the same mix of established senior stars she faced in
 * Singapore. The Asian Games field includes swimmers from Japan, South Korea, and across the
 * continent who have spent years building toward exactly this kind of meet. Some have Olympic
 * experience. Others have spent the past year specifically preparing to close the gap on China's
 * fastest swimmers. Yu will not have the element of being the youngest surprise in the pool. She
 * will have to win, or come close to winning, as the swimmer everyone is watching.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene18: React.FC = () => <BedChain segs={chain(18)} dur={S18_DUR} />;
