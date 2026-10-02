import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14 - "Kyle Larson won the race, snapping his own 51-race winless streak, and vaulted from
 * seventh to second in the standings... Christopher Bell... slipped to third..." Real Larson
 * win/victory-lane footage (larson-win.mp4) - footage-only, the win speaks for itself.
 */
export const Scene14: React.FC = () => <BedChain segs={chain(14)} dur={S14_DUR} />;
