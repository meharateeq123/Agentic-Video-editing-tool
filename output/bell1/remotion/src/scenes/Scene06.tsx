import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S06_DUR = mountedFrames(6);

/**
 * Scene 6 -- "With 29 laps to go, a rain delay brought out a red flag... Larson and three other cars chose to stay out on older tires." The strategy graphic that was planned here was cut: the broadcast footage of the red flag and the pit lane already shows who stopped and who did not, and a diagram on top of it would only restate the pictures.
 */
export const Scene06: React.FC = () => <BedChain segs={chain(6)} dur={S06_DUR} />;