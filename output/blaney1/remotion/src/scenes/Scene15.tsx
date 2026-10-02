import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15 - "In a championship format where one bad race can undo weeks of solid points, this is
 * exactly the kind of result that changes the entire complexion of a title run." Footage-only.
 */
export const Scene15: React.FC = () => <BedChain segs={chain(15)} dur={S15_DUR} />;
