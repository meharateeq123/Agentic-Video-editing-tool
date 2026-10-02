import React from 'react';
import {BedChain} from '../components/BedChain';
import {chain} from '../footage';
import {mountedFrames} from '../timeline';

export const S10_DUR = mountedFrames(10);

/**
 * Scene 10 - "McDowell, for his part, declined to comment further when reached afterward, though he
 * acknowledged publicly that the incident was avoidable."
 *
 * There is nothing to put on screen here: no quote to pull, no number to show. Putting a card over
 * "declined to comment" would be inventing weight the line doesn't have, so this one runs bare.
 */
export const Scene10: React.FC = () => <BedChain segs={chain(10)} dur={S10_DUR} />;
