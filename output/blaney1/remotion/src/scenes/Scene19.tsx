import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S19_DUR = mountedFrames(19);

/**
 * Scene 19 - "That's a driver refusing to let one race define his entire Chase. But the math
 * doesn't lie. A 16-point gap just became a 33-point gap..." Footage-only - the numbers were
 * already shown as a graphic in scene 13, so this recap plays as pure narration over real
 * footage rather than repeating the same stat card.
 */
export const Scene19: React.FC = () => <BedChain segs={chain(19)} dur={S19_DUR} />;
