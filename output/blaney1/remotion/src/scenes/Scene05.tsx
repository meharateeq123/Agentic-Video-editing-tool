import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S05_DUR = mountedFrames(5);

/**
 * Scene 5 - "On Lap 155 of the scheduled 240... the right-front brake rotor on Blaney's No. 12
 * Ford exploded, sending debris straight through the hood... Blaney bounced off the outside wall
 * entering Turn 1." THE CRASH - real footage (highlights.mp4 offset 985), no graphic needed, the
 * moment carries itself.
 */
export const Scene05: React.FC = () => <BedChain segs={chain(5)} dur={S05_DUR} />;
