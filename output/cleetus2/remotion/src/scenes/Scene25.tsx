import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S25_DUR = mountedFrames(25);

/**
 * Scene 25 - "One more warning: the rules include a scam alert. The real company only contacts a winner by the phone or email they entered with, and never asks for payment to claim a prize."
 *
 * Footage-only - no overlay. Per the user's standing note for this film: default every line to
 * no text; only add a graphic when there's a real photo or a real number comparison to show.
 */
export const Scene25: React.FC = () => <BedChain segs={chain(25)} dur={S25_DUR} />;
