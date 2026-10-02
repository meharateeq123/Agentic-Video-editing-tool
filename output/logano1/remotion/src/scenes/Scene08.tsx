import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S08_DUR = mountedFrames(8);

/**
 * Scene 8 - "That's a driver treating this pole as more than a nice starting spot. Starting first
 * at Gateway means avoiding traffic in the opening laps, banking stage points early, and
 * controlling the race on his own terms, all things Logano needs if he wants to climb back into
 * real title contention." No new number or quote here - footage-only.
 */
export const Scene08: React.FC = () => <BedChain segs={chain(8)} dur={S08_DUR} />;
