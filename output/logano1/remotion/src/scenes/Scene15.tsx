import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S15_DUR = mountedFrames(15);

/**
 * Scene 15 - "The margin Logano posted in qualifying is the kind of number that gets a paddock's
 * attention. Whether it translates into a race-winning car on Sunday is the question that actually
 * decides this weekend. Larson, sitting right next to him on the front row, is more than capable
 * of turning a five-tenths deficit in qualifying into a race lead within the first ten laps if his
 * long-run speed shows up the way it did at Darlington. Blaney and Bell, both starting in the
 * second row, have already proven this season they can win from exactly this kind of position."
 * Closing analysis, restates numbers already shown earlier - footage-only.
 */
export const Scene15: React.FC = () => <BedChain segs={chain(15)} dur={S15_DUR} />;
