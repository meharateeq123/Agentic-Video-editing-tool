import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S14_DUR = mountedFrames(14);

/**
 * Scene 14 - "A dominant qualifying lap is not the same as a race win, and Logano knows that
 * better than most. Track position matters at Gateway, but so does long-run pace, pit strategy,
 * and everything else that plays out over the course of 300 miles. Still, starting from the pole
 * gives Logano control over exactly the kind of race he says he needs right now: clean air, an
 * early shot at stage points, and a real chance to close the gap on Hamlin before the Chase moves
 * any further." Analysis, not a new number - footage-only.
 */
export const Scene14: React.FC = () => <BedChain segs={chain(14)} dur={S14_DUR} />;
