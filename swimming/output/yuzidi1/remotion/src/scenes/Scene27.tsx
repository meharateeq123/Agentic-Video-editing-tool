import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S27_DUR = mountedFrames(27);

/**
 * Scene 27
 * Three months later, in November 2025, Yu turned thirteen. Days after her birthday she raced the
 * 200 individual medley again, this time at China's National Games in Shenzhen. Her rival led her
 * by a full second at the halfway mark. Then Yu hit the breaststroke leg, reeled her in, and
 * pulled away.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene27: React.FC = () => <BedChain segs={chain(27)} dur={S27_DUR} />;
