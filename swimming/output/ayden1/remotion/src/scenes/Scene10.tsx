import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10
 * Records at this age typically fall by tenths of a second, sometimes hundredths. Tan has been
 * resetting the bar for his entire age group in backstroke, not just chasing it.
 *
 * @generated-plain Footage only, no overlay. A graphic goes here only if this line has a real
 * photo, a real number comparison, or a real quote to show — otherwise it stays footage.
 */
export const Scene10: React.FC = () => <BedChain segs={chain(10)} dur={S10_DUR} />;
