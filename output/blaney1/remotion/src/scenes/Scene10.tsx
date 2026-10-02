import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10 - "Zane Smith suffered a brake failure earlier in the race that sent him hard into the
 * wall... Chase Elliott, running right behind Blaney, watched the entire thing happen in front of
 * him, and then suffered the exact same failure himself soon after." Real in-car footage of Zane
 * Smith's own crash (zane-crash.mp4) - footage-only, the moment carries itself.
 */
export const Scene10: React.FC = () => <BedChain segs={chain(10)} dur={S10_DUR} />;
