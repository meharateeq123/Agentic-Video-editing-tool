import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S21_DUR = mountedFrames(21);

/**
 * Scene 21 - "An independent company, Marden-Kane, runs the random drawing on or about October 2. The winner is announced on Cleetus McFarland's YouTube channel on or about October 23."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene21: React.FC = () => <BedChain segs={chain(21)} dur={S21_DUR} />;
