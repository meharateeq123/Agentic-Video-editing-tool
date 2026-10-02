import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S07_DUR = mountedFrames(7);

/**
 * Scene 7 - "With 33 laps to go, a caution came out, followed by a red flag that lasted more than
 * seven minutes for rain. That stoppage forced every team into a critical decision."
 *
 * The setup for the strategy call that scene 8 names - left bare so the tension is in the footage
 * and the narration, not pre-empted by a graphic before the decision itself has even been described.
 */
export const Scene07: React.FC = () => <BedChain segs={chain(7)} dur={S07_DUR} />;
