import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S16_DUR = mountedFrames(16); // 773f, 5 links

/**
 * Scene 16 -- "one event left on his 2026 schedule, a fall Truck Series race at Talladega... considering a full-time ARCA schedule for 2027."
 *
 * Mostly him talking, because the line is something he said, with the Truck footage the remaining race belongs to.
 */
export const Scene16: React.FC = () => <BedChain segs={chain(16)} dur={S16_DUR} />;
