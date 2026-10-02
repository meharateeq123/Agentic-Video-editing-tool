import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S18_DUR = mountedFrames(18);

/**
 * Scene 18 - "The third way is the one a lot of people completely miss: enter free by mail. Each mailed entry counts as two, no limit, no purchase required."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene18: React.FC = () => <BedChain segs={chain(18)} dur={S18_DUR} />;
