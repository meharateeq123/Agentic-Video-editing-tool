import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S34_DUR = mountedFrames(34);

/**
 * Scene 34
 * If you want to follow Ayden Tan's next chapter as he keeps chasing faster times in the 13-14 age
 * group, subscribe now. The fastest 13-year-old in the country is just getting started.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene34: React.FC = () => <BedChain segs={chain(34)} dur={S34_DUR} />;
