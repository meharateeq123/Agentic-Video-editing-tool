import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10
 * These record swims were not accidents from a single hot week. They came from swimmers making
 * deliberate, sometimes painful choices about where to focus. McIntosh relocated her training to
 * work under Bob Bowman, the coach who guided Michael Phelps through his entire career. Her
 * training partner comparisons write themselves. Douglass, meanwhile, built her career on being
 * dangerously versatile, an Olympic champion in the slow, grinding 200 breaststroke who also
 * happens to own the fastest 50 free in history. That combination should not be possible in one
 * athlete. It is.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene10: React.FC = () => <BedChain segs={chain(10)} dur={S10_DUR} />;
