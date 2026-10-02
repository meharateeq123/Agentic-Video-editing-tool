import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15
 * That pace has continued into his 13-14 season, with meets stacked through the winter, spring,
 * and summer months. Consistent racing at that frequency is unusual even among serious age-group
 * swimmers, and it means Tan's improvements are happening under real competitive pressure, not
 * just in isolated time trials.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene15: React.FC = () => <BedChain segs={chain(15)} dur={S15_DUR} />;
