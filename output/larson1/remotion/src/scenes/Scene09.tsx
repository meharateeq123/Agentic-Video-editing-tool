import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S09_DUR = mountedFrames(9);

/**
 * Scene 9 - "Bell restarted further back but quickly closed the gap. Within two laps of the
 * restart, Bell was on Larson's bumper. With 12 laps remaining, Bell made the winning move underneath
 * him and pulled away for good."
 *
 * The cold-open hook already showed this exact pass with its own sound and no graphic over it. This
 * scene covers the same moment from the narration's side, on different footage from the same
 * closing stretch - and stays bare for the same reason the hook was bare: the pass doesn't need
 * captioning twice.
 */
export const Scene09: React.FC = () => <BedChain segs={chain(9)} dur={S09_DUR} />;
