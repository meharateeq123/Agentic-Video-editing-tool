import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S12_DUR = mountedFrames(12);

/**
 * Scene 12 - "Once Bell got past him, Larson's night became about damage control... He crossed the
 * line in fifth place, at a tire deficit, but still ahead of several other Chase contenders who had
 * also stayed out on the same strategy."
 *
 * The finishing position (5th) gets its real payoff in scene 14's Darlington-drought graphic and
 * scene 5 already carried the film's one bar-chart stat moment, so this stays on footage - a quiet
 * beat between the pass and Larson's own words in scene 13.
 */
export const Scene12: React.FC = () => <BedChain segs={chain(12)} dur={S12_DUR} />;
