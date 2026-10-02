import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S29_DUR = mountedFrames(29);

/**
 * Scene 29 - "Cleetus, real name Garrett Mitchell, built this from a single YouTube channel into live events, the Freedom Factory racetrack, a clothing store, and a streaming platform."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene29: React.FC = () => <BedChain segs={chain(29)} dur={S29_DUR} />;
